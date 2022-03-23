import React, {useState, useEffect, useRef} from 'react';
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Collapse,
} from '@material-ui/core';
import {People} from '@material-ui/icons';
import './style.css';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';

import {
  createMessage,
  getFriendMessages,
  getUserChatFamily,
} from '../../../redux/actions/messages';

export default function UserHomePage() {
  const [isChatBoxOpen, setChatBoxOpen] = useState(false);
  const [user, setUser] = useState({});
  const [userFamily, setUserFamily] = useState([]);
  const [chatUser, setChatUser] = useState({});
  const [currMessages, setCurrentMessages] = useState([]);

  //function to get user Family to load chat icons
  async function getUserFamily() {
    let resp = await getUserChatFamily();
    if (resp.status === 200 && resp.data.length > 0) {
      setUserFamily(resp.data);
      console.log('userFamily is', resp.data);
    }
  }

  async function getUserFriendMessages(friendId) {
    let resp = await getFriendMessages(friendId);
    if (resp.status === 200 && resp.data.length > 0) {
      setCurrentMessages(resp.data);
      console.log('friend chat is', resp.data);
    } else {
      setCurrentMessages([]);
    }
  }
  function getTimeStampToHM(timestamp) {
    var h = new Date(timestamp).getHours();
    var m = new Date(timestamp).getMinutes();

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;

    var output = h + ':' + m;
    return output;
  }

  useEffect(() => {
    let localUser = JSON.parse(localStorage.getItem('current-user'));
    setUser(localUser);
    getUserFamily();
  }, []);

  //hook to open user chat box
  useEffect(() => {
    if (chatUser.first_name) {
      setCurrentMessages([]);
      getUserFriendMessages(chatUser.friend);
    }
  }, [chatUser]);

  return (
    <List>
      <ListItem>
        <div style={{display: 'flex', flexDirection: 'row', width: '196px'}}>
          <span style={{flex: 1}}>
            <ListItemIcon>
              <People
                fontSize='large'
                style={{
                  color: '#9C3F0F',
                  opacity: 1,
                  minWidth: 30,
                  marginRight: '5px',
                }}
              />
            </ListItemIcon>
          </span>
          <span
            style={{
              flex: 3,
              // textAlign: 'left',
              font: 'normal normal 600 25px/33px Segoe UI',
              letterSpacing: '0.32px',
              color: '#919191',
              minWidth: 200,
            }}>
            My CFG Family
          </span>
        </div>
      </ListItem>
      <div class='contacts-rectangle'>
        {/* user friends list*/}
        <div id='friends' style={{display: isChatBoxOpen ? 'none' : 'block'}}>
          {userFamily.map((friend) => (
            <div
              id='user'
              class='row chat_user'
              onClick={() => {
                setChatUser(friend);
                setChatBoxOpen(true);
              }}>
              <div
                class={`circle ${friend.isOnline ? 'online' : 'offline'}`}
                style={{
                  background: `transparent url(${friend.photoUrl})   10% 10% no-repeat padding-box`,
                  backgroundSize: '55px 45px',
                }}></div>
              <span class='user_name'>
                {friend.first_name} {friend.last_name}
              </span>
            </div>
          ))}
        </div>

        {/* user chat area */}
        {chatUser.first_name && (
          <div
            id='chat'
            class='chat-rectangle'
            style={{display: isChatBoxOpen ? 'block' : 'none'}}>
            <div
              id='header-chat-box'
              style={{height: '40px', paddingRight: '10px'}}>
              <div
                id='user'
                class='row chat_user_chat_box'
                style={{marginLeft: '10px'}}>
                <div
                  class={`circle ${
                    chatUser.isOnline ? 'online' : 'offline'
                  } col-3`}
                  style={{
                    background: `transparent url(${chatUser.photoUrl})   10% 10% no-repeat padding-box`,
                    backgroundSize: '80px 45px',
                  }}></div>
                <span class='user_name_chat_box  col-xl-7 col-lg-7 col-md-7'>
                  {chatUser.first_name} {chatUser.last_name}
                </span>
                <CancelIcon
                  fontSize='medium'
                  style={{
                    color: 'red',
                    float: 'right',
                    align: 'right',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setChatBoxOpen(false);
                  }}
                />
              </div>
            </div>

            <hr />

            <div id='messages' style={{height: '144px'}}>
              {currMessages.map((msg) => {
                if (msg.sent_by === user.id) {
                  return (
                    <div className='right-message'>
                      <span class='msg-text-right'>{msg.text}</span>
                      {'   '}
                      <span class='msg-time'>
                        {getTimeStampToHM(msg.created_at)}
                      </span>
                    </div>
                  );
                } else {
                  return (
                    <div className='left-message'>
                      <span class=''>{msg.text}</span>
                      {'   '}
                      <span class='msg-time'>
                        {getTimeStampToHM(msg.created_at)}
                      </span>
                    </div>
                  );
                }
              })}
            </div>

            <div
              id='chat-input'
              class='chat_input_div'
              style={{height: '40px'}}>
              <input type='text' class='chat_input' placeholder='Message' />
              <SendIcon
                fontSize='medium'
                style={{color: 'white', cursor: 'pointer', marginLeft: '2px'}}
              />
            </div>
          </div>
        )}
      </div>
    </List>
  );
}
