import React, {useState, useEffect} from 'react';
import './style.css';
import AppCard from '@crema/core/AppCard';
import Header from '../auth-header';
import {Link} from 'react-router-dom';
import LogoImage from 'assets/Logo.png';

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
