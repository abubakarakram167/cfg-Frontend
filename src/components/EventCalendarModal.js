import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import React, {useState} from 'react';
import './EventCalendarModal.css';
import {QueryBuilder, CloseRounded, ArrowDownward} from '@material-ui/icons';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import moment from 'moment';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@mui/material/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import {Select, MenuItem, Chip, withStyles} from '@material-ui/core';
import AddToCalendar from 'react-add-to-calendar';
import $ from 'jquery';
import Grid from '@material-ui/core/Grid';
import {subscribeEvent} from '../redux/actions/cfg';
import {toast} from 'react-toastify';

const width = $(window).width();
let icon = {textOnly: 'none'};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 250,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
  },
}));

const getWidthAccordingToDevice = () => {
  // console.log(window.innerWidth , "width is");
  if (window.innerWidth < 400) {
    return `${window.innerWidth - 30}px`;
  } else {
    return 'auto';
  }

  // return percentageWidth;
};

export default (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const {element} = props;
  const [calendarOptionsOpen, setCalendarOptionsOpen] = useState(false);
  const [remindMinutes, setRemindMinutes] = useState(15);
  const [registered, setRegistered] = useState(false);

  let event = {
    title: element.title,
    description: `${element.title} event will be start`,
    location: 'Jamaica',
    startTime: moment(element.start_date),
    endTime: element.end_date,
  };

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      opacity: 0.8,
      border: 'none',
      borderRadius: 10,
      zIndex: 100,
      width: getWidthAccordingToDevice(),
      height: 'auto',
    };
  }

  async function handleRegister() {
    let resp = await subscribeEvent({
      content_id: element.id,
      time_in_minutes: remindMinutes,
    });
    if (resp.status === 200) {
      setRegistered(true);
    } else {
      toast.error(
        'Unable to register for event. Please check with administrator.',
      );
    }
  }

  return (
    <Modal
      open={props.when}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'>
      <div style={modalStyle} className={classes.paper}>
        <h2
          style={{
            textAlign: 'center',
            color: 'rgb(153 153 153)',
            fontSize: 18,
          }}>
          {element.title}
          <span>
            <CloseRounded
              onClick={() => props.onCancel()}
              style={{
                fill: 'white',
                borderRadius: 50,
                backgroundColor: 'red',
                position: 'absolute',
                left: '90%',
                cursor: 'pointer',
              }}
            />{' '}
          </span>
        </h2>

        <div className='event-date-time'>
          <QueryBuilder
            style={{
              backgroundColor: '#ebbc37',
              borderRadius: 50,
              fill: 'white',
            }}
            className='clock-icon'
          />
          <span className='event-start-date'>
            {moment(element.meeting_start_time).format('MMMM Do, YYYY hA')}
          </span>
        </div>

        <Grid
          container
          style={{
            display: 'flex',
            alignItmes: 'center',
            justifyContent: 'center',
            marginTop: '20px',
          }}>
          {element.event_type === 'face-to-face' && registered && (
            <>
              <Grid item lg={12} sm={12} md={12} xs={12} xl={12}>
                <Typography gutterBottom variant='h5' component='span'>
                  <CheckCircleIcon
                    style={{color: '0AB804', marginRight: '2px'}}
                  />
                  You have been succesfully registered with {element.title}. A
                  confirmation email has also been sent to you.
                </Typography>
              </Grid>
              <Grid
                item
                lg={12}
                sm={12}
                md={12}
                xs={12}
                xl={12}
                style={{marginTop: '10px'}}>
                <Typography gutterBottom variant='h5' component='span'>
                  We look forward to seeing you!
                </Typography>
              </Grid>
            </>
          )}
          {element.event_type === 'face-to-face' ? (
            registered && (
              <Grid
                item
                style={{
                  display: 'flex',
                  alignItmes: 'center',
                  justifyContent: 'center',
                  marginTop: '20px',
                }}
                lg={12}
                sm={12}
                md={12}
                xs={12}
                xl={12}>
                <Button
                  color='primary'
                  variant='contained'
                  endIcon={<ArrowDownward />}
                  onClick={() => {
                    setCalendarOptionsOpen((prevValue) => !prevValue);
                  }}>
                  <AddToCalendar
                    buttonTemplate={icon}
                    optionsOpen={calendarOptionsOpen}
                    event={event}
                    displayItemIcons={true}
                  />
                </Button>
              </Grid>
            )
          ) : (
            <Grid
              item
              style={{
                display: 'flex',
                alignItmes: 'center',
                justifyContent: 'center',
                marginTop: '20px',
              }}
              lg={12}
              sm={12}
              md={12}
              xs={12}
              xl={12}>
              <Button
                color='primary'
                variant='contained'
                endIcon={<ArrowDownward />}
                onClick={() => {
                  setCalendarOptionsOpen((prevValue) => !prevValue);
                }}>
                <AddToCalendar
                  buttonTemplate={icon}
                  optionsOpen={calendarOptionsOpen}
                  event={event}
                  displayItemIcons={true}
                />
              </Button>
            </Grid>
          )}
        </Grid>

        {element.event_type === 'face-to-face' && !registered && (
          <>
            <Grid
              container
              style={{
                display: 'flex',
                alignItmes: 'center',
                justifyContent: 'center',
                marginTop: '20px',
              }}>
              <Typography gutterBottom variant='h5' component='span'>
                REMIND ME
              </Typography>
              <Select
                labelId='demo-simple-select-standard-label'
                id='demo-simple-select-standard'
                value={remindMinutes}
                onChange={(e) => {
                  setRemindMinutes(e.target.value);
                }}
                label='Age'
                displayEmpty
                defaultValue={15}
                inputProps={{'aria-label': 'Without label'}}
                style={{
                  marginLeft: '5px',
                  marginRight: '5px',
                  height: '25px',
                  width: '90px',
                }}>
                <MenuItem value={15}>15 Mins</MenuItem>
                <MenuItem value={30}>30 Mins</MenuItem>
                <MenuItem value={45}>45 Mins</MenuItem>
                <MenuItem value={60}>60 Mins</MenuItem>
              </Select>
              <Typography gutterBottom variant='h5' component='span'>
                BEFORE EVENT
              </Typography>
            </Grid>
            <Grid
              container
              style={{
                display: 'flex',
                alignItmes: 'center',
                justifyContent: 'center',
                marginTop: '20px',
              }}>
              <Button
                onClick={() => handleRegister()}
                variant='contained'
                style={{backgroundColor: '#0AB804', borderRadius: '20px'}}
                startIcon={<SaveIcon style={{fill: 'white'}} />}>
                Register
              </Button>
            </Grid>
          </>
        )}
      </div>
    </Modal>
  );
};
