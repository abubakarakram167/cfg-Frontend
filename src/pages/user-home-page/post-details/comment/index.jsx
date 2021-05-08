import React, {useState, useEffect} from 'react';
import {Card, Avatar, TextField} from '@material-ui/core';
import Reply from './reply';
import './style.css';
import Friend from 'redux/services/friends';
import {baseUrl} from 'utils/axios';
export default function Comment({comment, addReplyAction, replies}) {
  const [reply, setReply] = useState('');
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    photo_url: '',
  });

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

  return (
    <div>
      <Card className='comment-card'>
        <div className='comment-card-content'>
          <div className='comment-card-content-left'>
            <Avatar
              alt='user-avatar'
              src={baseUrl + 'static/' + user.photo_url}
            />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div
                style={{
                  marginLeft: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}>
                {user.first_name + ' ' + user.last_name}
              </div>
              <span className='comment-text'>{comment.content}</span>
            </div>
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
