import React from 'react';
import './style.css';
import CommonComponent from '../common-component';
import Timeline from '../../../assets/history_toggle_off_black_24dp.svg';
import Tool from '../../../assets/tools-solid.svg';
import Family from '../../../assets/users-solid.svg';
import Conversation from '../../../assets/comments-solid.svg';
import Host from '../../../assets/comment-dots-solid.svg';
import Journey from '../../../assets/road-solid.svg';
import {useHistory} from 'react-router-dom';

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
    icon: Tool,
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
    link: '/home/user-events',
  },
];

export default function Homedashicon() {
  const history = useHistory();
  const CardOut = () => {
    return (
      <div className='cardsOut'>
        <div className='cardMain'>
          <div>
            <div className='todoList'>
              <img alt='img' src='https://dummyimage.com/600x400/000/fff' />
              <h5>Wealth Bilding</h5>
            </div>
            <div className='todoList'>
              <img alt='img' src='https://dummyimage.com/600x400/000/fff' />
              <h5>Be Great</h5>
            </div>
            <div className='todoList'>
              <img alt='img' src='https://dummyimage.com/600x400/000/fff' />
              <h5>Test Test</h5>
            </div>
          </div>
          <h3>Tools of the day</h3>
        </div>
        <div className='cardMain'>
          <div className='eventCard'>
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
          </div>
          <h3>Event</h3>
        </div>
      </div>
    );
  };

  return (
    <CommonComponent>
      <div className='iconContainerOut'>
        {cardsData.map((val, index) => {
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
        })}
      </div>
      <CardOut />
    </CommonComponent>
  );
}
