import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import React, {useState, useEffect, useRef} from 'react';
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Collapse,
} from '@material-ui/core';
import {Link} from 'react-router-dom';
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
  const {allSessions} = props;
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
          My Conversations
        </h2>
        <div className='parent-conversation-container'>
          {allSessions.length !== 0 &&
            allSessions.map((session) => {
              return (
                <div className='conversation-container'>
                  <div className='conversation-lists'>
                    <div className='conversationHeader'>
                      {/* <Link to={`/home/conversation/${session?.rows[0].id}`}> */}
                      {session?.rows[0].title}
                      {/* </Link> */}
                    </div>
                    <ul className='conversation-child-list'>
                      {session?.titles.rows.map((element, index) => {
                        if (element.status === 'published') {
                          return (
                            <div className='whole-child-component' key={index}>
                              <li className='conversation-child-element'>
                                <Link to={`/home/conversation/${element.id}`}>
                                  <strong>{element.title}</strong>
                                </Link>
                              </li>
                              <ul className='subtitle'>
                                {element.subtitles.rows.map((sub) => {
                                  if (sub.status === 'published') {
                                    return (
                                      <li className='subtitle-element'>
                                        <Link
                                          to={`/home/conversation/${sub.id}`}>
                                          <strong>{sub.title}</strong>
                                        </Link>
                                      </li>
                                    );
                                  }
                                })}
                              </ul>
                            </div>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Button
            onClick={props.onConfirm}
            variant='contained'
            color='secondary'
            style={{width: 100}}>
            Exit
          </Button>
          <Button
            onClick={props.onCancel}
            variant='contained'
            color='primary'
            style={{width: 100}}>
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};
