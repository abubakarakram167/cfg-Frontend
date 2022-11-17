import React, {useState, useEffect, useRef, lazy} from 'react';
import CreatePost from '../create-post-box';
import './style.css';
import './chat-modal.css';
import Session from 'redux/services/session';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Collapse,
} from '@material-ui/core';
import {
  Forum,
  Group,
  Build,
  ExpandMore,
  ExpandLess,
  ChatBubble,
  Event,
  People,
} from '@material-ui/icons';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer, toast } from 'react-toastify';
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
import {getResourceData} from 'redux/actions/cfg';
import moment from 'moment';
import CFGFamily from './cfg-family.jsx';
import './style.css';
import {showMessengerApp} from 'redux/actions/app';
import {getSpecificPreference} from 'redux/actions/Preference';
import { onMessageListener } from '../../../firebaseInit';


const CommonComponent = lazy(() => import('../common-component'));
const PostDetails = lazy(() => import('../post-details'));

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


  onMessageListener()
    .then((payload) => {
      const { title, body } = payload.data;
      toast.info(`${title}; ${body}`, {
          position: toast.POSITION.TOP_RIGHT
      });
    })
    .catch((err) => {
      toast.error(JSON.stringify(err), {
          position: toast.POSITION.TOP_RIGHT
      });
    });


  const state = useSelector((state) => state.cfg);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.userPost.posts);
  const postDivInnerRef = useRef();

  const allJournals = useSelector((state) => {
    return state.journal.userJournals;
  });

  //page posts count and page handlers
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(5);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [conversationExtended, setConversationExtended] = useState(false);

  const [allSessions, setAllSessions] = useState([]);
  const classesOther = useStyling();
  const permissions = useSelector((state) => state.roles.permissions);
  const history = useHistory();
  const [allTransformPosts, setAllTransformPosts] = useState(null);
  const [enableLiveChat, setEnableLiveChat] = useState(false);

  const toggleExpansion = () => {
    setConversationExtended(!conversationExtended);
  };

  const [dayTools, setDayTools] = useState([]);
  const [events, setEvents] = useState([]);

  const app = useSelector((state) => {
    return state.app;
  });

  // console.log('is state app', app);

  const getRestoredImage = (featureImageUrl) => {
    return featureImageUrl.substring(featureImageUrl.lastIndexOf('/') + 1);
  };

  const getUserJourneys = () => {
    const user = JSON.parse(localStorage.getItem('current-user'));
    dispatch(getUserJourney(user.id));
  };

  //handling live chat preference coming from backend
  const getLiveChatPreference = () => {
    dispatch(getSpecificPreference('enable_live_chat')).then((preference) => {
      let data =
        preference && preference.data ? preference.data.option_value : 'no';
      data = data === 'no' ? false : true;
      setEnableLiveChat(data);
    });
  };

  //function to fetch day tools from backend
  const getDayTools = async () => {
    try {
      let images = [];
      const data = await Tool.getDayTools();
      const tools = data.data;
      tools.map((tool) => {
        if (tool && tool.featured_image_url && tool.featured_image_url !== '') {
          tool.fileName = getRestoredImage(tool.featured_image_url);
          images.push(getSignedUrl(tool));
        }
      });
      const getAllTransformTools = await Promise.all(images);
      setDayTools(data.data);
    } catch (err) {
      console.log('the err', err);
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
    try {
      const data = await MediaGroup.getUserGroup();

      getSessionByGroupId(data.data.group_id);
    } catch (err) {
      console.log('the err', err);
    }
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

  //post scrolling handler
  const onScroll = (e) => {
    // console.log(e.target.scrollHeight);
    if (e.target) {
      const {scrollTop, scrollHeight, clientHeight} = e.target;
      //check when user has reached bottom
      if (scrollTop + clientHeight === scrollHeight) {
        console.log('reached bottom');
        setPage((prevValue) => {
          return prevValue + 1;
        });
      }
    }
  };

  const getAllUserPost = (count, isNew, page) => {
    dispatch(getUserPost(count, isNew, page));
  };

  //initial useEffect hook to check fro live chat and user journeys
  useEffect(() => {
    getUserJourneys();
    getLiveChatPreference();

    dispatch(getToolsData());
    getDayTools();

    // const user = JSON.parse(localStorage.getItem('current-user'));
    // // getSessionById(user.cfg_session_id)
    getUserGroup();
  }, []);

  useEffect(() => {
    getAllUserPost(count, true, page);
  }, [count]);

  useEffect(() => {
    if (page != 0) {
      getAllUserPost(count, false, page);
    }
  }, [page]);

  useEffect(() => {
    dispatch(getResourceData('event'));
  }, [dispatch]);

  useEffect(() => {
    setEvents(state.content);
  }, [state]);

  useEffect(() => {
    transformPosts(posts);
  }, [posts]);

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

  const getColorStatus = (status) => {
    let style = {color: 'green', fontSize: 16, margin: 1};
    if (status === 'Complete') style.color = 'green';
    else if (status === 'In Progress') style.color = '#787474';
    else if (status === 'Not Started') style.color = 'grey';
    else style.color = 'red';

    return style;
  };

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
        allSessions.map((session, index) => {
          return (
            <Collapse
              key={index}
              in={conversationExtended}
              timeout='auto'
              unmountOnExit>
              <List key={index}>
                <div className='conversation-container'>
                  <div className='conversation-lists'>
                    <div className='conversationHeader'>
                      {/* <Link to={`/home/conversation/${session?.rows[0].id}`}> */}
                      {session?.rows[0].title}
                      {/* </Link> */}
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
                                {element.subtitles.rows.map((sub, index) => {
                                  if (sub.status === 'published') {
                                    return (
                                      <li
                                        className='subtitle-element'
                                        key={index}>
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
    <div>
      <List>
        <ListItem>
          <ListItemIcon>
            <Build />
          </ListItemIcon>
          {/* <ListItemText primary='CFG Tools of the Day' /> */}
          <span>CFG Tools of the Day</span>
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
                      maxWidth: 120,
                    }}
                    src={tool.newUrl ? tool.newUrl : ''}
                    alt=''
                  />
                </Link>
              )}
              {!tool.featured_image_url && (
                <div
                  style={{
                    width: 80,
                    height: 50,
                    marginRight: 10,
                    borderRadius: 10,
                    paddingLeft: 40,
                    paddingTop: 15,
                  }}>
                  <ListItemIcon>
                    <Build />
                  </ListItemIcon>
                </div>
              )}
              <Link to={`/home/cfg-tools/${tool.id}`}>
                <div
                  style={{
                    textAlign: left,
                    fontSize: 14,
                    color: '#9d9d9d',
                    fontWeight: '600',
                    paddingLeft: 5,
                  }}>
                  {tool.title}
                </div>
              </Link>
            </ListItem>
          );
        })}
        <hr />
      </List>
      <List>
        <ListItem>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <span style={{flex: 1}}>
              <ListItemIcon>
                <Event style={{color: 'red', minWidth: 30}} />
              </ListItemIcon>
            </span>
            <span style={{flex: 1}}>Events</span>
          </div>
        </ListItem>
        {events
          .filter((contentElement) => contentElement.status === 'published')
          .filter((elements) => moment(elements.start_date) >= moment())
          .map((element, index) => {
            return (
              <div className='upcoming-event-text' key={index}>
                {element.title}
                <div style={{fontSize: 13, fontWeight: '500'}}>
                  {moment(element.start_date).format('YYYY MMMM Do')}
                </div>
              </div>
            );
          })}
      </List>
      {enableLiveChat && (
        <div>
          <CFGFamily />
          <hr />
        </div>
      )}
    </div>
  );
  return (
    <div>

    <CommonComponent
      left={left}
      right={right}
      scroll={true}
      ref={postDivInnerRef}
      scrollAction={onScroll}>
      {allJournals.length > 0 && (
        <div style={{position: 'relative'}}>
          <Link to={`/home/journals/list`}>
            <img
              style={{
                height: 300,
                width: '100%',
                borderRadius: 10,
                marginBottom: 20,
              }}
              src={require('../../../assets/new_journey_image.png')}
            />
            <div className='journal-text'>
              <p className='journey-heading'>My Journey</p>
              <div className='journal-list-container'>
                {allJournals.length &&
                  allJournals
                    .slice(Math.max(allJournals.length - 5, 0))
                    .map((journal, index) => {
                      return (
                        <div className='journal-list-element' key={index}>
                          <p className='journal-subject'>{journal.subject}</p>
                          <p style={getColorStatus(journal.status)}>
                            {journal.status}
                          </p>
                        </div>
                      );
                    })}
              </div>
            </div>
          </Link>
        </div>
      )}

      <CreatePost
        getUserPost={() => {
          dispatch(getUserPost(3, true));
        }}
      />

      {app.showMessenger && enableLiveChat && (
        <div className='chat-container'>
          <CFGFamily />
        </div>
      )}

      {transform.map((element, index) => {
        return (
          <div key={element.id} style={{margin: '20px 0px'}}>
            <PostDetails
              getUserPost={() => {
                getAllUserPost();
              }}
              post={element}
            />
          </div>
        );
      })}
      <Skeleton count={5} />
    </CommonComponent>
    <ToastContainer />
    </div>
    
  );
}
