import React, {useState, useEffect} from 'react';
import {
  Card,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import Reply from './reply';
import './style.css';
import Friend from 'redux/services/friends';
import {useSelector} from 'react-redux';
import {getSignedUrl} from '../../../../redux/actions/media';
import CommentService from 'redux/services/comment';
import * as actions from '../../../../redux/actions/action.types';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';

export default function Comment({
  comment,
  addReplyAction,
  replies,
  afterDeleteCommentGetPost,
  postId,
}) {
  console.log('the comment', comment);
  const [reply, setReply] = useState('');
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    photo_url: '',
  });
  const currentUser = useSelector((state) => state.auth.user);
  const [editText, setEditText] = useState(comment.content);
  const [editedText, setEditedText] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [userAvatarImage, setUserAvatarImage] = useState(null);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const dispatch = useDispatch();

  async function getUserData() {
    const data = await Friend.getUserDetails(comment.created_by);
    if (data) {
      if (data.data) {
        setUser(data.data);
        if (data.data) {
          getSignedUrl({fileName: data.data.photo_url}).then((res) => {
            console.log('..............................');
            console.log('after response', res);
            setUserAvatarImage(res.newUrl);
          });
          console.log('the data.data', data.data);
        }
      }
    }
  }

  const addReply = (e) => {
    if (e.key === 'Enter' && reply.length > 0) {
      addReplyAction(reply);
      setReply('');
    }
  };

  const deletePostComment = async (comment) => {
    console.log('the comment', comment);
    const response = await CommentService.deleteComment(comment);
    const data_resp = response.data;
    afterDeleteCommentGetPost(postId);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const editCommentAction = () => {
    console.log('hello');
  };

  const editDialogJSX = (
    <Dialog open={editDialogOpen} fullWidth>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          style={{width: '100%'}}
          id='standard-multiline-static'
          multiline
          variant='filled'
          rows={4}
          fullwidth
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          placeholder='comment'
        />
        <DialogActions style={{width: '100%'}}>
          <Button
            onClick={() => {
              setEditText(comment.content);
              setEditDialogOpen(false);
            }}
            variant='contained'
            color='primary'>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => editCommentAction()}>
            Save
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
  console.log('the user', user);

  return (
    <div>
      {editDialogJSX}
      <div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <img
            alt='user-avatar'
            className='user-image-comment'
            src={userAvatarImage}
          />
          <div className='comment-author-container'>
            <div style={{marginRight: '10px', color: '#afadad'}}>
              {user.first_name + ' ' + user.last_name}
            </div>
            {/* {currentUser && currentUser.user_name === user.user_name && <Edit fontSize="small" onClick={() => setEditDialogOpen(true)} style={{ cursor: 'pointer' }} />} */}
            <div className='comment-text'>{comment.content}</div>
          </div>
          <span>
            <IconButton aria-label='delete'>
              <Delete
                onClick={() => {
                  deletePostComment(comment.id);
                }}
              />
            </IconButton>
          </span>
        </div>
        <div className='bottom-text-actions'>
          <span className='cursor-pointer'>Give Love | </span>
          <span
            className='cursor-pointer'
            onClick={() => setShowReplyInput(true)}>
            Reply |
          </span>
          <span>{moment(comment.createdAt).fromNow()}</span>
        </div>
      </div>
      <div className='comment-card-reply-section'>
        {replies.map((reply, index) => {
          return <Reply reply={reply} key={index} />;
        })}
        {showReplyInput && (
          <div className='parent-reply-container'>
            <div
              style={{
                width: 50,
                margin: 0,
                marginTop: 5,
                paddingBottom: 30,
              }}>
              <img
                src={userAvatarImage}
                style={{width: 45, height: 45, borderRadius: 40}}
              />
            </div>
            <div style={{flex: 8}}>
              <InputEmoji
                value={reply}
                onChange={(e) => setReply(e)}
                cleanOnEnter
                onEnter={addReply}
                onKeyDown={addReply}
                placeholder='Write a reply ...'
                height={60}
              />
            </div>
          </div>
        )}
        {/* <TextField
            value={reply}
            label='reply'
            fullWidth
            variant='filled'
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={addReply}
          /> */}
      </div>
    </div>
  );
}
