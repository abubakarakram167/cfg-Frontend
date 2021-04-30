import React, {useState, useEffect} from 'react';
import Header from './auth-header';
import SignIn from './sign-in';
import SignUp from './sign-up';
import ForgotPassword from './forgot-password';
import {Container} from '@material-ui/core';
import SignUpMessage from 'pages/auth-pages/sign-up-message';
import './style.css';
import Logo from 'assets/Logo.png';
import {useDispatch} from 'react-redux';
import LogoImage from 'assets/jmmb-foundation.png';
// import {
//   forgotPasswordAction,
//   loginAction,
//   passwordResetAction,
//   registerAction,
// } from 'backend-integration/actions/auth-actions';

export default function Index() {
  const [view, setView] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(registerAction({ first_name: "Test", last_name: "test", email: "f@gmail.com", password: "Hakuna123-" }))
    // dispatch(passwordResetAction({ token: "sadsdsa", password: "asdasd" }))
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
            style={{backgroundImage: LogoImage}}>
            {/* <img src={LogoImage} className="heart-image" alt="test" /> */}
          </div>
          <div className='right-box'>
            <div className='auth-card main'>
              <div className='image-container'>
                <img
                  style={{width: 200}}
                  src={Logo}
                  className='logo-image-screen'
                  alt='logo'
                />
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
    </div>
  );
}
