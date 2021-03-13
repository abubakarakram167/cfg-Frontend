import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function ForgotPassword({setView}) {
  return (
    <div>
      <span
        style={{
          fontWeight: 600,
          fontSize: '20px',
        }}>
        Forgot your password?
      </span>
      <div style={{margin: '10px 0px', fontSize: '10px'}}>
        {' '}
        Enter your email address to reset password
      </div>

      <form className='forms' action=''>
        <TextField
          required
          type='email'
          label='Email'
          fullWidth
          variant='filled'
        />

        <button className='action-button'>Reset Password</button>

        <div style={{width: '100%', marginTop: '10px'}}>
          <span
            style={{color: '#EB1B29', fontWeight: '600', cursor: 'pointer'}}
            onClick={() => setView(1)}>
            Go Back
          </span>
        </div>
      </form>
    </div>
  );
}
