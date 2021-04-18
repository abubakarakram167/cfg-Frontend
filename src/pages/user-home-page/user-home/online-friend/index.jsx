import React from 'react';
import {Avatar} from '@material-ui/core';
import './style.css';
export default function OnlineFriend({name}) {
  return (
    <div className='right-online-friend'>
      <Avatar alt='user-avatar' />{' '}
      <span className='online-friend-name'>{name}</span>
    </div>
  );
}
