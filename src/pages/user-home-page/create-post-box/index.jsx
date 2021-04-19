import React, {useState} from 'react';
import AppCard from '@crema/core/AppCard';
import './style.css';
import {
  Avatar,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import {
  Videocam,
  PermMedia,
  EmojiEmotions,
  Save,
  Close,
} from '@material-ui/icons';
export default function CreatePostBox() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    console.log('hello');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <span>Create Post</span>{' '}
            <Close
              style={{color: '#eb1b29', cursor: 'pointer'}}
              onClick={handleClose}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <div className='create-post-dialog-user-info'>
              <Avatar alt='user-avatar' />
              <span className='app-card-bottom-text'>
                Current Loggedin user
              </span>
            </div>
            <TextField
              style={{width: '100%'}}
              id='standard-multiline-static'
              multiline
              variant='filled'
              rows={4}
              fullwidth
              placeholder='How are you feeling in the momen?'
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{width: '100%'}}>
          <div className='create-post-dialog-action-content'>
            <button className='create-post-button' onClick={handleClose}>
              <Save /> <span className='app-card-bottom-text'>Save</span>
            </button>
            <div className='create-post-action-icons'>
              <Videocam />
            </div>
            <div className='create-post-action-icons'>
              <PermMedia />
            </div>
            <div className='create-post-action-icons'>
              <EmojiEmotions />
            </div>
          </div>
        </DialogActions>
      </Dialog>
      <AppCard>
        <div className='create-post-app-card-container'>
          <div className='create-post-app-card-top'>
            <Avatar alt='user-avatar' />
            <input
              onClick={handleClickOpen}
              type='text'
              className='create-post-input-trigger'
              placeholder='How are you feeling in the moment?'
            />
          </div>
          <div className='create-post-app-card-bottom'>
            <div className='create-post-app-card-bottom-box'>
              <Videocam />{' '}
              <span className='app-card-bottom-text'>Live Video</span>
            </div>
            <div className='create-post-app-card-bottom-box'>
              <PermMedia />{' '}
              <span className='app-card-bottom-text'>Photo/Video</span>
            </div>
            <div className='create-post-app-card-bottom-box'>
              <EmojiEmotions />{' '}
              <span className='app-card-bottom-text'>Feeling</span>
            </div>
          </div>
        </div>
      </AppCard>
    </div>
  );
}
