import React, {useState} from 'react';
import UserHomeHeader from '../user-page-header';
import CfgToolOfTheDay from './cfg-tools';
import OnlineFriend from './online-friend';
import './style.css';
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Collapse,
  Avatar,
} from '@material-ui/core';
import {
  Forum,
  People,
  Group,
  Event,
  Build,
  ChatBubble,
  ExpandMore,
  ExpandLess,
} from '@material-ui/icons';
export default function CommonComponent(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [conversationExtended, setConversationExtended] = useState(false);
  const toggleExpansion = () => {
    setConversationExtended(!conversationExtended);
  };
  return (
    <div>
      {/* <button onClick={toggleDrawerOpen}>Toggle</button>
                hello world
                <AppSideBar drawerOpen={drawerOpen} /> */}
      <UserHomeHeader />

      <div className='user-home-page-content'>
        <div className='user-home-left'>
          <List>
            <ListItem>
              <ListItemIcon>
                <Forum style={{color: 'red'}} />
              </ListItemIcon>

              <ListItemText>
                <div
                  className='left-first-expander'
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <div>My Conversations</div>
                  {conversationExtended ? (
                    <ExpandLess onClick={toggleExpansion} />
                  ) : (
                    <ExpandMore onClick={toggleExpansion} />
                  )}
                </div>
              </ListItemText>
            </ListItem>
            <Collapse in={conversationExtended} timeout='auto' unmountOnExit>
              <List>
                <ListItemText style={{paddingLeft: '60px'}}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Minus excepturi, ipsa expedita mollitia magnam facere. Qui
                  suscipit rerum cum consequatur, quis aliquam adipisci alias
                  omnis totam? Ratione nihil labore dicta.
                </ListItemText>
              </List>
            </Collapse>
            <ListItem>
              <ListItemIcon>
                <Group style={{color: 'brown'}} />
              </ListItemIcon>
              <ListItemText primary='My CFG Family' />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <People style={{color: 'green'}} />
              </ListItemIcon>
              <ListItemText primary='Groups' />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Event style={{color: 'blue'}} />
              </ListItemIcon>
              <ListItemText primary='Events' />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Build />
              </ListItemIcon>
              <ListItemText primary='CFG Tools' />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ChatBubble style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='Host A Conversation' />
            </ListItem>
          </List>
        </div>
        <div className='user-home-center'>{props.children}</div>
        <div className='user-home-right'>
          <List>
            <ListItem>
              <ListItemIcon>
                <Build />
              </ListItemIcon>
              <ListItemText primary='CFG Tools of the Day' />
            </ListItem>
            <ListItem>
              <CfgToolOfTheDay
                url={
                  'https://static.remove.bg/remove-bg-web/2a274ebbb5879d870a69caae33d94388a88e0e35/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg'
                }
                title={'vacation'}
              />
            </ListItem>
            <ListItem>
              <CfgToolOfTheDay
                url={
                  'https://static.remove.bg/remove-bg-web/2a274ebbb5879d870a69caae33d94388a88e0e35/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg'
                }
                title={'vacation'}
              />
            </ListItem>
            <hr />
            <ListItem>
              <ListItemIcon>
                <Event style={{color: 'blue'}} />
              </ListItemIcon>
              <ListItemText primary='Events' />
            </ListItem>
            <ListItem>
              <div>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                <div>21st december 2012</div>
              </div>
            </ListItem>
            <ListItem>
              <div>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                <div>21st december 2012</div>
              </div>
            </ListItem>
            <hr />
            <ListItem>
              <ListItemIcon>
                <People style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='Online Family' />
            </ListItem>
            <ListItem>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <OnlineFriend name={'Jermaine Gray'} />
                <OnlineFriend name={'Hassan Yousaf'} />
                <OnlineFriend name={'Abubakr'} />
                <OnlineFriend name={'Abrar Farhad'} />
              </div>
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
}

// <div>
//   {/* <button onClick={toggleDrawerOpen}>Toggle</button>
//         hello world
//         <AppSideBar drawerOpen={drawerOpen} /> */}
//   <UserHomeHeader />

//   <div className='user-home-page-content'>
//     <div className='user-home-left'>Left</div>
//     <div className='user-home-center'>

//     </div>
//     <div className='user-home-right'>Right</div>
//   </div>
// </div>
