import React, {useState, useEffect} from 'react';
import './style.css';
import AppCard from '@crema/core/AppCard';
import Logo from 'assets/Logo.png';
import {TextField} from '@material-ui/core';
import queryString from 'query-string';
import {
  passwordResetAction,
  setErrorToNull,
} from '../../../redux/actions/authActions';
import {useDispatch} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import ReactPasswordStrength from 'react-password-strength';
import PasswordStrengthBar from 'react-password-strength-bar';
import LogoImage from 'assets/Logo.png';
import {baseUrl} from 'utils/axios';
import {terms_conditions} from './terms_conditions';

const CreatePassword = () => {
  const state = useSelector((state) => state);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 7) {
      dispatch(passwordResetAction({token, password, terms_accepted: true}));
      setPassword('');
      setConfirmPassword('');
    }
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
    dispatch(setErrorToNull());
    setErrorMessage('');
  };

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [view, setView] = useState(1);
  useEffect(() => {
    const query = queryString.parse(window.location.search);
    setToken(query.token);
  }, []);

  useEffect(() => {
    if (state.auth.error) {
      setErrorMessage(state.auth.error);
      setOpen2(true);
    }
    if (state.auth.message) {
      setOpen1(true);
    }
  }, [state]);

  const acceptTerms = () => {
    setView(2);
  };

  const rejectTerms = () => {
    window.location.href = '/';
  };

  const view2 = (
    <div>
      <div>
        <h3>Create your password</h3>
        <p>Create a password to login</p>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type='password'
          value={password}
          name='password_input'
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          variant='filled'
          placeholder='Password'
        />
        <PasswordStrengthBar password={password} />
        {password && password.length <= 6 && (
          <p className='not-password-match'> Password shouldn't be weak. </p>
        )}
        <TextField
          style={{marginTop: 10}}
          fullWidth
          type='password'
          value={confirmPassword}
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          variant='filled'
          placeholder='Confirm Password'
        />
        {password && confirmPassword && password !== confirmPassword && (
          <p className='not-password-match'> Password Don't match </p>
        )}
        <br />
        <button
          className='submit-button'
          type='submit'
          disabled={password !== confirmPassword || password.length < 6}>
          CREATE PASSWORD
        </button>
      </form>

      <br />
      <div className='bottom-links'>
        Go back to{' '}
        <span>
          <Link to='/'>Login</Link>
        </span>
      </div>
    </div>
  );

  const view1 = (
    <div>
      <div>
        <h3>Terms and Conditions</h3>
        <div style={{height: '30vh', overflowY: 'scroll'}}>
          <div dangerouslySetInnerHTML={{__html: terms_conditions}}></div>
        </div>
      </div>
      <br />

      <div>
        <button className='submit-button' onClick={acceptTerms}>
          Accept
        </button>

        <button className='submit-button' onClick={rejectTerms}>
          Reject
        </button>
      </div>

      <br />
      <div className='bottom-links'>
        Go back to{' '}
        <span>
          <Link to='/'>Login</Link>
        </span>
      </div>
    </div>
  );

  return (
    <div className='container'>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity='success'>
          Your password has been set. Please go back to login and sign in.
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>

      <div className='appCard'>
        <AppCard>
          <div className='image-logo'>
            <img
              // style={{
              //   height: 150,
              // }}
              width='40%'
              src={LogoImage}
              alt='logo'
            />
          </div>

          {view === 1 && view1}
          {view == 2 && view2}
        </AppCard>
      </div>
    </div>
  );
};

export default CreatePassword;
