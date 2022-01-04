import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
// import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import {forgotPasswordAction} from '../../redux/actions/authActions';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function ForgotPassword({setView}) {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  // const state = useSelector((state) => {
  //   return state;
  // });

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPasswordAction({email}));

    setOpen1(true);
    setEmail('');
  };

  return (
    <div>
      {open1 && (
        <Alert severity='error' variant='filled' onClose={() => setOpen1(null)}>
          Email has been sent to the associated email address.
        </Alert>
      )}

      <span
        style={{
          fontWeight: 600,
          fontSize: '20px',
          color: '#eb1b29',
        }}>
        Forgot your password?
      </span>
      <div style={{margin: '10px 0px', fontSize: '10px', color: '#eb1b29'}}>
        {' '}
        Enter your email address to reset password
      </div>

      <form className='forms' onSubmit={handleSubmit} action=''>
        <TextField
          required
          type='email'
          label='Email'
          fullWidth
          variant='filled'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type='submit' className='action-button' style={{width: '50%'}}>
          Reset Password
        </button>

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

export default React.memo(ForgotPassword);
