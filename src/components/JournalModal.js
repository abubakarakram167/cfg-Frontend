import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import React, {useState, useEffect} from 'react';
import SunEditor from './sunEditor';
import Media from 'redux/services/media';
import {baseUrl} from 'utils/axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
}));

export default (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [innerContent, setInnerContent] = useState('');
  const [isContentChange, setContentChanged] = useState(false);

  const handleImageUploadBefore = async (files, info, uploadHandler) => {
    const formData = new FormData();
    formData.append('media', files[0]);
    formData.append('category', 'cover');
    const data = await Media.addMedia(formData);
    const photo_url = baseUrl + 'static/' + data.data[0].file_name;
    uploadHandler({
      result: [
        {
          url: photo_url,
          name: data.data[0].file_name,
          size: files[0].size,
        },
      ],
    });
  };

  const getJouranlData = async (id) => {
    props.onOpen();
  };
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const addJournal = () => {};

  return (
    <Modal
      open={props.show}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'>
      <div style={modalStyle} className={classes.paper}>
        <h2 style={{textAlign: 'center', color: '#5f5b5b', marginBottom: 40}}>
          This is subject
        </h2>
        <div>
          <SunEditor
            onClickSmartClick={(id) => {}}
            onContentSave={(content) => setInnerContent(content)}
            content={innerContent}
            onContentChanged={() => setContentChanged(true)}
            onImageUploadBefore={handleImageUploadBefore}
            changeHeight={true}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 60,
          }}>
          <Button
            onClick={props.onClose}
            variant='contained'
            color='secondary'
            style={{width: 100}}>
            Close
          </Button>
          <Button
            onClick={() => addJournal()}
            variant='contained'
            color='primary'
            style={{width: 100}}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
