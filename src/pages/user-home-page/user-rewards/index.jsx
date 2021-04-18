import React from 'react';
import RewardCard from './reward-card';
import './style.css';
import UserPageHeader from '../user-page-header';
import CommonComponent from '../common-component';
export default function index() {
  const fakeData = [
    {
      image:
        'https://cdn.britannica.com/92/124492-050-047F11FB/image-Kepler-Nova-Keplers-Supernova-Chandra-X-ray.jpg',
      description:
        'Supernovas are probably the most magnificient things in the universe',
      points: 20000,
    },
    {
      image:
        'https://cdn.britannica.com/92/124492-050-047F11FB/image-Kepler-Nova-Keplers-Supernova-Chandra-X-ray.jpg',
      description:
        'Supernovas are probably the most magnificient things in the universe',
      points: 20000,
    },
    {
      image:
        'https://cdn.britannica.com/92/124492-050-047F11FB/image-Kepler-Nova-Keplers-Supernova-Chandra-X-ray.jpg',
      description:
        'Supernovas are probably the most magnificient things in the universe',
      points: 20000,
    },
    {
      image:
        'https://cdn.britannica.com/92/124492-050-047F11FB/image-Kepler-Nova-Keplers-Supernova-Chandra-X-ray.jpg',
      description:
        'Supernovas are probably the most magnificient things in the universe',
      points: 20000,
    },
    {
      image:
        'https://cdn.britannica.com/92/124492-050-047F11FB/image-Kepler-Nova-Keplers-Supernova-Chandra-X-ray.jpg',
      description:
        'Supernovas are probably the most magnificient things in the universe',
      points: 20000,
    },
  ];

  return (
    // <div>
    //     <UserPageHeader />

    //     <div className="user-rewards-container">

    //         <div className="user-reward-cards">

    //         </div>
    //     </div>
    <CommonComponent left={''} right={''}>
      <div className='user-rewards-container'>
        {/* <div className="user-reward-cards"> */}
        {fakeData.map((element, index) => {
          return (
            <div className='user-reward-card' key={index}>
              <RewardCard element={element} />
            </div>
          );
        })}
        {/* </div> */}
      </div>
    </CommonComponent>
  );
}
