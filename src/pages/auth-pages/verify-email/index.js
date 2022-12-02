import React, {useState, useEffect, lazy} from 'react';
import './style.css';
import {TextField} from '@material-ui/core';
import queryString from 'query-string';
import {verifyEmail} from '../../../redux/actions/authActions';
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
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const query = queryString.parse(window.location.search);
    if (!query.token || query.token.length < 1) {
      setVerificationStatus('noToken');
    } else {
      verifyUserEmail(query.token);
    }
  }, []);

  async function verifyUserEmail(token) {
    let resp = await verifyEmail(token);
    if (resp.status === 200) {
      resp.data.newUser
        ? setVerificationStatus('successfullyVerified')
        : setVerificationStatus('alreadyVerified');
    } else if (resp.status === 422) {
      setVerificationStatus('invalidToken');
    } else {
      setVerificationStatus('unknown');
    }
    // alert(JSON.stringify(resp))
  }

  const view3 = (
    <div>
      <div>
        <h3>
          {verificationStatus === 'noToken' && 'Invalid Activation Token.'}
          {verificationStatus === 'invalidToken' &&
            'Email Verification token is invalid or expired.'}
          {verificationStatus === 'alreadyVerified' &&
            'Email Already Verified.'}
          {verificationStatus === 'successfullyVerified' &&
            'Email succesfully verified.'}
          {verificationStatus === 'unknown' &&
            'An unknown error occurred.Please try again later.'}
        </h3>
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
    <div
      className='container'
      style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
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

          {view3}
        </AppCard>
      </div>
    </div>
  );
};

export default CreatePassword;
