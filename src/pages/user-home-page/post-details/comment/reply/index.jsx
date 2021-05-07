import React, {useState, useEffect} from 'react';
import {Card, Avatar} from '@material-ui/core';
import './style.css';
import Friend from 'redux/services/friends';
import {baseUrl} from 'utils/axios';
const Reply = ({reply}) => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    photo_url: '',
  });

  async function getUserData() {
    const data = await Friend.getUserDetails(reply.created_by);
    if (data) {
      if (data.data) {
        setUser(data.data);
      }
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Card className='reply-card'>
      <div className='reply-card-content'>
        <div className='reply-card-content-left'>
          <Avatar
            alt='user-avatar'
            src={baseUrl + '/static/' + user.photo_url}
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
            <span className='comment-text'>{reply.content}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Reply;
