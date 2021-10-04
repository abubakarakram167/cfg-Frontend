import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import React, {useState, useEffect} from 'react';
import SunEditor from './sunEditor';
import Media from 'redux/services/media';
import {baseUrl} from 'utils/axios';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {Select, MenuItem} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import {
  createJournal,
  getSpecificJournal,
  updateJournal,
} from '../redux/actions/journal';
import './journalModal.css';
import _ from 'lodash';
import {KeyboardDatePicker} from '@material-ui/pickers';

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
    overflowY: 'scroll',
  },
  checkboxRoot: {
    marginTop: -8,
    marginLeft: -8,
  },
  datePicker: {
    '& .MuiFormLabel-root': {
      paddingLeft: 10,
    },
    '& .MuiInputBase-root': {
      paddingLeft: 8,
    },
  },
}));

export default function (props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [innerContent, setInnerContent] = useState('');
  const [isContentChange, setContentChanged] = useState(false);
  const [journalData, setjournalData] = useState({
    type: 'goal',
  });
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
      start_date: moment(journalData.start_date).format('YYYY-MM-DD'),
      end_date: moment(journalData.end_date).format('YYYY-MM-DD'),
      detail: innerContent,
      log_date: moment().format('YYYY-MM-DD'),
      status: 'nothing',
      type: journalData.type,
      parent: 'sample',
      track_my_goal: !_.isEmpty(journalData)
        ? journalData.track_my_goal
        : props.track_my_goal,
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
      aria-describedby='simple-modal-description'
      style={{backgroundColor: 'rgb(8 8 8 / 90%)'}}>
      <div style={modalStyle} className={classes.paper}>
        <h2 className='subject-heading'>
          {!_.isEmpty(journalData) ? journalData.subject : props.subject}
        </h2>
        <div id='internal-editor'>
          <SunEditor
            onClickSmartClick={(id) => {}}
            onContentSave={(content) => setInnerContent(content)}
            content={innerContent}
            onContentChanged={() => setContentChanged(true)}
            onImageUploadBefore={handleImageUploadBefore}
            changeHeight={true}
            showToolbar={true}
            modalType='internal'
          />
        </div>
        <div className='journal-modal-subitems'>
          <span style={{marginRight: 50}}>Type:</span>
          <Select
            labelId='demo-simple-select-filled-label'
            id='demo-simple-select-filled'
            onChange={(e) =>
              setjournalData({
                ...journalData,
                type: e.target.value,
              })
            }
            variant='filled'
            value={!_.isEmpty(journalData) && journalData.type}
            label='Type'
            required>
            <MenuItem value={'goal'}>Goal</MenuItem>
            <MenuItem value={'journey'}>Journey</MenuItem>
            <MenuItem value={'journal'}>Journal</MenuItem>
          </Select>
        </div>
        {!_.isEmpty(journalData) && journalData.type === 'goal' && (
          <div className='journal-modal-subitems'>
            <span style={{marginRight: 50}}>Track My Goal:</span>
            <Checkbox
              checked={!_.isEmpty(journalData) && journalData.track_my_goal}
              onChange={(e) => {
                setjournalData({
                  ...journalData,
                  track_my_goal: !journalData.track_my_goal,
                });
              }}
              color='primary'
              className={classes.checkboxRoot}
            />
          </div>
        )}
        {!_.isEmpty(journalData) &&
          journalData.type === 'goal' &&
          journalData.track_my_goal && (
            <div>
              <div className='journal-modal-subitems'>
                <span className='dates'>
                  <span style={{marginRight: 50, paddingTop: 10}}>
                    Start Date:
                  </span>
                  <KeyboardDatePicker
                    disableToolbar
                    format='MM/DD/yyyy'
                    className={classes.datePicker}
                    value={
                      !_.isEmpty(journalData) && journalData.start_date
                        ? journalData.start_date
                        : moment().format('YYYY-MM-DD')
                    }
                    onChange={(e) => {
                      console.log('on changing date', e);
                      setjournalData({
                        ...journalData,
                        start_date: e,
                      });
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </span>
              </div>
              <div className='journal-modal-subitems'>
                <span className='dates'>
                  <span style={{marginRight: 50, paddingTop: 10}}>
                    End Date:
                  </span>
                  <KeyboardDatePicker
                    disableToolbar
                    format='MM/DD/yyyy'
                    className={classes.datePicker}
                    value={
                      !_.isEmpty(journalData) && journalData.end_date
                        ? journalData.end_date
                        : moment().format('YYYY-MM-DD')
                    }
                    onChange={(e) => {
                      console.log('on changing date', e);
                      setjournalData({
                        ...journalData,
                        end_date: e,
                      });
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </span>
              </div>
            </div>
          )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: 60,
          }}>
          <Button
            onClick={() => props.onClose()}
            variant='contained'
            color='secondary'
            style={{width: 80}}>
            Close
          </Button>
          <Button
            onClick={() => addJournal()}
            variant='contained'
            color='primary'
            style={{width: 80}}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
