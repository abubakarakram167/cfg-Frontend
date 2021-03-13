import React, {useState} from 'react';
import Header from './auth-header';
import SignIn from './sign-in';
import SignUp from './sign-up';
import ForgotPassword from './forgot-password';
import {Container} from '@material-ui/core';
import './style.css';
import Logo from 'assets/jmmb_2.png';

export default function Index() {
  const [view, setView] = useState(1);

  return (
    <div>
      <div class='toolbar-container' style={{width: '100%'}}>
        <Header />
      </div>
      <Container>
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
            ) : (
              <ForgotPassword setView={setView} />
            )}
            {/* </AppCard> */}
          </div>
        </div>
      </Container>
    </div>
  );
}
