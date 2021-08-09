import React, {useState, useEffect} from 'react';
import AdminHeader from 'pages/admin-header';
import {DropzoneDialog} from 'material-ui-dropzone';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ControlPoint from '@material-ui/icons/ControlPoint';
import {
  createOneMedia,
  getUserMediaList,
  editMediaData,
  deleteMediaData,
} from '../../redux/actions/media';
import {useDispatch, useSelector} from 'react-redux';
import './style.css';
import SideBar from './sideBar';
import axios from '../../utils/axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {Show_Message} from '../../shared/constants/ActionTypes';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import GridOnIcon from '@material-ui/icons/GridOn';
import TocIcon from '@material-ui/icons/Toc';
import ReactPlayer from 'react-player';
import baseUrl from '../../utils/url';
import moment from 'moment';
import {useHistory} from 'react-router-dom';

export default function MediaLibrary() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesPreview, setFilesPreview] = useState([]);
  const dispatch = useDispatch();
  const [selectMedia, setSelectMedia] = useState(null);
  const message = useSelector((state) => state.userList);
  const [showSideBar, setShowSideBar] = useState(false);
  const [currentView, setCurrentView] = useState('grid');
  const permissions = useSelector((state) => state.roles.permissions);
  const history = useHistory();

  const readImage = (file, callback) => {
    let reader = new FileReader();
    reader.onload = function (file) {
      callback(file.target.result);
    };
    reader.readAsDataURL(file);
  };

  const mediaFilesData = useSelector(({mediaList}) => {
    return mediaList.mediaList;
  });

  if (mediaFilesData.length && !filesPreview.length)
    setFilesPreview(mediaFilesData);
  const handleSave = (files) => {
    const data = new FormData();
    for (const file of files) {
      data.append('media', file);
    }
    dispatch(createOneMedia(data)).then((res) => {
      const data = res.data.map((file) => {
        return {
          url: baseUrl + 'static/' + file.file_name,
          fileName: file.title,
          description: file.description,
          uploadedOn: file.created_at,
          id: file.id,
        };
      });

      setFilesPreview(filesPreview.concat(data));
    });
    setFiles(files);
    setDialogOpen(false);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleClose1 = () => {
    dispatch({type: Show_Message, payload: {message: null, success: false}});
  };

  const editMedia = () => {
    dispatch(editMediaData(selectMedia)).then((res) => {
      if (res) {
        const data = filesPreview.map((file) => {
          if (file.id === selectMedia.id) {
            return {
              ...file,
              fileName: selectMedia.fileName,
              url: selectMedia.url,
              description: selectMedia.description,
            };
          } else return file;
        });
        setFilesPreview(data);
      }
    });
  };

  const deleteMedia = () => {
    dispatch(deleteMediaData(selectMedia)).then((res) => {
      if (res) {
        const data = filesPreview.filter((file) => file.id !== selectMedia.id);
        setFilesPreview(data);
        setSelectMedia(null);
      }
    });
  };

  const setCurrentViewFunc = (view) => {
    setCurrentView(view);
  };

  useEffect(() => {
    dispatch(getUserMediaList());
  }, [dispatch]);

  useEffect(() => {
    if (!permissions.mediaLibrary.view) {
      history.push({
        pathname: '/unAuthorizedPage',
      });
    }
  }, []);

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
          variant='filled'
          onClose={handleClose1}
          severity={message.success ? 'success' : 'error'}>
          {message.message}
        </Alert>
      </Snackbar>
      <Container>
        <div className='options'>
          <Typography variant='h6'>
            {' '}
            <PermMediaIcon style={{position: 'relative', top: 5}} /> Media
            Library
          </Typography>
          <Chip
            icon={<ControlPoint style={{fill: 'white'}} />}
            label={'ADD NEW'}
            className='chip-style'
            onClick={() => setDialogOpen(true)}
          />
          <Chip
            icon={
              <TocIcon
                style={
                  currentView === 'leftAlign'
                    ? {
                        fill: 'white',
                        position: 'relative',
                        left: 8,
                        fontSize: 30,
                      }
                    : {}
                }
              />
            }
            className='custom-icon'
            style={
              currentView === 'leftAlign'
                ? {
                    textAlign: 'center',
                    justifyContent: 'center',
                    width: 30,
                    borderRadius: 5,
                    height: 30,
                    backgroundColor: 'gray',
                  }
                : {backgroundColor: 'transparent'}
            }
            onClick={() => {
              setCurrentViewFunc('leftAlign');
            }}
          />
          <Chip
            style={
              currentView === 'grid'
                ? {
                    textAlign: 'center',
                    justifyContent: 'center',
                    width: 30,
                    borderRadius: 5,
                    height: 30,
                    backgroundColor: 'gray',
                  }
                : {backgroundColor: 'transparent'}
            }
            icon={
              <GridOnIcon
                style={
                  currentView === 'grid'
                    ? {
                        fill: 'white',
                        position: 'relative',
                        left: 7,
                        fontSize: 26,
                      }
                    : {}
                }
              />
            }
            onClick={() => {
              setCurrentViewFunc('grid');
            }}
          />
        </div>
        <DropzoneDialog
          open={dialogOpen}
          onSave={handleSave}
          acceptedFiles={['image/jpeg', 'image/png', 'video/mkv', 'video/mp4']}
          showPreviews={true}
          maxFileSize={15000000}
          filesLimit={4}
          showFileNames={true}
          onClose={handleClose}
        />
        <div style={{paddingBottom: 50}} className='container'>
          <div className={'gallery'}>
            {filesPreview.map((element, index) => {
              console.log('the element', element);
              if (
                ['jpeg', 'png', 'jpg', 'JPG', 'PNG'].includes(
                  element.url.split('.').pop(),
                )
              ) {
                return (
                  <div
                    className={currentView !== 'grid' ? 'media-container' : {}}>
                    <img
                      src={element.url}
                      className={'gallery-image'}
                      style={
                        selectMedia && element.id === selectMedia.id
                          ? {borderWidth: 5, borderColor: 'rgb(84 161 206)'}
                          : {borderWidth: 1}
                      }
                      alt='alt-text'
                      key={index}
                      onClick={() => {
                        setTimeout(() => setShowSideBar(true), 100);
                        setSelectMedia(element);
                      }}
                    />
                    {currentView !== 'grid' && (
                      <div>
                        <div style={{marginBottom: 20}}>
                          <span>Name:</span> <span>{element.fileName}</span>
                        </div>
                        <div>
                          <span>created_at:</span>{' '}
                          <span>
                            {moment(element.uploadedOn).format('YYYY-MM-DD')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              } else if (
                ['video', 'mp4', 'mkv'].includes(
                  element.url.split('.').pop().toLowerCase(),
                )
              ) {
                return (
                  <div
                    className={currentView !== 'grid' ? 'media-container' : {}}>
                    <ReactPlayer
                      url={element.url}
                      light={element.thumbnailPreview}
                      style={
                        selectMedia && element.id === selectMedia.id
                          ? {borderWidth: 5, borderColor: 'rgb(84 161 206)'}
                          : {borderWidth: 1}
                      }
                      playing
                      controls
                      width={150}
                      height={150}
                      className='gallery-image'
                      onClick={() => {
                        if (!showSideBar) setShowSideBar(true);
                        setSelectMedia(element);
                      }}
                    />
                    {currentView !== 'grid' && (
                      <div>
                        <div style={{marginBottom: 20}}>
                          <span>Name:</span> <span>{element.fileName}</span>
                        </div>
                        <div>
                          <span>created_at:</span>{' '}
                          <span>
                            {moment(element.uploadedOn).format('YYYY-MM-DD')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
          {showSideBar && (
            <SideBar
              selectMedia={selectMedia}
              onChangeMedia={(media) => setSelectMedia(media)}
              onSave={() => editMedia()}
              onDelete={() => deleteMedia()}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
