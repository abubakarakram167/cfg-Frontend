import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import React, {useState, useEffect, useRef} from 'react';
import './MyConversationModal.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
}));

export default (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [conversationExtended, setConversationExtended] = useState(false);
  const {event} = props;
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  return (
    <Modal
      open={props.when}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'>
      <div style={modalStyle} className={classes.paper}>
        <h2 style={{textAlign: 'center', color: '#5f5b5b'}}>
          {event && event.title}
        </h2>
        <div className='parent-conversation-container'>
          <div dangerouslySetInnerHTML={{__html: event && event.detail}}></div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Button
            onClick={props.onConfirm}
            variant='contained'
            color='secondary'
            style={{width: 100, borderRadius: 20}}>
            Exit
          </Button>
        </div>
      </div>
    </Modal>
  );
};
