import React from 'react';
import {Card, Avatar} from '@material-ui/core';
import './style.css';
const Reply = ({text}) => {
  return (
    <Card className='reply-card'>
      <div className='reply-card-content'>
        <div className='reply-card-content-left'>
          <Avatar alt='user-avatar' />{' '}
          <span className='reply-text'>{text}</span>
        </div>
      </div>
    </Card>
  );
};

export default Reply;
