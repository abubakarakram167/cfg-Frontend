import React, {useState, useEffect} from 'react';
import AdminHeader from 'pages/admin-header';
import {DropzoneDialog} from 'material-ui-dropzone';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ControlPoint from '@material-ui/icons/ControlPoint';
import {createOneMedia, getUserMediaList} from '../../redux/actions/media';
import {useDispatch, useSelector} from 'react-redux';
import './style.css';
import SideBar from './sideBar';
import axios from '../../utils/axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {Show_Message} from '../../shared/constants/ActionTypes';
const baseUrl = 'http://localhost:3690/';
var btoa = require('btoa');

export default function MediaLibrary() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesPreview, setFilesPreview] = useState([]);
  const dispatch = useDispatch();
  const [imageData, setImageData] = useState('');
  const [selectMedia, setSelectMedia] = useState(null);
  const message = useSelector((state) => state.userList);

  const readImage = (file, callback) => {
    let reader = new FileReader();
    reader.onload = function (file) {
      callback(file.target.result);
    };
    reader.readAsDataURL(file);
  };

  const mediaFilesData = useSelector(({mediaList}) => {
    console.log('the media list', mediaList);
    return mediaList.mediaList;
  });

  if (mediaFilesData.length && !filesPreview.length)
    setFilesPreview(mediaFilesData);
  const handleSave = (files) => {
    //Saving files to state for further use and closing Modal.
    console.log('the filess..', files);
    const data = new FormData();
    for (const file of files) {
      data.append('media', file);
    }
    dispatch(createOneMedia(data)).then((res) => {
      const data = res.data.map((file) => {
        return {
          url: baseUrl + file.file_name,
          fileName: file.title,
          description: file.description,
          uploadedOn: file.created_at,
          id: file.id,
        };
      });
      console.log('the res after add', data);
      setFilesPreview(filesPreview.concat(data));
    });
    setFiles(files);
    setDialogOpen(false);
  };

  console.log('the files...', filesPreview);

  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleClose1 = () => {
    dispatch({type: Show_Message, payload: {message: null, success: false}});
  };

  useEffect(() => {
    dispatch(getUserMediaList());
  }, [dispatch]);

  return (
    <div style={{backgroundColor: '#f0f2f5'}}>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <Snackbar
        open={message.message}
        autoHideDuration={6000}
        onClose={handleClose1}>
        <Alert
          onClose={handleClose1}
          severity={message.success ? 'success' : 'error'}>
          {message.message}
        </Alert>
      </Snackbar>
      <Container>
        <div className='options'>
          <Typography variant='h6'>Media Library</Typography>
          <Chip
            icon={<ControlPoint style={{fill: 'white'}} />}
            label={'ADD NEW'}
            className='chip-style'
            onClick={() => setDialogOpen(true)}
          />
        </div>
        <DropzoneDialog
          open={dialogOpen}
          onSave={handleSave}
          // acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={handleClose}
        />
        <div style={{paddingBottom: 50}} className='container'>
          <div className='gallery'>
            {filesPreview.map((element, index) => {
              return (
                <img
                  src={element.url}
                  className='gallery-image'
                  alt='alt-text'
                  key={index}
                  onClick={() => {
                    setSelectMedia(element);
                  }}
                />
              );
            })}
          </div>
          <SideBar selectMedia={selectMedia} />
        </div>
      </Container>
    </div>
  );
}
