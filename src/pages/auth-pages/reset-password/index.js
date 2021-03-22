import React, {useState, useEffect} from 'react';
import './style.css';
import AppCard from '@crema/core/AppCard';
import Logo from 'assets/jmmb_2.png';
import {TextField} from '@material-ui/core';
import queryString from 'query-string';
import {passwordResetAction} from 'backend-integration/actions/auth-actions';
import {useDispatch} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Typography} from '@material-ui/core';

const ResetPassword = () => {
  const state = useSelector((state) => state);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(token);
    console.log(password);
    setPassword('');
    dispatch(passwordResetAction({token, password}));
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  useEffect(() => {
    const query = queryString.parse(window.location.search);
    setToken(query.token);
  }, []);

  useEffect(() => {
    if (state.auth.error) {
      setOpen2(true);
    }
    if (state.auth.message) {
      setOpen1(true);
    }
  }, [state]);
  return (
    <div className='container'>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity='success'>
          Your password has been successfully reset.
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity='error'>
          No email addresses found matching the one you entered.
        </Alert>
      </Snackbar>

      <div className='appCard'>
        <AppCard>
          <div className='image-logo'>
            <img src={Logo} alt='logo' />
          </div>
          <div>
            <h3>Password Reset</h3>
            <p>Please enter your new password and submit.</p>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              variant='filled'
              placeholder='password'
            />
            <br />
            <button className='submit-button' type='submit'>
              RESET PASSWORD
            </button>
          </form>

          <br />
          <div className='bottom-links'>
            Go back to{' '}
            <span>
              <Link to='/'>Login</Link>
            </span>
          </div>
        </AppCard>
      </div>
    </div>
  );
};

export default ResetPassword;
