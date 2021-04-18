import React, {useState} from 'react';
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

export default function UserHomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [conversationExtended, setConversationExtended] = useState(false);
  const toggleExpansion = () => {
    setConversationExtended(!conversationExtended);
  };
  const [fakeData, setFakeData] = useState([
    {
      id: 1,
      caption: 'hello sir jermaine',
      media:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      comments: [
        {
          id: 1,
          commentText: 'this is a comment',
          commentReplies: ['hello', 'world'],
        },
      ],
    },
    {
      id: 2,
      caption: 'hello sir jermaine',
      media:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      comments: [
        {
          id: 1,
          commentText: 'this is a comment',
          commentReplies: ['hello', 'world'],
        },
        {
          id: 2,
          commentText: 'this is another',
          commentReplies: ['hello', 'world'],
        },
      ],
    },
    {
      id: 3,
      caption: 'hello sir jermaine',
      media: '',
      comments: [
        {
          id: 1,
          commentText: 'this is a comment',
          commentReplies: ['hello', 'world'],
        },
      ],
    },
    {
      id: 4,
      caption: 'This is a post without a comment',
      media:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      comments: [],
    },
  ]);

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
  );

  const right = (
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
  );
  return (
    <CommonComponent left={left} right={right}>
      <CreatePost />
      {fakeData.map((element, index) => {
        const addComment = (comment, postId) => {
          setFakeData(
            fakeData.map((data) => {
              if (postId === data.id) {
                data.comments.push(
                  createComment(data.comments.length + 1, comment),
                );
              }
              return data;
            }),
          );
        };

        const addReplyAction = (postId, commentId, replyText) => {
          setFakeData(
            fakeData.map((data) => {
              if (postId === data.id) {
                data.comments.map((comment) => {
                  if (comment.id === commentId) {
                    comment.commentReplies.push(replyText);
                  }
                  return comment;
                });
              }
              console.log(data);
              return data;
            }),
          );
        };

        return (
          <PostDetails
            key={index}
            post={element}
            addCommentData={addComment}
            addReplyAction={addReplyAction}
          />
        );
      })}
    </CommonComponent>
  );
}
