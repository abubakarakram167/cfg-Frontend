import React, {useState, useEffect, lazy} from 'react';
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
import InputEmoji from 'react-input-emoji';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TextareaAutosize from 'react-textarea-autosize';

const AppCard = lazy(() => import('@crema/core/AppCard'));
const MediaUpload = lazy(() => import('components/MediaUpload'));
const Picker = lazy(() => import('components/emojiComponent'));

const defaultHeight = {
  height: 180,
  paddingTop: 0,
};

const changeHeight = {
  height: 450,
  paddingTop: 0,
};

export default function CreatePostBox(props) {
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
  const [showPicker, setShowPicker] = useState(null);
  const [showUpperPicker, setShowUpperPicker] = useState(null);
  const [showimagePicker, setShowImagePicker] = useState(false);

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
    setShowPicker(false);
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
    dispatch(createUserPost(userPost)).then((res) => {
      props.getUserPost();
    });

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

  const getPostPercentage = (content) => {
    return parseInt(content.length / 3);
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
        <DialogContent
          style={showPicker || media ? changeHeight : defaultHeight}>
          <DialogContentText id='alert-dialog-description'>
            <div className='create-post-dialog-user-info'>
              <Avatar alt='user-avatar' src={avatarImage} />
              <span className='app-card-bottom-text'>
                {user.first_name} {user.last_name}
              </span>
            </div>
            {media && <div style={{width: 300, height: 300}}>{mediaJSX()}</div>}
            <Picker
              show={showPicker}
              onGetEmoji={(emoji) => {
                setContent(content + emoji);
              }}
            />
            <TextareaAutosize
              style={{width: '100%'}}
              id='standard-multiline-static'
              variant='filled'
              rows={1}
              fullwidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className='create-post-box-input'
              onFocus={() => {
                setShowPicker(false);
                setShowUpperPicker(false);
              }}
            />
            <span
              className='emoji-container-post'
              onClick={() => {
                setShowPicker(!showPicker);
              }}>
              <EmojiEmotions style={{color: '#ababab'}} />
            </span>
            {/* <InputEmoji
              value={content}
              onChange={(e) => setContent(e)}
              placeholder="What's on your mind?"
              maxLength={300}
            /> */}
            {!showPicker && (
              <CircularProgressbar
                value={getPostPercentage(content)}
                text={`${getPostPercentage(content)} %`}
              />
            )}
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
                if (showimagePicker) {
                  setOpen(true);
                  setTimeout(() => {
                    setShowImagePicker(false);
                  }, 2000);
                }
              });
            }}
          />
          <label className='bottom-section' htmlFor='media-upload'>
            <div className='create-post-dialog-action-content'>
              <button className='create-post-button' onClick={handleSave}>
                <Save /> <span className='app-card-bottom-text'>Post</span>
              </button>
              <div
                className='create-post-action-icons'
                onClick={() => {
                  setShowDialogue(true);
                  setMediaType('video');
                  setShowPicker(false);
                }}>
                <Videocam style={{color: 'red'}} />
              </div>
              <div
                onClick={() => {
                  setShowDialogue(true);
                  setMediaType('image');
                  setShowPicker(false);
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
              {/* <div className='create-post-action-icons'>
                <EmojiEmotions style={{color: 'red'}} />
              </div> */}
            </div>
          </label>
        </DialogActions>
      </Dialog>
      <AppCard>
        {showUpperPicker && (
          <Picker
            show={showUpperPicker}
            onGetEmoji={(emoji) => {
              setContent(content + emoji);
              setShowUpperPicker(false);
              setOpen(true);
            }}
          />
        )}
        <div className='create-post-app-card-container'>
          <div className='create-post-app-card-top'>
            <Avatar alt='user-avatar' src={avatarImage} />
            <input
              onClick={handleClickOpen}
              type='text'
              className='create-post-input-trigger'
              placeholder="What's on your mind?"
            />
          </div>
          <div className='create-post-app-card-bottom'>
            <div className='create-post-app-card-bottom-box'>
              <Videocam style={{color: 'red'}} />{' '}
              <span className='app-card-bottom-text'>Live Video</span>
            </div>
            <div
              onClick={() => {
                setShowDialogue(true);
                setOpen(true);
                setMediaType('image');
                setShowPicker(false);
              }}
              className='create-post-app-card-bottom-box'>
              <PermMedia style={{color: 'red'}} />{' '}
              <span className='app-card-bottom-text'>Photo/Videos</span>
            </div>
            <div
              onClick={() => {
                setShowUpperPicker(!showUpperPicker);
              }}
              className='create-post-app-card-bottom-box'>
              <EmojiEmotions style={{color: 'red'}} />{' '}
              <span className='app-card-bottom-text'>Feeling</span>
            </div>
          </div>
        </div>
      </AppCard>
    </div>
  );
}
