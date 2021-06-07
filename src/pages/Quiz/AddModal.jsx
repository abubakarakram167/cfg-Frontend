import React from 'react';
import {makeStyles, Modal} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: '50px',
  },
  header: {
    display: 'flex',
    justifyContent: 'Space-between',
  },
  cont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    minWidth: '500px',
    backgroundColor: 'white',
    color: 'grey',
    padding: '20px',
    minHeight: '300px',
    // overflowY:'scroll'
  },
}));

const AddModal = (props) => {
  const classes = useStyles();
  const {title, open, onClose, children} = props;
  return (
    <Modal className={classes.cont} open={open} onClose={() => onClose()}>
      <div className={classes.card}>
        <div className={classes.header}>
          <h1 className={classes.title}>{title}</h1>{' '}
          <CancelIcon
            onClick={() => onClose()}
            style={{color: 'red', fontSize: '30px', cursor: 'pointer'}}
          />
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default AddModal;
