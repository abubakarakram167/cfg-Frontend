import React, {useState, useEffect, lazy} from 'react';
import './style.css';

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
        <h3>Something Went wrong and We were unable to handle it.</h3>
      </div>
      <br />

      <br />
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
