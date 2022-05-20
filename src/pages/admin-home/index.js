import React, {useEffect, lazy} from 'react';
import './style.css';
import {Container} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {
  TrendingUp,
  Settings,
  Forum,
  ViewDay,
  Redeem,
  Build,
  Event,
  ContactSupport,
  SettingsApplications,
  PermMedia,
  Message,
} from '@material-ui/icons';
import UserModerationIcon from 'assets/updatedCrown.png';

import {Link} from 'react-router-dom';

const AdminHeader = lazy(() => import('pages/admin-header'));
const AppCard = lazy(() => import('@crema/core/AppCard'));

export default function Index() {
  const permissions = useSelector((state) => state.roles.permissions);
  const history = useHistory();

  useEffect(() => {
    if (!permissions.admin.view) {
      history.push({
        pathname: '/unAuthorizedPage',
      });
    }
  }, []);

  return (
    <div>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>

      <br />

      <Container>
        <div className='cards-container'>
          <Link to='/admin/dashboard' className='card-container'>
            <AppCard backgroundColor={'#C3AC89'}>
              <TrendingUp style={{fill: '#ffffff', fontSize: 70}} />
              <div className='card-text'>Dashboard</div>
            </AppCard>
          </Link>
          <Link
            to='/admin/user-management'
            className='card-container'
            onClick={() => {
              console.log('hello');
            }}>
            <AppCard backgroundColor={'#01097A'}>
              <Settings style={{fill: '#ffffff', fontSize: 70}} />

              <div className='card-text'>User Management</div>
            </AppCard>
          </Link>
          <Link to='/admin/cfg-session' className='card-container'>
            <AppCard backgroundColor={'#EB1B29'}>
              <Forum style={{fill: '#ffffff', fontSize: 70}} />
              <div className='card-text'>CFG Session</div>
            </AppCard>
          </Link>
          <Link to='/admin/timeline' className='card-container'>
            <AppCard backgroundColor={'#AF0C0C'}>
              <ViewDay style={{fill: '#ffffff', fontSize: 70}} />
              <div className='card-text'>Timeline</div>
            </AppCard>
          </Link>
          <Link to='/admin/cfg-tools' className='card-container'>
            <AppCard backgroundColor={'#057A01'}>
              <Build style={{fill: '#ffffff', fontSize: 70}} />
              <div className='card-text'>CFG Tools</div>
            </AppCard>
          </Link>
          <Link to='/admin/events' className='card-container'>
            <AppCard backgroundColor={'#E87D03'}>
              <Event style={{fill: '#ffffff', fontSize: 70}} />
              <div className='card-text'>Events</div>
            </AppCard>
          </Link>
          <Link to='/listing/quiz' className='card-container'>
            <AppCard backgroundColor={'#4EC4F0'}>
              <ContactSupport style={{fill: '#ffffff', fontSize: 70}} />
              <div className='card-text'>Quiz</div>
            </AppCard>
          </Link>
          <Link to='/admin/preferences' className='card-container'>
            <AppCard backgroundColor={'#01097A'}>
              <SettingsApplications style={{fill: '#ffffff', fontSize: 70}} />
              <div className='card-text'>Preferences</div>
            </AppCard>
          </Link>
          <Link to='/admin/media-library' className='card-container'>
            <AppCard backgroundColor={'#EB1B29'}>
              <PermMedia style={{fill: '#ffffff', fontSize: 70}} />

              <div className='card-text'>Media Library</div>
            </AppCard>
          </Link>
          <Link to='/admin/mini-cfg' className='card-container'>
            <AppCard backgroundColor={'#683772'}>
              <Message style={{fill: '#ffffff', fontSize: 70}} />
              <div className='card-text'>Mini CFG</div>
            </AppCard>
          </Link>
          <Link to='admin/timeline-posts' className='card-container'>
            <AppCard backgroundColor={'#01097A'}>
              {/* <Redeem style={{fill: '#ffffff', fontSize: 70}} /> */}
              <img style={{height: 70}} src={UserModerationIcon} />
              <div className='card-text'>User Moderation</div>
            </AppCard>
          </Link>
        </div>
      </Container>
    </div>
  );
}
