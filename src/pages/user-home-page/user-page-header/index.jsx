import React, {useState, useEffect} from 'react';
import AppHeader from '@crema/core/AppsContainer/AppsHeader';
import SearchBar from '@crema/core/SearchBar';
import './style.css';
import NotificationIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import Home from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import {Avatar, Typography} from '@material-ui/core';
import UserAvatar from 'assets/user-avatar.png';
import {Menu, MenuItem, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Logo from 'assets/Logo.png';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Logout from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import jsCookie from 'js-cookie';
import {
  Group,
  CardGiftcard,
  Bookmark,
  ShoppingBasket,
} from '@material-ui/icons';
import {useSelector, useDispatch} from 'react-redux';
import AppSideBar from '../AppSidebar';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import {setCurrentUser} from 'redux/actions/authActions';
export default function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('current-user'));
    dispatch(setCurrentUser(user));
  }, []);

  useEffect(() => {
    if (state.user) {
      setUsername(state.user.first_name + ' ' + state.user.last_name);
    }
  }, [state]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('auth-token');
    window.location.href = '/';
  };

  const handleLogout2 = () => {
    setAnchorE2(null);
    localStorage.removeItem('auth-token');
    jsCookie.remove('login');
    jsCookie.remove('access');
    window.location.href = '/';
  };

  const [anchorE2, setAnchorE2] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorE2(null);
  };
  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppSideBar drawerOpen={drawerOpen} toggleDrawerOpen={toggleDrawerOpen}>
        Hello{' '}
      </AppSideBar>
      <AppHeader>
        <div className='user-heder-container-header'>
          <div className='left'>
            <div className='left-user-info'>
              <Avatar alt='User Avatar' src={Logo} className='logo-style' />
              {/* <Link to='/admin'> */}

              {/* </Link> */}
            </div>
            <div className='search-bar'>
              <SearchBar />
            </div>
            <div className='menu-drop-down'>
              <Button
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}>
                <MenuIcon
                  style={{
                    fill: '#ffffff',
                    marginRight: '10px',
                    marginLeft: '10px',
                  }}
                />
              </Button>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <div className='mobile-menu-item'>
                    <Avatar alt='User Avatar' src={UserAvatar} />
                    <div className='user-name-text'>
                      <Typography>{username}</Typography>
                    </div>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <div className='mobile-menu-item'>
                    <div className='icon'>
                      <NotificationIcon style={{fill: 'black'}} />
                    </div>
                    <div className='user-name-text'>Notifications</div>
                  </div>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}>
                  <div className='mobile-menu-item'>
                    <div className='icon'>
                      <SettingsIcon style={{fill: 'black'}} />
                    </div>
                    <div className='user-name-text'>Settings</div>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to='/home/userProfile'>
                    <div className='mobile-menu-item'>
                      <div className='icon'>
                        <AccountCircle style={{fill: 'black'}} />
                      </div>
                      <div className='user-name-text'>
                        <Typography>My Profile</Typography>
                      </div>
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <div className='mobile-menu-item'>
                    <div className='icon'>
                      <Logout style={{fill: 'black'}} />
                    </div>
                    <div className='user-name-text'>Logout</div>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className='center-user-page'>
            <div className='user-page-icon-container'>
              <Link to='/home'>
                <Home style={{fontSize: 35}} />
              </Link>
            </div>
            <div className='user-page-icon-container'>
              <Link to='/home/user-groups'>
                <Group style={{fontSize: 35}} />
              </Link>
            </div>
            <div className='user-page-icon-container'>
              <Link to='/home/user-achievements'>
                <Bookmark style={{fontSize: 35}} />
              </Link>
            </div>
            <div className='user-page-icon-container'>
              <Link to='/home/user-rewards'>
                <CardGiftcard style={{fontSize: 35}} />
              </Link>
            </div>
          </div>
          <div className='right'>
            <div className='right-user-info'>
              <Avatar alt='User Avatar' src={UserAvatar} />
              <div className='user-name-text'>
                <Typography>{username}</Typography>
              </div>
            </div>
            <div className='right-icons'>
              <div className='icon'>
                <NotificationIcon style={{fill: '#ffffff'}} />
              </div>
              <div className='icon'>
                <Link to='/home/all-in-box'>
                  <ShoppingBasket style={{fill: '#ffffff'}} />
                </Link>
              </div>
              <div className='icon' onClick={handleClick2}>
                <SettingsIcon style={{fill: '#ffffff'}} />
              </div>

              <Menu
                anchorEl={anchorE2}
                keepMounted
                open={Boolean(anchorE2)}
                onClose={handleClose2}>
                <MenuItem onClick={handleClose2}>
                  <Link to='/home/user-profile'>
                    <div className='mobile-menu-item'>
                      <div className='icon'>
                        <AccountCircle style={{fill: 'black'}} />
                      </div>
                      <div className='user-name-text'>
                        <Typography>My Profile</Typography>
                      </div>
                    </div>
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleLogout2}>
                  <div className='mobile-menu-item'>
                    <div className='icon'>
                      <Logout style={{fill: 'black'}} />
                    </div>
                    <div className='user-name-text'>Logout</div>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div className='mobile-header'>
          <div className='mobile-header-content'>
            <MenuIcon
              onClick={toggleDrawerOpen}
              style={{color: 'white', fontSize: 40}}
            />{' '}
            <span className='mobile-company-header-tite'>JMMB Foundation</span>
          </div>
        </div>
      </AppHeader>
    </div>
  );
}
