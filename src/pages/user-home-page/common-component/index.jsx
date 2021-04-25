import React, {useState, useEffect} from 'react';
import UserHomeHeader from '../user-page-header';
// import { socket } from '../../../socket'
import {socket} from '../../../socket';
import './style.css';

export default function CommonComponent(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [conversationExtended, setConversationExtended] = useState(false);
  const toggleExpansion = () => {
    setConversationExtended(!conversationExtended);
  };
  useEffect(() => {
    alert('hello');

    // Add a connect listener
    socket.on('connect', () => {
      alert('Connected!');
      console.log(socket.id);
    });
    socket.on('post', function (post) {
      alert(post);
    });
    socket.on('post', function (post) {
      alert(post);
    });
    socket.emit('login', 'hello from client');
    alert(socket.id);
  }, []);

  return (
    <div>
      <UserHomeHeader />
      <div className='user-home-page-content'>
        <div className='user-home-left'>{props.left}</div>
        <div className='user-home-center'>{props.children}</div>
        <div className='user-home-right'>{props.right}</div>
      </div>
    </div>
  );
}
