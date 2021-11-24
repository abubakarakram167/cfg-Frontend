import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import './EventCalendarModal.css';
import {
  QueryBuilder,
  Event,
  CloseRounded,
  ArrowDownward,
} from '@material-ui/icons';
import moment from 'moment';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {Select, MenuItem, Chip, withStyles} from '@material-ui/core';
import AddToCalendar from 'react-add-to-calendar';
import $ from 'jquery';

const width = $(window).width();
let icon = {textOnly: 'none'};

const StyledChip = withStyles((theme) => ({
  label: {
    fontSize: 15,
    fontWeight: 400,
  },
  icon: {
    fontSize: 15,
  },
  root: {
    position: 'relative',
    top: 2,
  },
}))(Chip);

const eventStyle = {
  fill: 'white',
  position: 'relative',
  left: 22,
  top: 23,
  fontSize: 14,
};
const arrowStyle = {
  fill: 'white',
  position: 'relative',
  right: 22,
  top: 23,
  fontSize: 14,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 430,
    height: 250,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
  },
}));

const getWidthAccordingToDevice = (width) => {
  let percentageWidth = '50%';
  if (width < 500) percentageWidth = '90%';
  else if (width >= 501 && width <= 600) percentageWidth = '80%';
  else if (width >= 601 && width <= 800) percentageWidth = '70%';
  else percentageWidth = '30%';

  return percentageWidth;
};

export default (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const {element} = props;

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
    };
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
                position: 'relative',
                left: 120,
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
            {moment(element.start_date).format('MMMM Do, YYYY hA')}
          </span>
        </div>
        {/* <div style = {{  marginTop: 20, textAlign: 'center' }} >
          Remind me <span></span> Before Event
        </div> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          {/* <StyledChip
            icon={<Event
              style={{fill: 'white', fontSize: 18}} 
            />}
            label={'Add to calendar'}
            className='gray-chip'
            onClick={() =>  { } }
          /> */}
          <Event style={eventStyle} />
          <AddToCalendar
            buttonTemplate={icon}
            rootClass='react-calendar'
            event={event}
            displayItemIcons={true}
          />
          <ArrowDownward style={arrowStyle} />
          <StyledChip
            icon={<SaveIcon style={{fill: 'white'}} />}
            label={'Save'}
            className='chip-style'
            onClick={() => {
              props.onCancel();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
