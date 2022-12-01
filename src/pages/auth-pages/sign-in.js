import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {setErrorToNull} from '../../redux/actions/authActions';
import Alert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router-dom';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import {loginAction} from '../../redux/actions/authActions';
import TermsModal from './TermsModal';

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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsModalState, setTermsModalState] = useState(false);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleClose1 = () => {
  //   setOpen1(false);
  // };
  // const handleClose2 = () => {
  //   setOpen2(false);
  //   dispatch(setErrorToNull());
  //   setErrorMessage('');
  // };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginAction({email, password, rememberMe}));
  };

  window.addEventListener('resize', () => {
    setCurrentheight(window.innerHeight);
  });

  function handleSignUp() {
    setTermsModalState(true);
  }

  return (
    <div className='sign-in-box'>
      <TermsModal
        open={termsModalState}
        setOpenState={setTermsModalState}
        setView={setView}
      />
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{
            width: '100%',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
            onClick={() => handleSignUp()}>
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
}
