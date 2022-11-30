import React, {useState, useEffect, lazy} from 'react';
import './style.css';
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
import PasswordStrengthBar from 'react-password-strength-bar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
const LogoImage =
  'https://cfg-media.s3.us-east-2.amazonaws.com/static_images/Logo.png';

const AppCard = lazy(() => import('@crema/core/AppCard'));

const CreatePassword = () => {
  const state = useSelector((state) => state);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [view, setView] = useState(2);
  const [validationCheckList, setValidationCheckList] = useState({
    lower: false,
    upper: false,
    number: false,
    long: false,
    special: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 7) {
      dispatch(passwordResetAction({token, password, terms_accepted: true}));
      setPassword('');
      setConfirmPassword('');
      resetValidationCheckList();
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

  const handlePasswordChange = (password) => {
    const lowerExp = new RegExp('(?=.*[a-z])');
    const upperExp = new RegExp('(?=.*[A-Z])');
    const numberExp = new RegExp('(?=.*[0-9])');
    const specialExp = new RegExp('(?=.*[!@#$%^&*])');
    const lengthExp = new RegExp('(?=.{8,})');
    setValidationCheckList({
      lower: lowerExp.test(password),
      upper: upperExp.test(password),
      number: numberExp.test(password),
      long: lengthExp.test(password),
      special: specialExp.test(password),
    });
    setPassword(password);
  };

  const resetValidationCheckList = () => {
    setValidationCheckList({
      lower: false,
      upper: false,
      number: false,
      long: false,
      special: false,
    });
  };

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
      setView(3);
    }
  }, [state]);

  const view3 = (
    <div>
      <div>
        <h3>Password has been created successfully.</h3>
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

  const view2 = (
    <div>
      <div>
        <h3>Create your password</h3>
        <p>Create a password to login</p>
      </div>
      <br />
      <div style={{textAlign: 'left'}}>
        <p>Your Password must meet all the requirements below</p>
        <p>
          {validationCheckList.long ? (
            <span style={{color: 'green'}}>
              <CheckCircleOutlineIcon />
            </span>
          ) : (
            <span style={{color: 'red'}}>
              <CancelIcon />
            </span>
          )}
          Password must consist of 8 characters
        </p>
        <p>
          {validationCheckList.upper ? (
            <span style={{color: 'green'}}>
              <CheckCircleOutlineIcon />
            </span>
          ) : (
            <span style={{color: 'red'}}>
              <CancelIcon />
            </span>
          )}
          Password must containt atleast 1 Uppercase letter
        </p>
        <p>
          {validationCheckList.lower ? (
            <span style={{color: 'green'}}>
              <CheckCircleOutlineIcon />
            </span>
          ) : (
            <span style={{color: 'red'}}>
              <CancelIcon />
            </span>
          )}
          Password must containt atleast 1 Lowercase letter
        </p>
        <p>
          {validationCheckList.special ? (
            <span style={{color: 'green'}}>
              <CheckCircleOutlineIcon />
            </span>
          ) : (
            <span style={{color: 'red'}}>
              <CancelIcon />
            </span>
          )}
          Password must containt atleast 1 Special letter
        </p>
        <p>
          {validationCheckList.number ? (
            <span style={{color: 'green'}}>
              <CheckCircleOutlineIcon />
            </span>
          ) : (
            <span style={{color: 'red'}}>
              <CancelIcon />
            </span>
          )}
          Password must containt atleast 1 digit
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type='password'
          value={password}
          name='password_input'
          required
          onChange={(e) => {
            handlePasswordChange(e.target.value);
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

  return (
    <div className='container'>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert variant='filled' onClose={handleClose1} severity='success'>
          Your password has been set. Please go back to login and sign in.
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert variant='filled' onClose={handleClose2} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>

      <div className='appCard'>
        <AppCard style={{width: '500px'}}>
          <div className='image-logo' style={{marginTop: '30px'}}>
            <img
              // style={{
              //   height: 150,
              // }}
              width='40%'
              src={LogoImage}
              alt='logo'
            />
          </div>

          {view === 2 && view2}
          {view === 3 && view3}
        </AppCard>
      </div>
    </div>
  );
};

export default CreatePassword;
