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
import {baseUrl} from 'utils/axios';
import {useSelector} from 'react-redux';

export default function Comment({comment, addReplyAction, replies}) {
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

  async function getUserData() {
    const data = await Friend.getUserDetails(comment.created_by);
    if (data) {
      if (data.data) {
        setUser(data.data);
      }
    }
  }

  const addReply = (e) => {
    if (e.key === 'Enter' && reply.length > 0) {
      addReplyAction(reply);
      setReply('');
    }
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

  return (
    <div>
      {editDialogJSX}
      <Card className='comment-card'>
        <div className='comment-card-content'>
          <div className='comment-card-content-left'>
            <Avatar alt='user-avatar' src={user.photo_url} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div
                style={{
                  marginLeft: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <span style={{marginRight: '10px'}}>
                  {user.first_name + ' ' + user.last_name}
                </span>
                {/* {currentUser && currentUser.user_name === user.user_name && <Edit fontSize="small" onClick={() => setEditDialogOpen(true)} style={{ cursor: 'pointer' }} />} */}
              </div>
              <span className='comment-text'>{comment.content}</span>
            </div>
            <span>
              <IconButton aria-label='delete'>
                <Delete
                  onClick={() => {
                    console.log('it is calling...');
                  }}
                />
              </IconButton>
            </span>
          </div>
        </div>
        <div className='comment-card-reply-section'>
          {replies.map((reply, index) => {
            return <Reply reply={reply} key={index} />;
          })}
          <TextField
            value={reply}
            label='reply'
            fullWidth
            variant='filled'
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={addReply}
          />
        </div>
      </Card>
    </div>
  );
}
