import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { isAuthenticUser } from "../validateUser";
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { login, socialLogin } from "../../../store/actions/auth.actions";
import history from "../../../utils/history";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-with-button";
import MicrosoftLogin from "react-microsoft-login";
import jsCookie from "js-cookie";
import './login.css';
const useStyles = (theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  w_100: {
    width: "100%",
  },
  input: {
    "&:invalid": {
      borderBottom: "red solid 2px",
    },
  },
});

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      logged: false,
      user: {},
      currentProvider: "",
      showPassword: false,
    };
    this.nodes = {};
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
    this.onLogoutFailure = this.onLogoutFailure.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }
  setNodeRef(provider, node) {
    if (node) {
      this.nodes[provider] = node;
    }
  }

  onLoginSuccess(user) {
    console.log(user);
    let responseObject = { source: "google" };
    if (user && user.profileObj && user.profileObj.email) {
      responseObject.email = user.profileObj.email;
    }
    if (user && user.profileObj && user.profileObj.name) {
      responseObject.name = user.profileObj.name;
    }
    // if (user && user.profileObj && user.profileObj.email) {
    //     responseObject.imageUrl = user.profileObj.imageUrl;
    // }
    if (user && user.accessToken && user.profileObj.googleId) {
      responseObject.socialId = user.profileObj.googleId;
    }
    this.props["socialLogin"](responseObject);
  }

  onLoginFailure(err) {
    console.error(err);
  }

  onLogoutSuccess() {
    this.setState({
      logged: false,
      currentProvider: "",
      user: {},
    });
  }

  onLogoutFailure(err) {
    console.error(err);
  }

  logout() {
    const { logged, currentProvider } = this.state;

    if (logged && currentProvider) {
      this.nodes[currentProvider].props.triggerLogout();
    }
  }

  onChangeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onLoginSubmit = (e) => {
    e.preventDefault();
    this.props["login"]({
      ...this.state,
    });
  };
  authHandler = (err, user) => {
    console.log(err, user);
    if (err) {
      alert(err);
      return;
    }
    let responseObject = { source: "microsoft" };
    if (user && user.account && user.account.userName) {
      responseObject.email = user.account.userName;
    }
    if (user && user.account && user.account.name) {
      responseObject.name = user.account.name;
    }
    if (user && user.account && user.account.accountIdentifier) {
      responseObject.socialId = user.account.accountIdentifier;
    }
    this.props["socialLogin"](responseObject);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.auth && props.auth.user && props.auth.user.token) {
      props.history.push("/");
      return null;
    }
    return null;
  }

  render() {
    console.log(this.props);

    const { classes } = this.props;
    if (isAuthenticUser()) {
      return history.push("/");
    }
    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <meta name='description' content='' />
          <meta name='keywords' content='' />
          <meta name='author' content='' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' type='image/png' href={"images/favicon.png"} />
          <title>Login | JMMB Foundation</title>
        </Helmet>
        <div className='login_top_bar'>
          <div className='container_large'>
            <h1>JMMB Foundation</h1>
          </div>
        </div>

        <section className='account_wraper' style = {{ overflowX: 'hidden', overflowY: "hidden" }} >
          <div className='container_large'>
            <div className='login_holder'>
              <div className='login_logo'>
                <img src={"images/jmmb_1.png"} className='img-fluid' alt='' />
              </div>
              <div className='login_form'>
                <form onSubmit={this.onLoginSubmit}>
                  <div className='mb-4'>
                    <TextField
                      // helperText={(e) => {
                      //   return e.target.error ? "Incorrect Entry" : "";
                      // }}
                      className={classes.w_100}
                      id='email'
                      variant='filled'
                      label='Email'
                      name='email'
                      type='email'
                      required
                      onChange={this.onChangeValue}
                      error={
                        this.state.email !== "" &&
                        !this.state.email.match(
                          "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                        )
                      }
                    />
                  </div>
                  <div className='mb-3 relative'>
                    <TextField
                      className={classes.w_100}
                      id='password'
                      label='Password'
                      name='password'
                      variant='filled'
                      required
                      onChange={this.onChangeValue}
                      type={this.state.showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='start'>
                            {" "}
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                            >
                              {this.state.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className='forgot_links mb-4'>
                    <div className='row'>
                      <div className='col-6'>
                        <div className='form-group'>
                          <div className='form-check'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              value=''
                              id='flexCheckDefault'
                            />
                            <span
                              className='form-check-label'
                              htmlFor='flexCheckDefault'
                            >
                              Remember Me
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='col-6'>
                        <p className='forgot_password'>
                          <Link to='/forgetPassword'>Forgot Password?</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='d-block'>
                    <input
                      type='submit'
                      className='button primary_button button_block'
                      value='Sign In'
                    />
                  </div>
                </form>
                <div className='social_login my-4'>
                  <h3>or</h3>
                  <ul>
                    <li>
                      <GoogleLogin
                        clientId='943652713814-j2mt07ub0944r9e94n7mer3b07sj9l5j.apps.googleusercontent.com'
                        render={(renderProps) => (
                          <Link
                            to='#'
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                          >
                            <img src={"images/google-icon.png"} alt='' />
                          </Link>
                        )}
                        buttonText='Login'
                        onSuccess={this.onLoginSuccess}
                        onFailure={this.onLoginSuccess}
                        cookiePolicy={"single_host_origin"}
                      />
                    </li>
                    <li className={"ms-li"}>
                      <MicrosoftLogin
                        className={"ms-custom"}
                        clientId={"6768fe0e-38f9-4e0a-bfc6-65b3d3645607"}
                        authCallback={this.authHandler}
                        redirectUri={"http://localhost:3001/"}
                        buttonTheme={"light_short"}
                      />
                      {/*<Link to="#"><img src={"images/mail-icon.png"} alt=""/></Link>*/}
                    </li>
                    <li>
                      <Link to='#'>
                        <img src={"images/twitter-icon.png"} alt='' />
                      </Link>
                    </li>
                    <li>
                      <FacebookLogin
                        appId='413382886411661'
                        autoLoad={false}
                        textButton={""}
                        fields='name,email,picture'
                        scope='public_profile,email,phone'
                        callback={this.onLoginSuccess}
                        cssClass={"fb-button-custom"}
                        icon={"fa fa-facebook"}
                        size={"small"}
                        render={(renderProps) => (
                          // <button onClick={renderProps.onClick}>This is my custom FB button</button>
                          <Link to='#' onClick={renderProps.onClick}>
                            <img src={"images/facebook-icon.png"} alt='' />
                          </Link>
                        )}
                      />
                      {/*    <Link to="#"><img src={"images/facebook-icon.png"} alt=""/></Link>*/}
                    </li>
                  </ul>
                </div>
                <div className='dont_account'>
                  <p>
                    Don't have an account? <Link to={"/register"}>Signup</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='round_img'>
            <img
              src={"images/bible-verses-about-love@2x.jpg"}
              className='img-fluid'
              alt=''
            />
          </div>
        </section>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(login(params)),
    socialLogin: (params) => dispatch(socialLogin(params)),
    push: (param) => dispatch(push(param)),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(Login));
