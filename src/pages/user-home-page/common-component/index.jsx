import React, {useState} from 'react';
import UserHomeHeader from '../user-page-header';

import './style.css';

export default function CommonComponent(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [conversationExtended, setConversationExtended] = useState(false);
  const toggleExpansion = () => {
    setConversationExtended(!conversationExtended);
  };
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
