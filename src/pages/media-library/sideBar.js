import React, {useEffect, useState} from 'react';
import {
  makeStyles,
  Modal,
  TextField,
  Button,
  withStyles,
  Chip,
} from '@material-ui/core';
import jsCookie from 'js-cookie';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import './style.css';

const StyledTextField = withStyles((theme) => ({
  root: {
    padding: 0,
    borderRadius: 12,
  },
  input: {
    borderRadius: 12,
    borderWidth: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
}))(OutlinedInput);
const StyledChip = withStyles((theme) => ({
  label: {
    fontSize: 10,
    fontWeight: 400,
  },
  icon: {
    fontSize: 15,
  },
}))(Chip);

const useStyles = makeStyles((theme) => ({
  sidebar: {
    backgroundColor: '#eaeaea',
    width: '80%',
    padding: 10,
    height: '90vh',
    maxWidth: 380,
  },
  headSection1: {
    width: 'fit-content',
  },
  headSection2: {
    width: '230px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ml20: {
    marginLeft: '20px',
  },
  button: {
    borderRadius: '25px',
    marginRight: '15px',
    fontSize: '12px',
  },
  labels: {
    width: 120,
    fontSize: 15,
  },
  siderBarElement: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
    marginTop: 30,
    paddingLeft: 10,
  },
  customLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: '#777777',
    paddingLeft: 30,
  },
}));

const MediaContentScreen = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          margin: '10px 0',
        }}>
        <p className={classes.labels}>URL</p>
        <StyledTextField />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          margin: '10px 0',
        }}>
        <p className={classes.labels}>Filename</p>
        <StyledTextField />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          margin: '10px 0',
        }}>
        <p className={classes.labels}>Description</p>
        <StyledTextField />
      </div>
      <div className={classes.siderBarElement}>
        <p className={classes.labels}>Uploaded By</p>
        <span className={classes.customLabel}> admin</span>
      </div>
      <div className={classes.siderBarElement}>
        <p className={classes.labels}>Uploaded On</p>
        <span className={classes.customLabel}>admin</span>
      </div>
      <div className={classes.siderBarElement}>
        <p className={classes.labels}>Location</p>
        <span className={classes.customLabel}>Groups</span>
      </div>
      <div className='options'>
        <StyledChip
          icon={<SaveIcon style={{fill: 'white'}} />}
          label={'Save'}
          className='chip-style'
          onClick={() => {}}
        />
        <StyledChip
          icon={<CancelIcon style={{fill: 'white'}} />}
          label={'Cancel'}
          className='gray-chip'
          onClick={() => {}}
        />
        <StyledChip
          icon={<DeleteIcon style={{fill: 'white'}} />}
          label={'Delete'}
          className='gray-chip'
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default MediaContentScreen;
