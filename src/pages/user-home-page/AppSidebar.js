import React, {useContext, useState, useEffect} from 'react';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import './style.css';
import PropTypes from 'prop-types';
import useStyles from './AppSidebar.style';

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Avatar,
  Button,
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
  Cancel,
  CardGiftcard,
} from '@material-ui/icons';
import SearchBar from '@crema/core/SearchBar';
import SearchIcon from '@material-ui/icons/Search';
import Logout from '@material-ui/icons/ExitToApp';
import LogoImage from 'assets/jmmb-foundation.png';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {baseUrl} from 'utils/axios';
import {Card} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Search from 'redux/services/search';
import Friend from 'redux/services/friends';
import {socket} from 'socket';
import jsCookie from 'js-cookie';
import MediaGroup from 'redux/services/mediagroup';
import Session from 'redux/services/session';

import './sidestyle.css';
const AppSidebar = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [resultVisibility, setResultVisibility] = useState(false);
  const [navCollapsed, setnavCollapsed] = useState(true);
  const [conversation, setConversation] = useState(null);

  const searchUser = async (e) => {
    e.persist();
    const searchTerm = e.target.value;
    const data = await Search.userSearch(searchTerm);
    setSearchResults(data.data.users);
    setResultVisibility(true);
  };

  const sendFriendRequest = async (id) => {
    const data = await Friend.sendFriendRequest({userId: id});
  };
  const getSessionById = async (id) => {
    const data = await Session.getSessionById(id);

    setConversation(data.data.data);
  };

  const getSessionByGroupId = async (id) => {
    const data = await MediaGroup.getSessionsByGroupId(id);
    console.log('the getting sessions', data);
    if (data && data.data.length) getSessionById(data.data[1].id);
  };
  const getUserGroup = async () => {
    const data = await MediaGroup.getUserGroup();
    if (data && data.data) getSessionByGroupId(data.data.group_id);
  };
  useEffect(() => {
    getUserGroup();
  }, []);

  const handleLogout = () => {
    const user = JSON.parse(localStorage.getItem('current-user'));
    socket.logoutAction(user.id);
    localStorage.removeItem('current-user');
    localStorage.removeItem('auth-token');
    jsCookie.remove('login');
    jsCookie.remove('access');
    window.location.href = '/';
  };

  const handleToggleDrawer = () => {
    setnavCollapsed(!navCollapsed);
  };
  const [conversationExtended, setConversationExtended] = useState(false);
  const toggleExpansion = () => {
    setConversationExtended(!conversationExtended);
  };

  const classes = useStyles({});
  const user = useSelector((state) => {
    return state.auth.user;
  });

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
              display: 'flex',
              alignItems: 'center',
            }}>
            JMMB Foundation{' '}
            <Cancel
              onClick={props.toggleDrawerOpen}
              style={{marginLeft: '10px'}}
            />
          </div>
          <Avatar
            style={{
              width: '250px',
              height: '250px',
              border: '1px solid gainsboro',
            }}
            src={user && baseUrl + 'static/' + user.photo_url}
            alt={user && user.first_name + ' ' + user.last_name}
          />
          <div
            style={{
              color: 'black',
              fontSize: '25px',
              fontWeight: 600,
              marginTop: '10px',
            }}>
            {user && user.first_name + ' ' + user.last_name}
          </div>
        </div>
        <br />
        <hr />
        <br />
        <List>
          <ListItem>
            <div className='side-search-bar'>
              <div className='search-body'>
                <ListItemIcon>
                  <SearchIcon style={{color: 'red'}} />
                </ListItemIcon>
                <input
                  className='side-search-input'
                  type='text'
                  onChange={searchUser}
                />
              </div>
              {searchResults.length > 0 && resultVisibility && (
                <div className='user-search-results'>
                  <Card>
                    <List>
                      <ListItem style={{justifyContent: 'space-between'}}>
                        <h5>Search Results</h5>
                        <CloseIcon
                          onClick={() => setResultVisibility(false)}
                          style={{cursor: 'pointer'}}
                        />
                      </ListItem>
                      {searchResults.map((element, index) => {
                        return (
                          <ListItem
                            key={index}
                            style={{justifyContent: 'space-between'}}>
                            <div>
                              {element.first_name} {element.last_name}
                            </div>
                            <div>
                              <Button
                                variant='contained'
                                color='secondary'
                                onClick={() => sendFriendRequest(element.id)}>
                                Send Request
                              </Button>
                            </div>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Card>
                </div>
              )}
            </div>
          </ListItem>
          <Link to='/home'>
            <ListItem>
              <ListItemIcon>
                <Home style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>
          <Link to='/home/user-profile'>
            <ListItem>
              <ListItemIcon>
                <AccountCircle style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='My profile' />
            </ListItem>
          </Link>
          {/* <Link to='/home/user-groups'>
            <ListItem>
              <ListItemIcon>
                <People style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='Groups' />
            </ListItem>
          </Link>

          <Link to='/home/user-rewards'>
            <ListItem>
              <ListItemIcon>
                <CardGiftcard style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='Rewards' />
            </ListItem>
          </Link>
                    */}
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
              <div className='conversation-container'>
                <div className='conversation-lists'>
                  <div className='conversationHeader'>
                    <Link to={`/home/conversation/${conversation?.rows[0].id}`}>
                      {conversation?.rows[0].title}
                    </Link>
                  </div>
                  <ul className='conversation-child-list'>
                    {conversation?.titles.rows.map((element, index) => {
                      console.log('the element', element);
                      return (
                        <li className='conversation-child-element'>
                          <Link to={`/home/conversation/${element.id}`}>
                            {index + 1}. {element.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </List>
          </Collapse>
          <Link to='/home/user-achievements'>
            <ListItem>
              <ListItemIcon>
                <Bookmark style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='My Achievements' />
            </ListItem>
          </Link>

          <Link to='/home/user-connections'>
            <ListItem>
              <ListItemIcon>
                <Group style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='My CFG Family' />
            </ListItem>
          </Link>

          {/* <Link to='/home/user-events'>
            <ListItem>
              <ListItemIcon>
                <Event style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='Events' />
            </ListItem>
          </Link> */}
          <Link to='/home/cfg-tools'>
            <ListItem>
              <ListItemIcon>
                <Build style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='CFG Tools' />
            </ListItem>
          </Link>
          {/* <Link to='/home/host-a-conversation'>
            <ListItem>
              <ListItemIcon>
                <ChatBubble style={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText primary='Host A Conversation' />
            </ListItem>
          </Link> */}
          <ListItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout style={{color: 'red'}} />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
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
