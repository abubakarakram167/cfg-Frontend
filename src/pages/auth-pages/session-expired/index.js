import React, {useState, useEffect, lazy} from 'react';
import './style.css';
import {Link} from 'react-router-dom';
const LogoImage =
  'https://cfg-media.s3.us-east-2.amazonaws.com/static_images/Logo.png';

const AppCard = lazy(() => import('@crema/core/AppCard'));
const Header = lazy(() => import('../auth-header'));

const SessionExpired = () => {
  const [view, setView] = useState(1);

  const view1 = (
    <div>
      <div>
        <h2>Oops...!</h2>
        <h3>Your session has been expired</h3>
      </div>
      <br />

      <br />
      <div className='bottom-links'>
        Go back to{' '}
        <span>
          <Link to='/'>Login</Link>
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <Header />

      <div className='container'>
        <div className='appCard'>
          <AppCard>
            <div className='image-logo'>
              <img
                // style={{
                //   height: 150,
                // }}
                width='40%'
                src={LogoImage}
                alt='logo'
              />
            </div>

            {view === 1 && view1}
          </AppCard>
        </div>
      </div>
    </div>
  );
};

export default SessionExpired;
