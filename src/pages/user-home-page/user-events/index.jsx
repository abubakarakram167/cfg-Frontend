import React, {useState, useEffect, lazy} from 'react';
import './style.css';
import {useDispatch, useSelector} from 'react-redux';
import {getResourceData} from 'redux/actions/cfg';
import jsCookie from 'js-cookie';
import moment from 'moment';

const CommonComponent = lazy(() => import('../common-component'));
const UpcomingEvent = lazy(() => import('./upcoming-event'));
const Event = lazy(() => import('./event'));
const EventModal = lazy(() => import('components/EventModal'));

export default function UserEvents() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cfg);
  const [content, setContent] = useState([]);
  const [author, setAuthor] = useState('');
  const [showPrompt, setShowPrompt] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setContent(state.content);
  }, [state]);

  useEffect(() => {
    dispatch(getResourceData('event'));
    setAuthor(JSON.parse(jsCookie.get('user')).user_name);
  }, [dispatch]);

  const hardCodedUrl = [
    {
      past: false,
      url: 'https://www.youtube.com/embed/Xru8N1vmrAI',
      title: 'Wealth Building',
      type: 'live-video',
      summary:
        'A breif introduction how to creat wealth using a few simple steps',
      duration: 30,
      points: 1000,
    },
    {
      past: true,
      url: 'https://www.youtube.com/embed/Xru8N1vmrAI',
      title: 'Wealth Building',
      type: 'recording',
      summary:
        'A breif introduction how to creat wealth using a few simple steps',
      duration: 0,
    },
  ];

  return (
    <CommonComponent>
      <h1 style={{marginBottom: '4px'}}>Happening Now</h1>

      {hardCodedUrl
        .filter((element) => !element.past)
        .map((element, index) => {
          return <Event element={element} key={index} />;
        })}

      <h1 style={{marginTop: 20}}>Upcoming Events</h1>
      <div className='upcoming-events'>
        {content
          .filter((contentElement) => contentElement.status === 'published')
          .filter((elements) => moment(elements.start_date) >= moment())
          .map((element, index) => {
            return (
              <div className='upcoming-event' key={index}>
                <UpcomingEvent
                  element={element}
                  setSelectedEvent={setSelectedEvent}
                  setShowPrompt={setShowPrompt}
                />
              </div>
            );
          })}
      </div>
      <EventModal
        event={selectedEvent}
        when={showPrompt}
        onConfirm={() => {
          setShowPrompt(null);
        }}
        onCancel={() => {
          setShowPrompt(null);
        }}
      />
      <br />
      {/* <h1 style={{marginBottom: '4px'}}>Previous Events</h1> */}
      {/* <div style = {{ width: '80%', margin: 'auto', marginBottom: 50 }} >
        <iframe  
          src="https://www.youtube.com/embed/Xru8N1vmrAI" 
          title="YouTube video player" 
          frameborder="0"
          height= '400'
          width = '100%' 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          style = {{ textAlign: 'center' }}
        >
        </iframe>
      </div> */}
      {/* {hardCodedUrl
        .filter((element) => element.past)
        .map((element, index) => {
          return <Event element={element} key={index} />;
        })} */}
    </CommonComponent>
  );
}
