import React, {useState, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {createUserPost} from 'redux/actions/UserPost';
import Media from 'redux/services/media';
import {baseUrl} from 'utils/axios';
export default function CreatePostBox() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    photo_url: '',
  });
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    dispatch(createUserPost({content, status: 'published', media}));
  };
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('media', file);
    const data = await Media.addMedia(formData);
    const photo_url = data.data[0].file_name;
    setMedia(photo_url);
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
              <Avatar
                alt='user-avatar'
                src={baseUrl + '/static/' + user.photo_url}
              />
              <span className='app-card-bottom-text'>
                {user.first_name} {user.last_name}
              </span>
            </div>
            <TextField
              style={{width: '100%'}}
              id='standard-multiline-static'
              multiline
              variant='filled'
              rows={4}
              fullwidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder='How are you feeling in the moment?'
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{width: '100%'}}>
          <input
            type='file'
            name=''
            id='media-upload'
            style={{display: 'none'}}
            onChange={handleFile}
          />
          <label htmlFor='media-upload'>
            <div className='create-post-dialog-action-content'>
              <button className='create-post-button' onClick={handleSave}>
                <Save /> <span className='app-card-bottom-text'>Save</span>
              </button>
              <div className='create-post-action-icons'>
                <Videocam style={{color: 'red'}} />
              </div>
              <div className='create-post-action-icons'>
                <PermMedia style={{color: 'red'}} />
              </div>
              <div className='create-post-action-icons'>
                <EmojiEmotions style={{color: 'red'}} />
              </div>
            </div>
          </label>
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
              <Videocam style={{color: 'red'}} />{' '}
              <span className='app-card-bottom-text'>Live Video</span>
            </div>
            <div className='create-post-app-card-bottom-box'>
              <PermMedia style={{color: 'red'}} />{' '}
              <span className='app-card-bottom-text'>Photo/Video</span>
            </div>
            <div className='create-post-app-card-bottom-box'>
              <EmojiEmotions style={{color: 'red'}} />{' '}
              <span className='app-card-bottom-text'>Feeling</span>
            </div>
          </div>
        </div>
      </AppCard>
    </div>
  );
}
