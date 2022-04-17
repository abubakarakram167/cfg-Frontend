import React, {useState, useEffect, lazy} from 'react';

import './style.css';
import {useDispatch} from 'react-redux';
import CookieConsent from 'react-cookie-consent';
import {useHistory} from 'react-router';
import jsCookie from 'js-cookie';

const Logo =
  'https://cfg-media.s3.us-east-2.amazonaws.com/static_images/Logo.png';
const LogoImage =
  'https://cfg-media.s3.us-east-2.amazonaws.com/static_images/jmmb-foundation.png';

const Header = lazy(() => import('./auth-header'));
const SignIn = lazy(() => import('./sign-in'));
const SignUp = lazy(() => import('./sign-up'));
const ForgotPassword = lazy(() => import('./forgot-password'));
const SignUpMessage = lazy(() => import('pages/auth-pages/sign-up-message'));

// import {
//   forgotPasswordAction,
//   loginAction,
//   passwordResetAction,
//   registerAction,
// } from 'backend-integration/actions/auth-actions';

export default function Index() {
  const [view, setView] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // dispatch(registerAction({ first_name: "Test", last_name: "test", email: "f@gmail.com", password: "Hakuna123-" }))
    // dispatch(passwordResetAction({ token: "sadsdsa", password: "asdasd" }))
    const loginCookie = jsCookie.get('login');
    if (loginCookie) {
      history.push('/home');
    }
  }, []);

  return (
    <div style={{height: '100vh'}} className='whole-auth'>
      <div className='toolbar-container' style={{width: '100%'}}>
        <Header />
      </div>
      <div style={{backgroundColor: '#F0F2F5'}}>
        <div className='container-auth'>
          <div
            className='auth-card left-box'
            style={{backgroundImage: `url('${LogoImage}')`}}>
            {/* <img src={LogoImage} className="heart-image" alt="test" /> */}
          </div>
          <div className='right-box'>
            <div className='auth-card main'>
              <div className='image-container'>
                <img src={Logo} className='logo-image-screen' alt='logo' />
              </div>

              {/* <AppCard> */}
              {view === 1 ? (
                <SignIn setView={setView} />
              ) : view === 2 ? (
                <SignUp setView={setView} />
              ) : view === 3 ? (
                <ForgotPassword setView={setView} />
              ) : (
                <SignUpMessage setView={setView} />
              )}
              {/* </AppCard> */}
            </div>
          </div>
        </div>
      </div>
      <CookieConsent>
        We are using cookies to give you the best experience in this application
      </CookieConsent>
    </div>
  );
}
