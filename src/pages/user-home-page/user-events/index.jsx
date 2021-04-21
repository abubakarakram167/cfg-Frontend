import React from 'react';
import CommonComponent from '../common-component';
import Event from './event';
import UpcomingEvent from './upcoming-event';
import './style.css';
export default function UserEvents() {
  const eventFakeData = [
    {
      url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      title: 'me at the zoo',
      points: 10000,
      summary: 'The first Video ever uploaded to youtube',
      duration: 20,
      status: 'Now',
    },
    {
      url: 'https://www.youtube.com/watch?v=s4zZ9ffWlu4',
      title: 'Legends Never Die',
      points: 10000,
      summary: 'A small aot amv',
      duration: 20,
      status: 'Recorded',
    },
    {
      url: 'https://www.youtube.com/watch?v=ejWo1KHRYTI',
      title: 'Naruto Amv',
      points: 10000,
      summary: 'A small naruto amv',
      duration: 20,
      status: 'Recorded',
    },
  ];

  const fakeUpComingData = [
    {
      title: 'this is a test',
      type: 'zoom',
      summary: 'lets go lorem ipsum',
      duration: 30,
      link: 'something',
      image:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    },
    {
      title: 'this is a test',
      type: 'group-chat',
      summary: 'lets go lorem ipsum',
      duration: 30,
      image:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    },
    {
      title: 'this is a test',
      type: 'zoom',
      summary: 'lets go lorem ipsum',
      duration: 30,
      link: 'something',
      image:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    },
    {
      title: 'this is a test',
      type: 'group-chat',
      summary: 'lets go lorem ipsum',
      duration: 30,
      image:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    },
  ];
  return (
    <CommonComponent>
      <h1 style={{marginBottom: '4px'}}>Happening Now</h1>
      {eventFakeData
        .filter((element) => element.status === 'Now')
        .map((element, index) => {
          return <Event element={element} key={index} />;
        })}
      <br />

      <h1 style={{marginBottom: '4px'}}>Upcoming Events</h1>
      <div className='upcoming-events'>
        {fakeUpComingData.map((element, index) => {
          return (
            <div className='upcoming-event' key={index}>
              <UpcomingEvent element={element} />
            </div>
          );
        })}
      </div>

      <br />
      <h1 style={{marginBottom: '4px'}}>Previous Events</h1>
      {eventFakeData
        .filter((element) => element.status === 'Recorded')
        .map((element, index) => {
          return <Event element={element} key={index} />;
        })}
    </CommonComponent>
  );
}
