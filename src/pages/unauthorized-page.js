import React, {lazy} from 'react';
import './unAuthorizedPage.css';
import {Link} from 'react-router-dom';
const AdminHeader = lazy(() => import('pages/admin-header'));
const Logo =
  'https://cfg-media.s3.us-east-2.amazonaws.com/static_images/Logo.png';

export default () => {
  return (
    <div>
      <AdminHeader />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <div style={{flex: 2, textAlign: 'center'}}>
          <img src={Logo} className='logo-image-screen' alt='logo' />
        </div>
        <div style={{flex: 1}}>You have not access to view this page.</div>
        <Link className='home-button' to='/home'>
          Go to Home
        </Link>
      </div>
    </div>
  );
};
