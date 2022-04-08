import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Facebook from 'assets/facebook.png';
import Google from 'assets/google.jpg';
import Mail from 'assets/Mail.png';
import Twitter from 'assets/Twitter.png';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../../redux/actions/authActions';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function SignIn({setView}) {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginAction({email, password, rememberMe}));
  };

  useEffect(() => {
    if (state.auth.error) {
      setOpen2(true);
    }
    if (state.auth.user) {
      window.location.href = '/admin';
    }
  }, [state]);

  return (
    <div className='sign-in-box'>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity='success'>
          Email has been sent to the associated email address.
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity='error'>
          Email or password is incorrect.
        </Alert>
      </Snackbar>
      <form className='forms' onSubmit={handleSubmit}>
        <TextField
          required
          type='email'
          label='Email'
          fullWidth
          variant='filled'
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          type='password'
          label='Password'
          fullWidth
          variant='filled'
          style={{marginTop: '20px', marginBottom: '20px'}}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{
            width: '100%',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <div
            onClick={(e) => {
              setRememberMe(!rememberMe);
            }}
            style={{display: 'flex', alignItems: 'center'}}>
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

        {/* <div className='icons'>
          <img src={Google} width='40px' alt='' />
          <img src={Mail} width='60px' alt='' />
          <img src={Twitter} width='40px' alt='' />
          <img src={Facebook} width='40px' alt='' />
        </div> */}
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
