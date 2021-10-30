import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 180,
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
          Are you want to accept that Invite?
        </h2>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Button
            onClick={props.onConfirm}
            variant='contained'
            color='secondary'
            style={{width: 100}}>
            Accept
          </Button>
          <Button
            onClick={props.onCancel}
            variant='contained'
            color='primary'
            style={{width: 100}}>
            Reject
          </Button>
        </div>
      </div>
    </Modal>
  );
};
