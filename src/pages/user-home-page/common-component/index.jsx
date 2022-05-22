import React, {useState, useEffect, lazy} from 'react';
import {socket} from '../../../socket';
import './style.css';
import {socketEnums} from 'utils/socketEnums';
const UserHomeHeader = lazy(() => import('../user-page-header'));

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
  const [scroll, setScroll] = useState(0);

  const returnCenterClass = () => {
    if (props.left == 'noMenu') {
      return 'fullscreen-user-home-center';
    }
    return 'user-home-center';
  };
  return (
    <div>
      {!props.showHeader && <UserHomeHeader />}

      <div className='user-home-page-content'>
        {props.left != 'noMenu' && (
          <div className='user-home-left'>{props.left}</div>
        )}
        <div
          className={returnCenterClass()}
          onScroll={() => {
            if (props.scroll) {
              console.log(scroll);

              if (scroll === 4) {
                setTimeout(props.scrollAction(), 2000);
                setScroll(0);
              } else {
                setScroll(scroll + 1);
              }
            }
          }}>
          {props.children}
        </div>
        {props.right != 'noMenu' && (
          <div div className='user-home-right'>
            {props.right}
          </div>
        )}
      </div>
    </div>
  );
}
