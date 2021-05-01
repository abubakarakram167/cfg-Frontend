import React from 'react';
import AppHeader from '@crema/core/AppsContainer/AppsHeader';
import './style.css';
import LogoImage from 'assets/cfgWhiteLogo.png';

export default function AdminHeader() {
  return (
    <div>
      <AppHeader style={{height: 180}}>
        {/* <div className='text'>JMMB Foundation</div> */}
        <img src={LogoImage} className='logo-image-white' alt='test' />
      </AppHeader>
    </div>
  );
}
