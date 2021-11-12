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
import {createUserPost, getUserPost} from 'redux/actions/UserPost';
import Media from 'redux/services/media';
import {baseUrl} from 'utils/axios';
import {getSignedUrl} from '../../../redux/actions/media';
import MediaUpload from 'components/MediaUpload';

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
  const [mediaType, setMediaType] = useState('');
  const currentUser = useSelector((state) => state.auth.user);
  const [showDialogue, setShowDialogue] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getSignedUrl({fileName: currentUser.photo_url}).then((res) => {
        setAvatarImage(res.newUrl);
      });
      setUser(currentUser);
    }
  }, [currentUser]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setContent('');
    setMedia(null);
  };

  const handleSave = () => {
    setOpen(false);
    const userPost = {
      content,
      status: 'published',
      media,
    };
    if (currentUser.role === 'content-manager')
      userPost.assigned_group = 'content-manager';
    console.log('the userPost', userPost);
    dispatch(createUserPost(userPost));
    // dispatch(getUserPost());
    setContent('');
    setMedia(null);
  };

  const mediaJSX = () => {
    console.log('the media type::', mediaType);
    console.log('the media', media);
    switch (mediaType) {
      case 'image':
        return <img src={media} width='100%' />;
      case 'video':
        return (
          <video width='100%' controls>
            <source src={media} type='video/mp4' />
            {/* <source src="mov_bbb.ogg" type="video/ogg" /> */}
          </video>
        );
    }
  };
  const setMediaAsset = (url) => {
    setMedia(url);
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
              <Avatar alt='user-avatar' src={avatarImage} />
              <span className='app-card-bottom-text'>
                {user.first_name} {user.last_name}
              </span>
            </div>
            {media && mediaJSX()}
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
          <MediaUpload
            showDialogue={showDialogue}
            onClose={() => setShowDialogue(false)}
            mediaType={mediaType}
            onImageSave={(file) => {
              getSignedUrl(file[0]).then((res) => {
                setMediaAsset(res.newUrl);
              });
            }}
          />
          <label htmlFor='media-upload'>
            <div className='create-post-dialog-action-content'>
              <button className='create-post-button' onClick={handleSave}>
                <Save /> <span className='app-card-bottom-text'>Save</span>
              </button>
              <div
                className='create-post-action-icons'
                onClick={() => {
                  setShowDialogue(true);
                  setMediaType('video');
                }}>
                <Videocam style={{color: 'red'}} />
              </div>
              <div
                onClick={() => {
                  setShowDialogue(true);
                  setMediaType('image');
                }}
                className='create-post-action-icons'>
                <PermMedia
                  // onClick={() => {
                  //   setShowDialogue(true);
                  //   setMediaType('video');
                  // }}
                  style={{color: 'red'}}
                />
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
            <Avatar alt='user-avatar' src={avatarImage} />
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
