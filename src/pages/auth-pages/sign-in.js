import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Facebook from 'assets/facebook.png';
import Google from 'assets/google.jpg';
import Mail from 'assets/Mail.png';
import Twitter from 'assets/Twitter.png';
import {useDispatch, useSelector} from 'react-redux';
import {setErrorToNull} from '../../redux/actions/authActions';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import {socket} from 'socket';
import {loginAction} from '../../redux/actions/authActions';

const StyledFormField = withStyles((theme) => ({}))(TextField);

const useStyles = makeStyles({
  root: {
    '& .MuiFilledInput-input': {
      height: '5vh',
    },
    '& .MuiFormLabel-root': {
      fontSize: '0.8em',
      marginLeft: 25,
    },
  },
  secondRoot: {
    '& .MuiFilledInput-input': {
      height: '2vh',
    },
    '& .MuiFormLabel-root': {
      fontSize: '0.8em',
      marginLeft: 25,
    },
  },
});

export default function SignIn({setView}) {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [currentHeight, setCurrentheight] = useState(0);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();
  const [rememberMe, setRememberMe] = useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
    dispatch(setErrorToNull());
    setErrorMessage('');
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
  window.addEventListener('resize', () => {
    setCurrentheight(window.innerHeight);
  });

  useEffect(() => {
    if (state.auth.error) {
      setErrorMessage(state.auth.error);
      setOpen2(true);
    }
    if (state.auth.user) {
      if (state.auth.user.role === 'candidate') {
        if (state.auth?.user?.default_home_page_view == 'icon') {
          history.push('/icon-dashboard');
        } else {
          history.push('/home');
        }
      } else {
        history.push('/admin');
      }
    }
  }, [state]);

  return (
    <div className='sign-in-box'>
      {errorMessage && (
        <div
          style={{
            color: 'red',
            marginBottom: 10,
            fontWeight: '600',
            fontSize: 14,
          }}>
          <Alert
            severity='error'
            variant='filled'
            onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        </div>
      )}
      <form className='forms' onSubmit={handleSubmit}>
        <TextField
          required
          type='email'
          label='Email'
          fullWidth
          variant='filled'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <PersonIcon style={{fontSize: 15}} />
              </InputAdornment>
            ),
          }}
          required
          // className={currentHeight >= 600 ? classes.root : classes.secondRoot}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          type='password'
          label='Password'
          fullWidth
          variant='filled'
          // className={currentHeight >= 600 ? classes.root : classes.secondRoot}
          style={{marginTop: '20px', marginBottom: '20px'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LockIcon style={{fontSize: 15}} />
              </InputAdornment>
            ),
          }}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: currentHeight >= 600 ? '5vh' : '2vh',
            fontSize: currentHeight <= 600 && 12,
          }}>
          <div
            style={{display: 'flex', alignItems: 'center'}}
            onClick={(e) => {
              setRememberMe(!rememberMe);
            }}>
            <Checkbox /> <span>Remember Me</span>
          </div>
          <div
            style={{color: '#EB1B29', fontWeight: '600', cursor: 'pointer'}}
            onClick={() => setView(3)}>
            Forgot Password?
          </div>
        </div>
        <button className='action-button'>Sign In</button>
        {/* <div className='orHeader'>
          <div style={{ position: 'relative', top: '-12px' }}>
            <span
              style={{
                background: 'white',
                color: 'gainsboro',
                padding: '0px 5px',
              }}>
              or
            </span>
          </div>
        </div> */}

        {/* <div className='icons'>
          <img src={Google} alt='' />
          <img src={Mail} alt='' />
          <img src={Twitter} alt='' />
          <img src={Facebook} alt='' />
        </div> */}
        <div className='last-container'>
          <span style={{color: '#eb1b29'}}>Don't have an account? </span>
          <br />
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
