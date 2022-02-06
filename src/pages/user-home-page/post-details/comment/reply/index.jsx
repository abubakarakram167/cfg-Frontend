import React, {useState, useEffect} from 'react';
import {Card, Avatar} from '@material-ui/core';
import './style.css';
import Friend from 'redux/services/friends';
import {baseUrl} from 'utils/axios';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {getSignedUrl} from '../../../../../redux/actions/media';
import moment from 'moment';

const Reply = ({reply}) => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    photo_url: '',
  });

  const [userAvatarImage, setUserAvatarImage] = useState(null);

  async function getUserData() {
    const data = await Friend.getUserDetails(reply.created_by);
    if (data) {
      if (data.data) {
        setUser(data.data);
        console.log('sssin reply.');
        getSignedUrl({fileName: data.data.photo_url}).then((res) => {
          console.log('.in reply.');
          console.log('after response', res);
          setUserAvatarImage(res.newUrl);
        });
      }
    }
  }

  const deleteCommentReply = (replyId) => {};

  useEffect(() => {
    getUserData();
  }, []);

  return (
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
          <div className='comment-text'>{reply.content}</div>
        </div>
        <span>
          <IconButton aria-label='delete'>
            <Delete
              onClick={() => {
                deleteCommentReply(reply.id);
              }}
            />
          </IconButton>
        </span>
      </div>
      <div className='bottom-text-actions'>
        <span className='cursor-pointer'>Give Love | </span>
        <span className='cursor-pointer'>Reply |</span>
        <span>{moment(reply.createdAt).fromNow()}</span>
      </div>
    </div>
    // <Card className='reply-card'>
    //   <div className='reply-card-content'>
    //     <div className='reply-card-content-left'>
    //       <Avatar
    //         alt='user-avatar'
    //         src={baseUrl + 'static/' + user.photo_url}
    //       />
    //       <div style={{display: 'flex', flexDirection: 'column'}}>
    //         <div
    //           style={{
    //             marginLeft: '20px',
    //             fontSize: '12px',
    //             fontWeight: 600,
    //             textTransform: 'capitalize',
    //           }}>
    //           {user.first_name + ' ' + user.last_name}
    //         </div>
    //         <span className='comment-text'>
    //           {reply.content}{' '}
    //           <IconButton aria-label='delete'>
    //             <Delete
    //               onClick={() => {
    //                 deleteCommentReply(reply.id);
    //               }}
    //             />
    //           </IconButton>
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </Card>
  );
};

export default Reply;
