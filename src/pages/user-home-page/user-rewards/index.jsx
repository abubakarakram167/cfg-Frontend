import React, {useState, lazy} from 'react';
import './style.css';
import {Dialog, Button} from '@material-ui/core';
import {Cancel, Redeem, ShoppingBasket} from '@material-ui/icons';
import {Link} from 'react-router-dom';

const CommonComponent = lazy(() => import('../common-component'));
const UserPageHeader = lazy(() => import('../user-page-header'));
const RewardCard = lazy(() => import('./reward-card'));

export default function Rewards() {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
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
    <CommonComponent left={''} right={''}>
      <Dialog fullWidth open={open}>
        <div className='dialog-box'>
          <div className='cancel-box'>
            <Cancel
              style={{color: 'red', cursor: 'pointer'}}
              onClick={toggleOpen}
            />
          </div>
          <div className='dialog-box-content'>
            <div>
              <img
                src='https://cdn.britannica.com/92/124492-050-047F11FB/image-Kepler-Nova-Keplers-Supernova-Chandra-X-ray.jpg'
                alt='dialog'
                width='150px'
                height='150px'
              />
              <br />
              <div className='image-text'>Trip to paris</div>
            </div>

            <div className='dialog-points'>10000P</div>
          </div>
          <br />
          <div className='dialog-buttons-container'>
            <Button variant='contained'>
              <Redeem style={{marginRight: '10px'}} /> Continue Redeeming
            </Button>
            <Link to='/home/all-in-box'>
              <Button
                variant='contained'
                color='secondary'
                style={{marginLeft: '10px'}}>
                <ShoppingBasket style={{marginRight: '10px'}} /> Go to Basket
              </Button>
            </Link>
          </div>
        </div>
      </Dialog>

      <div className='user-rewards-container'>
        {/* <div className="user-reward-cards"> */}
        {fakeData.map((element, index) => {
          return (
            <div className='user-reward-card' key={index}>
              <RewardCard toggleOpen={toggleOpen} element={element} />
            </div>
          );
        })}
        {/* </div> */}
      </div>
    </CommonComponent>
  );
}
