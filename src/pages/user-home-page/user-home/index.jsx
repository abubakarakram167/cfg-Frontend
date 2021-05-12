import React, {useState, useEffect} from 'react';
// import AppSideBar from '../../AppSidebar';
import CreatePost from '../create-post-box';
import './style.css';
import PostDetails from '../post-details';
import CommonComponent from '../common-component';
import CfgToolOfTheDay from '../user-home/cfg-tools';
import OnlineFriend from './online-friend';
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
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getUserPost} from 'redux/actions/UserPost';
import {getToolsData} from 'redux/actions/toolActions';
import {baseUrl} from 'utils/axios';
import Tool from 'redux/services/tool';

export default function UserHomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.userPost.posts);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [conversationExtended, setConversationExtended] = useState(false);
  const toggleExpansion = () => {
    setConversationExtended(!conversationExtended);
  };
  const [dayTools, setDayTools] = useState([]);
  const getDayTools = async () => {
    const data = await Tool.getDayTools();
    setDayTools(data.data);
  };

  useEffect(() => {
    dispatch(getUserPost());
    dispatch(getToolsData());
    getDayTools();
  }, []);

  const createComment = (id, commentText) => {
    return {
      id,
      commentText,
      commentReplies: [],
    };
  };

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const left = (
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
            excepturi, ipsa expedita mollitia magnam facere. Qui suscipit rerum
            cum consequatur, quis aliquam adipisci alias omnis totam? Ratione
            nihil labore dicta.
          </ListItemText>
        </List>
      </Collapse>
      <Link to='/home/user-connections'>
        <ListItem>
          <ListItemIcon>
            <Group style={{color: 'brown'}} />
          </ListItemIcon>
          <ListItemText primary='My CFG Family' />
        </ListItem>
      </Link>
      <Link to='/home/user-groups'>
        <ListItem>
          <ListItemIcon>
            <People style={{color: 'green'}} />
          </ListItemIcon>
          <ListItemText primary='Groups' />
        </ListItem>
      </Link>
      <Link to='/home/user-events'>
        <ListItem>
          <ListItemIcon>
            <Event style={{color: 'blue'}} />
          </ListItemIcon>
          <ListItemText primary='Events' />
        </ListItem>
      </Link>
      <Link to='/home/cfg-tools'>
        <ListItem>
          <ListItemIcon>
            <Build />
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
  );

  const right = (
    <List>
      <ListItem>
        <ListItemIcon>
          <Build />
        </ListItemIcon>
        <ListItemText primary='CFG Tools of the Day' />
      </ListItem>
      {dayTools.map((tool, index) => {
        return (
          <ListItem key={index}>
            <ListItemIcon>
              <Build />
            </ListItemIcon>
            <ListItemText primary={tool.title} />
          </ListItem>
        );
      })}
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
  );
  return (
    <CommonComponent left={left} right={right}>
      <CreatePost />
      {posts
        .slice(0)
        .reverse()
        .map((element, index) => {
          return (
            <div key={index} style={{margin: '20px 0px'}}>
              <PostDetails post={element} />
            </div>
          );
        })}
    </CommonComponent>
  );
}
