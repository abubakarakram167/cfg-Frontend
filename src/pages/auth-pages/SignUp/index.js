import React, {useState} from 'react';
import Card from '@mui/material/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {registerAction} from '../../../redux/actions/authActions';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom';
import './style.css';

const verifyPassword = (password) => {
  const lowerExp = new RegExp('(?=.*[a-z])');
  const upperExp = new RegExp('(?=.*[A-Z])');
  const numberExp = new RegExp('(?=.*[0-9])');
  const specialExp = new RegExp('(?=.*[!@#$%^&*])');
  const lengthExp = new RegExp('(?=.{8,})');
  if (
    !lowerExp.test(password) ||
    !upperExp.test(password) ||
    !numberExp.test(password) ||
    !specialExp.test(password) ||
    !lengthExp.test(password)
  ) {
    return false;
  }
  return true;
};

const signUpSchema = yup.object().shape({
  first_name: yup
    .string()
    .required('First Name is required')
    .matches(
      /^[^-\s][a-zA-Z0-9_\s-]+$/,
      'Please Enter Alphanumeric Characters',
    ),
  last_name: yup
    .string()
    .required('First Name is required')
    .matches(
      /^[^-\s][a-zA-Z0-9_\s-]+$/,
      'Please Enter Alphanumeric Characters',
    ),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup.number('Enter a valid phone').required('Phone is required'),
  institution: yup
    .string()
    .required('Institution is required')
    .max(50, 'Institution should be of maximum 50 characters length'),
  parish: yup
    .string()
    .required('Parish is required')
    .max(50, 'Parish should be of maximum 50 characters length'),
  age_range: yup
    .string()
    .required('Age Range is required')
    .max(50, 'Age Range should be of maximum 50 characters length'),
  password: yup
    .string()
    .test(
      'checklist-test',
      'Your password does not meet all the requirements',
      verifyPassword,
    )
    .required('Password is required')
    .min(8, 'Password should be of minimum 8 characters length'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //Special Password Validation
  const [validationCheckList, setValidationCheckList] = useState({
    lower: false,
    upper: false,
    number: false,
    long: false,
    special: false,
  });
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
    // setPassword(password)
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
  //Special Password Validation Code Ends

  /** Form Validation Definitions */
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      institution: '',
      parish: '',
      age_range: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: (values, {resetForm}) => {
      signUpUser(values);
      // resetPassword(values.password, resetForm);
    },
  });

  async function signUpUser(data) {
    let resp = await registerAction({...data}, dispatch);
    if (resp.status === 200) {
      history.push('/');
      toast.success('Registration successful. Please login to continue');
    } else {
      toast.success('Registration failed. Please try again later');
    }
  }

  return (
    <div
      className='container'
      style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
      <Card sx={{width: '80%', padding: '20px'}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <img
            className='form-img'
            src='https://cfg-media.s3.us-east-2.amazonaws.com/static_images/Logo.png'
          />
        </div>

        <CardContent>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Typography gutterBottom variant='h4' component='div'>
              Sign Up
            </Typography>
          </div>
          <Box component='form' onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <TextField
                  name='first_name'
                  label='First Name'
                  placeholder='First Name'
                  fullWidth
                  variant='filled'
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.first_name &&
                    Boolean(formik.errors.first_name)
                  }
                  helperText={
                    formik.touched.first_name && formik.errors.first_name
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <TextField
                  name='last_name'
                  label='Last Name'
                  placeholder='Last Name'
                  fullWidth
                  variant='filled'
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.last_name && Boolean(formik.errors.last_name)
                  }
                  helperText={
                    formik.touched.last_name && formik.errors.last_name
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <TextField
                  name='email'
                  label='Email'
                  placeholder='Email'
                  fullWidth
                  variant='filled'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <TextField
                  name='phone'
                  label='Phone'
                  placeholder='Phone'
                  fullWidth
                  type='number'
                  variant='filled'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <TextField
                  name='institution'
                  label='Institution'
                  placeholder='Institution'
                  fullWidth
                  variant='filled'
                  value={formik.values.institution}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.institution &&
                    Boolean(formik.errors.institution)
                  }
                  helperText={
                    formik.touched.institution && formik.errors.institution
                  }
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <TextField
                  name='parish'
                  label='Parish'
                  placeholder='Parish'
                  fullWidth
                  variant='filled'
                  value={formik.values.parish}
                  onChange={formik.handleChange}
                  error={formik.touched.parish && Boolean(formik.errors.parish)}
                  helperText={formik.touched.parish && formik.errors.parish}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <TextField
                  name='age_range'
                  label='Age Range'
                  placeholder='Age Range'
                  fullWidth
                  variant='filled'
                  value={formik.values.age_range}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.age_range && Boolean(formik.errors.age_range)
                  }
                  helperText={
                    formik.touched.age_range && formik.errors.age_range
                  }
                />
              </Grid>
              {/* Password Validation CheckList Texts Started */}
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Typography gutterBottom variant='h5' component='div'>
                    Your Password must meet all the requirements below
                  </Typography>
                </div>
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
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
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
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
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
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
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
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
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
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
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}></Grid>

              {/* Password Validation CheckList Texts Ended */}
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <TextField
                  name='password'
                  label='Password'
                  placeholder='Password'
                  fullWidth
                  variant='filled'
                  type='password'
                  value={formik.values.password}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handlePasswordChange(e.target.value);
                  }}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <TextField
                  name='confirm_password'
                  label='Confirm Password'
                  placeholder='Confirm Password'
                  fullWidth
                  type='password'
                  variant='filled'
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirm_password &&
                    Boolean(formik.errors.confirm_password)
                  }
                  helperText={
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password
                  }
                />
              </Grid>
              <Grid item lg={12} md={12} sm={6} xs={12}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <button className='submit-button' type='submit'>
                    Sign Up
                  </button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
