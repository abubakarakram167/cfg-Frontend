import React, {useState} from 'react';
import {Card, Avatar, TextField} from '@material-ui/core';
import Reply from './reply';
import './style.css';
export default function Comment({comment, addReplyAction}) {
  const [reply, setReply] = useState('');

  const addReply = (e) => {
    if (e.key === 'Enter' && reply.length > 0) {
      addReplyAction(reply);
      setReply('');
    }
  };

  return (
    <div>
      <Card className='comment-card'>
        <div className='comment-card-content'>
          <div className='comment-card-content-left'>
            <Avatar alt='user-avatar' />{' '}
            <span className='comment-text'>{comment.commentText}</span>
          </div>
        </div>
        <div className='comment-card-reply-section'>
          {comment.commentReplies.map((reply, index) => {
            return <Reply text={reply} key={index} />;
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
