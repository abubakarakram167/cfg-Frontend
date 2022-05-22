import React, {lazy} from 'react';
import './style.css';
const LogoImage =
  'https://cfg-media.s3.us-east-2.amazonaws.com/static_images/cfgWhiteLogo.png';

const AppHeader = lazy(() => import('@crema/core/AppsContainer/AppsHeader'));

export default function AdminHeader() {
  return (
    <div className='logo-image-white-div'>
      <AppHeader style={{height: 180}}>
        {/* <div className='text'>JMMB Foundation</div> */}
        <img src={LogoImage} className='logo-image-white' alt='test' />
      </AppHeader>
    </div>
  );
}
