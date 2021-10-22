import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import React, {useState, useEffect} from 'react';
import SunEditor from './sunEditor';
import Media from 'redux/services/media';
import {baseUrl} from 'utils/axios';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {Select, MenuItem, Chip, withStyles} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import {
  createJournal,
  getSpecificJournal,
  updateJournal,
} from '../redux/actions/journal';
import './journalModal.css';
import _ from 'lodash';
import {KeyboardDatePicker} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import $ from 'jquery';
const width = $(window).width();

const getWidthAccordingToDevice = (width) => {
  let percentageWidth = '50%';
  if (width < 500) percentageWidth = '90%';
  else if (width >= 501 && width <= 600) percentageWidth = '80%';
  else if (width >= 601 && width <= 800) percentageWidth = '60%';
  else percentageWidth = '50%';

  return percentageWidth;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    justifyContent: 'space-around',
    flexDirection: 'column',
    overflowY: 'scroll',
    width: getWidthAccordingToDevice(width),
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

const StyledChip = withStyles((theme) => ({
  label: {
    fontSize: 10,
    fontWeight: 400,
  },
  icon: {
    fontSize: 15,
  },
}))(Chip);

export default function (props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [innerContent, setInnerContent] = useState('');
  const [isContentChange, setContentChanged] = useState(false);
  const [journalData, setjournalData] = useState({
    type: 'journal',
    status: 'Not Started',
  });
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('current-user'));
  const journalId = props.journalId;
  const subject = props.subject;
  const [type, setType] = useState('journal');

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
      status: journalData.status,
      type: type,
      parent: props.parent,
      track_my_goal: !_.isEmpty(journalData)
        ? journalData.track_my_goal
        : props.track_my_goal,
    };
    if (type === 'journey') payload.track_my_goal = true;

    if (!journalId) {
      dispatch(createJournal(payload))
        .then((res) => {
          const data = res.data.result;
          props.onClose();
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
    if (subject) {
      dispatch(getSpecificJournal(subject, user.id))
        .then((res) => {
          if (res.data.length) {
            setType(res.data[0].type);
            setjournalData(res.data[0]);
            setInnerContent(res.data[0].detail);
            props.getJournalData(res.data[0]);
          }
        })
        .catch((err) => console.log('the error', err));
    } else {
      setInnerContent('');
      setjournalData({});
    }
  }, [subject]);

  return (
    <Modal
      open={props.show}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      style={{backgroundColor: 'rgb(8 8 8 / 50%)'}}>
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
          <Select
            labelId='demo-simple-select-filled-label'
            id='demo-simple-select-filled'
            onChange={(e) => setType(e.target.value)}
            variant='filled'
            fullWidth
            defaultValue='journal'
            value={type}
            label='Type'
            required>
            <MenuItem value={'goal'}>Goal</MenuItem>
            <MenuItem value={'journey'}>Journey</MenuItem>
            <MenuItem value={'journal'}>Journal</MenuItem>
          </Select>
        </div>
        <div className='journal-modal-subitems'>
          <Select
            labelId='demo-simple-select-filled-label'
            id='demo-simple-select-filled'
            onChange={(e) => {
              let journal = Object.assign({}, journalData);
              journal.status = e.target.value;
              setjournalData(journal);
            }}
            variant='filled'
            fullWidth
            defaultValue='Not Started'
            value={journalData.status}
            label='Status'
            required>
            <MenuItem value={'Not Started'}>Not Started</MenuItem>
            <MenuItem value={'In Progress'}>In Progress</MenuItem>
            <MenuItem value={'Complete'}>Complete</MenuItem>
            <MenuItem value={'Overdue'}>Overdue</MenuItem>
          </Select>
        </div>
        {type === 'goal' && (
          <div className='journal-modal-subitems'>
            <span style={{marginRight: 50}}>Track My Goal</span>
            <div>
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
          </div>
        )}
        {!_.isEmpty(journalData) &&
          journalData.track_my_goal &&
          type === 'goal' && (
            <div>
              <div className='journal-modal-subitems'>
                <span className='dates'>
                  <KeyboardDatePicker
                    disableToolbar
                    format='MM/DD/yyyy'
                    label='Start Date'
                    fullWidth
                    variant='filled'
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
                  <KeyboardDatePicker
                    disableToolbar
                    format='MM/DD/yyyy'
                    variant='filled'
                    fullWidth
                    label='End Date'
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
        {type === 'journey' && (
          <div>
            <div className='journal-modal-subitems'>
              <span className='dates'>
                <KeyboardDatePicker
                  disableToolbar
                  format='MM/DD/yyyy'
                  label='Start Date'
                  fullWidth
                  variant='filled'
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
                <KeyboardDatePicker
                  disableToolbar
                  format='MM/DD/yyyy'
                  variant='filled'
                  fullWidth
                  label='End Date'
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
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <StyledChip
            icon={<CancelIcon style={{fill: 'white'}} />}
            label={'Cancel'}
            className='gray-chip'
            onClick={() => props.onClose()}
          />
          <StyledChip
            icon={<SaveIcon style={{fill: 'white'}} />}
            label={'Save'}
            className='chip-style'
            onClick={() => addJournal()}
          />
        </div>
      </div>
    </Modal>
  );
}
