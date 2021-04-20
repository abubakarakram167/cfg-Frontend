import React, {useContext, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';

import PropTypes from 'prop-types';
import useStyles from './AppSidebar.style';

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Avatar,
} from '@material-ui/core';
import {
  ExpandLess,
  ExpandMore,
  People,
  Event,
  ChatBubble,
  Build,
  Group,
  Forum,
  Home,
  AccountCircle,
  Bookmark,
} from '@material-ui/icons';
import {Link} from 'react-router-dom';
const AppSidebar = (props) => {
  const [navCollapsed, setnavCollapsed] = useState(true);

  const handleToggleDrawer = () => {
    setnavCollapsed(!navCollapsed);
  };
  const [conversationExtended, setConversationExtended] = useState(false);
  const toggleExpansion = () => {
    setConversationExtended(!conversationExtended);
  };

  const classes = useStyles({});
  return (
    <Drawer
      anchor={props.position}
      open={props.drawerOpen}
      onClose={(ev) => handleToggleDrawer()}
      classes={{
        root: clsx(props.variant),
        paper: clsx(props.variant),
      }}
      style={{position: 'absolute', overflowY: 'scroll'}}>
      <div style={{width: '350px'}}>
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <div
            style={{
              color: '#EB1B29',
              fontSize: '25px',
              fontWeight: 600,
              marginBottom: '10px',
            }}>
            JMMB Foundation
          </div>
          <Avatar
            style={{
              width: '250px',
              height: '250px',
              border: '1px solid gainsboro',
            }}
            src='https://www.history.com/.image/t_share/MTc5MzY2ODYwNDIzMTc3NTQ5/michelle-obama-gettyimages-1138043297.jpg'
            alt='michelle obama'
          />
          <div
            style={{
              color: 'black',
              fontSize: '25px',
              fontWeight: 600,
              marginTop: '10px',
            }}>
            Michelle Obama
          </div>
        </div>
        <br />
        <hr />
        <br />
        <List>
          <Link to='/home/user-profile'>
            <ListItem>
              <ListItemIcon>
                <AccountCircle style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='My profile' />
            </ListItem>
          </Link>
          <Link to='/home/user-achievements'>
            <ListItem>
              <ListItemIcon>
                <Bookmark style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='My Achievements' />
            </ListItem>
          </Link>
          <Link to='/home'>
            <ListItem>
              <ListItemIcon>
                <Home style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>
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
                  <ExpandLess
                    onClick={toggleExpansion}
                    style={{cursor: 'pointer'}}
                  />
                ) : (
                  <ExpandMore
                    onClick={toggleExpansion}
                    style={{cursor: 'pointer'}}
                  />
                )}
              </div>
            </ListItemText>
          </ListItem>
          <Collapse in={conversationExtended} timeout='auto' unmountOnExit>
            <List>
              <ListItemText style={{paddingLeft: '60px'}}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
                excepturi, ipsa expedita mollitia magnam facere. Qui suscipit
                rerum cum consequatur, quis aliquam adipisci alias omnis totam?
                Ratione nihil labore dicta.
              </ListItemText>
            </List>
          </Collapse>

          <Link to='/home/user-connections'>
            <ListItem>
              <ListItemIcon>
                <Group style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='My CFG Family' />
            </ListItem>
          </Link>
          <Link to='/home/user-groups'>
            <ListItem>
              <ListItemIcon>
                <People style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='Groups' />
            </ListItem>
          </Link>
          <Link to='/home/user-events'>
            <ListItem>
              <ListItemIcon>
                <Event style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='Events' />
            </ListItem>
          </Link>
          <Link to='/home/cfg-tools'>
            <ListItem>
              <ListItemIcon>
                <Build style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='CFG Tools' />
            </ListItem>
          </Link>
          <Link to='/home/host-a-conversation'>
            <ListItem>
              <ListItemIcon>
                <ChatBubble style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='Host A Conversation' />
            </ListItem>
          </Link>
        </List>
      </div>
    </Drawer>
  );
};

export default AppSidebar;

AppSidebar.defaultProps = {
  variant: '',
  position: 'left',
};

AppSidebar.propTypes = {
  position: PropTypes.string,
  variant: PropTypes.string,
};
