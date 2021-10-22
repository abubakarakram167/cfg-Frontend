import React, {useState, useEffect, useRef} from 'react';
import CreatePost from '../create-post-box';
import './style.css';
import PostDetails from '../post-details';
import CommonComponent from '../common-component';
import Session from 'redux/services/session';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Collapse,
} from '@material-ui/core';
import {Forum, Group, Build, ExpandMore, ExpandLess} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getUserPost} from 'redux/actions/UserPost';
import {getToolsData} from 'redux/actions/toolActions';
import Tool from 'redux/services/tool';
import MediaGroup from 'redux/services/mediagroup';
import {transformImagesInContent} from 'components/ReUsable';
import $ from 'jquery';
import {getSignedUrl} from '../../../redux/actions/media';
import {getUserJourney} from '../../../redux/actions/journal';

const useStyling = makeStyles({
  childListPadding: {
    '& .MuiCollapse-entered': {
      paddingTop: 25,
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
  },
});

export default function UserHomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.userPost.posts);
  const allJournals = useSelector((state) => {
    return state.journal.userJournals;
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [conversationExtended, setConversationExtended] = useState(false);
  const [count, setCount] = useState(3);
  const [allSessions, setAllSessions] = useState([]);
  const classesOther = useStyling();
  const permissions = useSelector((state) => state.roles.permissions);
  const history = useHistory();
  const [allTransformPosts, setAllTransformPosts] = useState(null);
  const toggleExpansion = () => {
    setConversationExtended(!conversationExtended);
  };
  const [dayTools, setDayTools] = useState([]);
  const getRestoredImage = (featureImageUrl) => {
    return featureImageUrl.substring(featureImageUrl.lastIndexOf('/') + 1);
  };

  const getUserJourneys = () => {
    const user = JSON.parse(localStorage.getItem('current-user'));
    dispatch(getUserJourney(user.id));
  };

  console.log('all journals', allJournals);

  useEffect(() => {
    getUserJourneys();
  }, []);

  const getDayTools = async () => {
    try {
      let images = [];
      const data = await Tool.getDayTools();
      const tools = data.data;
      tools.map((tool) => {
        if (tool && tool.featured_image_url !== '') {
          tool.fileName = getRestoredImage(tool.featured_image_url);
          images.push(getSignedUrl(tool));
        }
      });
      const getAllTransformTools = await Promise.all(images);
      setDayTools(data.data);
    } catch (err) {
      setDayTools([]);
    }
  };

  const getSessionById = (id) => {
    return Session.getSessionById(id);
  };

  const getSessionByGroupId = async (id) => {
    const data = await MediaGroup.getSessionsByGroupId(id);
    let allSessionData = [];
    if (data && data.data.length) {
      for (let getSession of data.data)
        allSessionData.push(getSessionById(getSession.id));
      const getAllSessionsData = await Promise.all(allSessionData);
      setAllSessions(getAllSessionsData.map((session) => session.data.data));
    }
  };

  const getUserGroup = async () => {
    const data = await MediaGroup.getUserGroup();

    getSessionByGroupId(data.data.group_id);
  };

  const transformPosts = async (posts) => {
    let allContent = [];
    for (let post of posts) {
      allContent.push(transformImagesInContent(post.content, false, post.id));
    }

    const allTransformPosts = await Promise.all(allContent);
    const newContentPosts = posts.map((post) => {
      return {
        ...post,
        content: allTransformPosts.filter(
          (newPost) => newPost.id === post.id,
        )[0].html,
      };
    });

    setAllTransformPosts(newContentPosts);
  };

  useEffect(() => {
    dispatch(getUserPost(count));
  }, [count]);

  useEffect(() => {
    transformPosts(posts);
  }, [posts]);

  useEffect(() => {
    dispatch(getToolsData());
    getDayTools();
    const user = JSON.parse(localStorage.getItem('current-user'));
    // getSessionById(user.cfg_session_id)
    getUserGroup();
  }, []);

  useEffect(() => {
    if (!permissions.home.view) {
      history.push({
        pathname: '/unAuthorizedPage',
      });
    }
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

  const transform = allTransformPosts
    ? allTransformPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      )
    : [];

  console.log('the transform', transform);

  const left = (
    <List className={classesOther.childListPadding}>
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
      {allSessions.length !== 0 &&
        allSessions.map((session) => {
          return (
            <Collapse in={conversationExtended} timeout='auto' unmountOnExit>
              <List>
                <div className='conversation-container'>
                  <div className='conversation-lists'>
                    <div className='conversationHeader'>
                      <Link to={`/home/conversation/${session?.rows[0].id}`}>
                        {session?.rows[0].title}
                      </Link>
                    </div>
                    <ul className='conversation-child-list'>
                      {session?.titles.rows.map((element, index) => {
                        if (element.status === 'published') {
                          return (
                            <div className='whole-child-component' key={index}>
                              <li className='conversation-child-element'>
                                <Link to={`/home/conversation/${element.id}`}>
                                  <strong>{element.title}</strong>
                                </Link>
                              </li>
                              <ul className='subtitle'>
                                {element.subtitles.rows.map((sub) => {
                                  if (sub.status === 'published') {
                                    return (
                                      <li className='subtitle-element'>
                                        <Link
                                          to={`/home/conversation/${sub.id}`}>
                                          <strong>{sub.title}</strong>
                                        </Link>
                                      </li>
                                    );
                                  }
                                })}
                              </ul>
                            </div>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </List>
            </Collapse>
          );
        })}
      <Link to='/home/user-connections'>
        <ListItem>
          <ListItemIcon>
            <Group style={{color: 'brown'}} />
          </ListItemIcon>
          <ListItemText primary='My CFG Family' />
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
              <Link to={`/home/cfg-tools/${tool.id}`}>
                <img
                  style={{
                    width: 120,
                    height: 100,
                    marginRight: 10,
                    borderRadius: 10,
                  }}
                  src={tool.newUrl ? tool.newUrl : ''}
                  alt=''
                />
              </Link>
            )}
            {!tool.featured_image_url && (
              <ListItemIcon>
                <Build />
              </ListItemIcon>
            )}
            <Link to={`/home/cfg-tools/${tool.id}`}>
              <div
                style={{
                  textAlign: left,
                  fontSize: 14,
                  color: '#9d9d9d',
                }}>
                {tool.title}
              </div>
            </Link>
          </ListItem>
        );
      })}
      <hr />
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
      {allJournals.length > 0 && (
        <Link to={`/home/journals/list`}>
          <img src={require('../../../assets/journey.png')} />
        </Link>
      )}
      <CreatePost />
      {transform.map((element, index) => {
        return (
          <div key={element.id} style={{margin: '20px 0px'}}>
            <PostDetails post={element} />
          </div>
        );
      })}
    </CommonComponent>
  );
}
