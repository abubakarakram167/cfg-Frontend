import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function SignUp({setView}) {
  return (
    <div>
      <form className='forms' action=''>
        <TextField
          required
          type='text'
          label='Name'
          fullWidth
          variant='filled'
          style={{marginTop: '20px', marginBottom: '20px'}}
        />

        <TextField
          required
          type='email'
          label='Email'
          fullWidth
          variant='filled'
        />

        <button className='action-button'>Sign Up</button>

        <div style={{width: '100%', marginTop: '10px'}}>
          Already have an account?{' '}
          <span
            style={{color: '#EB1B29', fontWeight: '600', cursor: 'pointer'}}
            onClick={() => setView(1)}>
            Sign In
          </span>
        </div>
      </form>
    </div>
  );
}
