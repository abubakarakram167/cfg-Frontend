import React, { useState, useEffect } from 'react';
import UserHomeHeader from '../user-page-header';
import { socket } from '../../../socket';
import './style.css';
import { socketEnums } from 'utils/socketEnums';

export default function CommonComponent(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [conversationExtended, setConversationExtended] = useState(false);
  const toggleExpansion = () => {
    setConversationExtended(!conversationExtended);
  };
  useEffect(() => {
    socket.connectAction();
    console.log(socket.onAction(socketEnums.post));
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
