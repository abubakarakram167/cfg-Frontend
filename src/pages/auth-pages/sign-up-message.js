import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import {registerAction} from 'backend-integration/actions/auth-actions';
import {useDispatch} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useSelector} from 'react-redux';
export default function SignUp({setView}) {
  return (
    <div>
      <div className='message-text'>
        Your request to join JMMB Joan Duncan Foundation Conversation for
        Greatness family has been submitted. Once approved, a link will be sent
        to the email provided with instructions on how to setup your account.
        The link will expire in three (3) hours.
      </div>

      <button className='action-button' onClick={() => setView(1)}>
        Back to Login
      </button>
    </div>
  );
}
