import React, {useEffect, useState} from 'react';
import './style.css';
import CommonComponent from '../common-component';
import Timeline from '../../../assets/history_toggle_off_black_24dp.svg';
import ToolIcon from '../../../assets/tools-solid.svg';
import Family from '../../../assets/users-solid.svg';
import Conversation from '../../../assets/comments-solid.svg';
import Host from '../../../assets/comment-dots-solid.svg';
import Journey from '../../../assets/road-solid.svg';
import {useHistory} from 'react-router-dom';
import {getToolsData} from 'redux/actions/toolActions';
import {useDispatch, useSelector} from 'react-redux';
import {getSignedUrl} from '../../../redux/actions/media';
import Tool from 'redux/services/tool';
import moment from 'moment';
import {getResourceData} from 'redux/actions/cfg';
import {Link} from 'react-router-dom';
import MediaGroup from 'redux/services/mediagroup';
import Session from 'redux/services/session';
import ConversationModal from 'components/MyConversationsModal';

const cardsData = [
  {
    color: '#0aaf5e',
    title: 'timeline',
    icon: Timeline,
    link: '/home',
  },
  {
    color: '#287ffd',
    title: 'cfg tools',
    icon: ToolIcon,
    link: '/home/cfg-tools',
  },
  {
    color: '#b00b0b',
    title: 'my cfg family',
    icon: Family,
    link: '/home/user-connections',
  },
  {
    color: '#ea1b2a',
    title: 'my conversation',
    icon: Conversation,
    link: '/home/host-a-conversation',
  },
  {
    color: '#9520fc',
    title: 'host a conversation',
    icon: Host,
    link: '/home/host-a-conversation',
  },
  {
    color: '#1da7c3',
    title: 'my journey',
    icon: Journey,
    link: '/home/journals/list',
  },
];

export default React.memo(function Homedashicon() {
  const state = useSelector((state) => state.cfg);
  const dispatch = useDispatch();
  const [dayTools, setDayTools] = useState([]);
  const [events, setEvents] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [showPrompt, setShowPrompt] = useState(null);

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

  const getRestoredImage = (featureImageUrl) => {
    return featureImageUrl.substring(featureImageUrl.lastIndexOf('/') + 1);
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
      console.log('the error', err);
    }
  };

  useEffect(() => {
    getUserGroup();
  }, []);

  useEffect(() => {
    dispatch(getToolsData());
    getDayTools();
  }, []);

  useEffect(() => {
    dispatch(getResourceData('event'));
  }, [dispatch]);

  useEffect(() => {
    setEvents(state.content);
  }, [state]);

  console.log('allSessions...', allSessions);

  const history = useHistory();
  const CardOut = () => {
    return (
      <div className='cardsOut'>
        <div className='cardMain'>
          <div className='list-container'>
            {dayTools.length > 0 &&
              dayTools.map((tool, index) => {
                return (
                  <Link to={`/home/cfg-tools/${tool.id}`} key={index}>
                    <div className='todoList'>
                      <img alt='img' src={tool.newUrl} />
                      <h5>{tool.title}</h5>
                    </div>
                  </Link>
                );
              })}
          </div>
          <h3>Tools of the day</h3>
        </div>
        <div className='cardMain'>
          <div
            onClick={() => history.push('/home/user-events')}
            className='list-container event-containers'>
            {events
              .filter((contentElement) => contentElement.status === 'published')
              .filter((elements) => moment(elements.start_date) >= moment())
              .map((element, index) => {
                return (
                  <div className='event-card' key={index}>
                    {element.title}
                    <h6 style={{fontSize: 13, fontWeight: '500'}}>
                      {moment(element.start_date).format('MMMM Do')}
                    </h6>
                  </div>
                );
              })}
          </div>

          {/* <div className='eventCard'>
            <h5>Wealth Bilding</h5>
            <h6>
              <div className='blockIcon' /> Live Now
            </h6>
          </div>
          <div className='eventCard'>
            <h5>Coffee with bev</h5>
            <h6>November 20 @ 10:30 AM</h6>
          </div>
          <div className='eventCard'>
            <h5>be greate there is no way</h5>
            <h6>November 20 @ 10:30 AM</h6>
          </div> */}
          <h3>Events</h3>
        </div>
      </div>
    );
  };

  return (
    <CommonComponent>
      <div className='iconContainerOut'>
        {cardsData.map((val, index) => {
          if (val.title === 'my conversation') {
            return (
              <div
                key={index}
                className='iconMain'
                onClick={() => setShowPrompt(true)}
                style={{background: val.color}}>
                <img src={val.icon} alt={val.title} />
                <h4>{val.title}</h4>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className='iconMain'
                onClick={() => history.push(val.link)}
                style={{background: val.color}}>
                <img src={val.icon} alt={val.title} />
                <h4>{val.title}</h4>
              </div>
            );
          }
        })}
      </div>
      <CardOut />
      <ConversationModal
        allSessions={allSessions}
        when={showPrompt}
        onConfirm={() => {
          setShowPrompt(null);
        }}
        onCancel={() => {
          setShowPrompt(null);
        }}
      />
    </CommonComponent>
  );
});
