import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import React, {useState, useEffect} from 'react';
import SunEditor from './sunEditor';
import Media from 'redux/services/media';
import {baseUrl} from 'utils/axios';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {
  createJournal,
  getSpecificJournal,
  updateJournal,
} from '../redux/actions/journal';
import _ from 'lodash';

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

export default function (props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [innerContent, setInnerContent] = useState('');
  const [isContentChange, setContentChanged] = useState(false);
  const [journalData, setjournalData] = useState({});
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('current-user'));
  const journalId = props.journalId;

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

  const addJournal = async () => {
    const payload = {
      user_id: user.id,
      subject: !_.isEmpty(journalData) ? journalData.subject : props.subject,
      start_date: moment().format('YYYY-MM-DD'),
      end_date: moment().format('YYYY-MM-DD'),
      detail: innerContent,
      log_date: moment().format('YYYY-MM-DD'),
      status: 'nothing',
      type: 'goal',
      parent: 'sample',
    };

    if (!journalId) {
      dispatch(createJournal(payload))
        .then((res) => {
          const data = res.data.result;
          props.getJournalData(data);
        })
        .catch((err) => console.log('the error', err));
    } else {
      dispatch(updateJournal(payload, journalId))
        .then((res) => {
          console.log('after updating response', res);
          props.onClose();
        })
        .catch((err) => console.log('the error', err));
    }
  };

  useEffect(() => {
    if (journalId) {
      dispatch(getSpecificJournal(journalId))
        .then((res) => {
          console.log('the res', res);
          if (res.data.length) {
            setjournalData(res.data[0]);
            setInnerContent(res.data[0].detail);
          }
        })
        .catch((err) => console.log('the error', err));
    } else {
      setInnerContent('');
      setjournalData(null);
    }
  }, [journalId]);

  return (
    <Modal
      open={props.show}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'>
      <div style={modalStyle} className={classes.paper}>
        <h2 style={{textAlign: 'center', color: '#5f5b5b', marginBottom: 40}}>
          {!_.isEmpty(journalData) ? journalData.subject : props.subject}
        </h2>
        <div>
          <SunEditor
            onClickSmartClick={(id) => {}}
            onContentSave={(content) => setInnerContent(content)}
            content={innerContent}
            onContentChanged={() => setContentChanged(true)}
            onImageUploadBefore={handleImageUploadBefore}
            changeHeight={true}
            showToolbar={true}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 60,
          }}>
          <Button
            onClick={() => props.onClose()}
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
}
