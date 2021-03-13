import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Facebook from 'assets/facebook.png';
import Google from 'assets/google.jpg';
import Mail from 'assets/Mail.png';
import Twitter from 'assets/Twitter.png';

export default function SignIn({setView}) {
  return (
    <div>
      <form className='forms' action=''>
        <TextField
          required
          type='email'
          label='Email'
          fullWidth
          variant='filled'
        />
        <TextField
          required
          type='password'
          label='Password'
          fullWidth
          variant='filled'
          style={{marginTop: '20px', marginBottom: '20px'}}
        />
        <div
          style={{
            width: '100%',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Checkbox /> <span>Remember Me</span>
          </div>

          <div
            style={{color: '#EB1B29', fontWeight: '600', cursor: 'pointer'}}
            onClick={() => setView(3)}>
            Forgot Password?
          </div>
        </div>
        <button className='action-button'>Sign In</button>
        <div
          style={{
            borderTop: '1px solid gainsboro',
            width: '100%',
            marginTop: '10px',
          }}>
          <div style={{position: 'relative', top: '-12px'}}>
            <span
              style={{
                background: 'white',
                color: 'gainsboro',
                padding: '0px 5px',
              }}>
              or
            </span>
          </div>
        </div>

        <div className='icons'>
          <img src={Google} width='40px' alt='' />
          <img src={Mail} width='60px' alt='' />
          <img src={Twitter} width='40px' alt='' />
          <img src={Facebook} width='40px' alt='' />
        </div>
        <div style={{width: '100%', marginTop: '10px'}}>
          Don't have an account?{' '}
          <span
            style={{color: '#EB1B29', fontWeight: '600', cursor: 'pointer'}}
            onClick={() => setView(2)}>
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
}
