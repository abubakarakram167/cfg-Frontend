import React, {useState, useEffect} from 'react';
// import AppSideBar from '../../AppSidebar';
import CreatePost from '../create-post-box';
import './style.css';
import PostDetails from '../post-details';
import CommonComponent from '../common-component';
import CfgToolOfTheDay from '../user-home/cfg-tools';
import OnlineFriend from './online-friend';
import Session from 'redux/services/session';

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
import MediaGroup from 'redux/services/mediagroup';

export default function UserHomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.userPost.posts);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [conversationExtended, setConversationExtended] = useState(false);
  const [count, setCount] = useState(3);
  const [conversation, setConversation] = useState(null);

  const toggleExpansion = () => {
    setConversationExtended(!conversationExtended);
  };
  const [dayTools, setDayTools] = useState([]);
  const getDayTools = async () => {
    const data = await Tool.getDayTools();
    setDayTools(data.data);
  };

  const getSessionById = async (id) => {
    const data = await Session.getSessionById(id);
    setConversation(data.data.data);
  };

  const getSessionByGroupId = async (id) => {
    const data = await MediaGroup.getSessionsByGroupId(id);
    getSessionById(data.data[0].id);
  };
  const getUserGroup = async () => {
    const data = await MediaGroup.getUserGroup();

    getSessionByGroupId(data.data.group_id);
  };

  useEffect(() => {
    dispatch(getUserPost(count));
  }, [count]);

  useEffect(() => {
    dispatch(getToolsData());
    getDayTools();
    const user = JSON.parse(localStorage.getItem('current-user'));
    // getSessionById(user.cfg_session_id)
    getUserGroup();
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
      {/* <Link to='/home/user-groups'>
        <ListItem>
          <ListItemIcon>
            <People style={{ color: 'green' }} />
          </ListItemIcon>
          <ListItemText primary='Groups' />
        </ListItem>
      </Link>
      <Link to='/home/user-events'>
        <ListItem>
          <ListItemIcon>
            <Event style={{ color: 'blue' }} />
          </ListItemIcon>
          <ListItemText primary='Events' />
        </ListItem>
      </Link> */}
      <Link to='/home/cfg-tools'>
        <ListItem>
          <ListItemIcon>
            <Build />
          </ListItemIcon>
          <ListItemText primary='CFG Tools' />
        </ListItem>
      </Link>
      {/* <Link to='/home/host-a-conversation'>
        <ListItem>
          <ListItemIcon>
            <ChatBubble style={{ color: 'red' }} />
          </ListItemIcon>
          <ListItemText primary='Host A Conversation' />
        </ListItem>
      </Link> */}
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
            {tool.featured_image_url && (
              <img
                src={tool.featured_image_url}
                width='50px'
                height='50px'
                alt=''
              />
            )}
            {!tool.featured_image_url && (
              <ListItemIcon>
                <Build />
              </ListItemIcon>
            )}
            <ListItemText primary={tool.title} />
          </ListItem>
        );
      })}
      <hr />
      {/* <ListItem>
        <ListItemIcon>
          <Event style={{ color: 'blue' }} />
        </ListItemIcon>
        <ListItemText primary='Events' />
      </ListItem> */}
      {/* <ListItem>
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
      </ListItem> */}
    </List>
  );
  return (
    <CommonComponent
      left={left}
      right={right}
      scroll={true}
      scrollAction={() => {
        setCount(count + 3);
      }}>
      <CreatePost />

      {posts.map((element, index) => {
        return (
          <div key={element.id} style={{margin: '20px 0px'}}>
            <PostDetails post={element} />
          </div>
        );
      })}
    </CommonComponent>
  );
}
