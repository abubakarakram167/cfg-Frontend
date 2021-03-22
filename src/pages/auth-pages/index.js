import React, {useState, useEffect} from 'react';
import Header from './auth-header';
import SignIn from './sign-in';
import SignUp from './sign-up';
import ForgotPassword from './forgot-password';
import {Container} from '@material-ui/core';
import SignUpMessage from 'pages/auth-pages/sign-up-message';
import './style.css';
import Logo from 'assets/jmmb_2.png';
import {useDispatch} from 'react-redux';
import {
  forgotPasswordAction,
  loginAction,
  passwordResetAction,
  registerAction,
} from 'backend-integration/actions/auth-actions';

export default function Index() {
  const [view, setView] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(registerAction({ first_name: "Test", last_name: "test", email: "f@gmail.com", password: "Hakuna123-" }))
    // dispatch(passwordResetAction({ token: "sadsdsa", password: "asdasd" }))
  }, []);

  return (
    <div>
      <div className='toolbar-container' style={{width: '100%'}}>
        <Header />
      </div>
      <Container style={{backgroundColor: '#F0F2F5'}}>
        <div className='container'>
          <div className='auth-card left-box'></div>
          <div className='auth-card main'>
            <div className='image-container'>
              <img src={Logo} alt='logo' />
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
      </Container>
    </div>
  );
}
