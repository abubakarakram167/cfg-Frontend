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
import {socket} from '../../../socket';

export default function UserHomePage() {
  const socketIn = socket.getSocket();
  const [isChatBoxOpen, setChatBoxOpen] = useState(false);
  const [user, setUser] = useState({});
  const [userFamily, setUserFamily] = useState([]);
  const [chatUser, setChatUser] = useState({});
  const [currMessages, setCurrentMessages] = useState([]);
  const msgInputRef = useRef(0);

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

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // Ensure it is only this code that runs
      sendMessage();
    }
  }
  function getChatUser() {
    console.log('into get user');
    return chatUser;
  }

  function messageListener(newMessage, chatUser, currMessages) {
    const {message, userSend} = newMessage;
    let chatUserid = 0;
    setChatUser((prev) => {
      console.log('prevValue is', prev);
      chatUserid = prev.friend;
      return prev;
    });

    // console.log('chat user id is', chatUserid);
    if (chatUserid === userSend.id) {
      let insMessage = {
        sent_by: userSend.id,
        recieved_by: user.id,
        text: message.text,
        created_at: message.created_at,
      };

      setCurrentMessages((prev) => {
        return [...prev, insMessage];
      });
    }
  }

  async function sendMessage() {
    let msg = msgInputRef.current.value;
    if (msg !== '') {
      let message = {recieved_by: chatUser.friend, text: msg, type: 'text'};
      let resp = await createMessage(message);
      if (resp.status === 200) {
        msgInputRef.current.value = '';
        let newMessage = {
          sent_by: user.id,
          recieved_by: chatUser.friend,
          text: msg,
          created_at: new Date(),
        };

        setCurrentMessages((prev) => {
          return [...prev, newMessage];
        });
      } else {
        alert('error sending message');
      }
    }
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

  //chat box scroll to botton hook
  useEffect(() => {
    if (currMessages.length > 0) {
      var objDiv = document.getElementById('messages');
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [currMessages]);

  //event listener hook from socket
  useEffect(() => {
    // as soon as the component is mounted, do the following tasks:

    // subscribe to socket events
    socketIn.on('message', messageListener);

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      socketIn.off('message', messageListener);
    };
  }, [socketIn]);

  // useEffect(() => {
  //   alert(JSON.stringify(chatUser));
  // }, [chatUser]);
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
        <div id='friends'>
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
      </div>
      <div
        class='chat-popup chat-rectangle'
        id='myForm'
        style={{display: isChatBoxOpen ? 'block' : 'none'}}>
        {/* user chat area */}
        {chatUser.first_name && (
          <div id='chat' class=''>
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
                    backgroundSize: '90px 50px',
                  }}></div>
                <span class='user_name_chat_box  col-xl-7 col-lg-7 col-md-7'>
                  {chatUser.first_name} {chatUser.last_name}
                </span>
                <CancelIcon
                  fontSize='large'
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

            <div id='messages' class='msg-box'>
              {currMessages.map((msg) => {
                if (msg.sent_by === user.id) {
                  return (
                    <div class='chat-parent-right '>
                      <div class='testdiv1'>{msg.text}</div>
                      <div class='testdiv2'>
                        {getTimeStampToHM(msg.created_at)}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div class='chat-parent-left '>
                      <div class='testdiv1'>{msg.text}</div>
                      <div class='testdiv2'>
                        {getTimeStampToHM(msg.created_at)}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div id='chat-input' class='chat_input_div'>
              <input
                type='text'
                ref={msgInputRef}
                class='chat_input'
                placeholder='Message'
                onKeyPress={handleKeyPress}
              />
              <SendIcon
                fontSize='medium'
                style={{color: 'white', cursor: 'pointer', marginLeft: '7px'}}
                onClick={() => {
                  sendMessage();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </List>
  );
}
