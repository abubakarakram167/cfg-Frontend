import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { isAuthenticUser } from "../validateUser";
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { reset } from "../../../store/actions/auth.actions";
import { getPreferences } from "../../../store/actions/preferences.actions";
import history from "../../../utils/history";
import { toast } from "react-toastify";

class ResetPassword extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      password: "",
      token: "",
      accepted: false,
      terms: "",
      showPassword: false,
      createPass: false,
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);

  }

  componentDidMount() {
    let urlParts = window.location.href;
    let shouldRedirect = true;
    urlParts = ~urlParts.indexOf("?") ? urlParts.split("?") : undefined;
    console.log(urlParts)
    // let currScreen = .split('/')[1];
    // console.log(currScreen);
    if (~urlParts[0].indexOf("createPassword")) {
      this.setState({
        createPass: true
      });
      console.log(this.state.createPass);
    }
    if (urlParts) {
      urlParts = ~urlParts[1].indexOf("=") ? urlParts[1].split("=") : undefined;
      if (urlParts) {
        this.setState({
          token: urlParts[1],
        });
        shouldRedirect = false;
      }
    }
    if (shouldRedirect) {
      toast.error("Url not valid");
      history.push("/login");
    }
    this.props["getPreferences"]();
  }
  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }
  onChangeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onResetSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.match);
    if (this.state["password"] !== this.state["newPassword"]) {
      toast.error("Password does not match.");
      return;
    }
    this.props["reset"]({
      ...this.state,
    });
  };
  authHandler = (err, data) => {
    console.log(err, data);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.auth && props.auth.user && props.auth.user.token) {
      props.history.push("/");
      return null;
    }
    if (props.preferences && props.preferences.length) {
      let terms = props.preferences.filter(
        (elem) => elem["option_name"] === "terms"
      );
      return {
        terms: terms ? terms[0]["option_value"] : "",
      };
    }
    return null;
  }

  render() {
    if (isAuthenticUser()) {
      return history.push("/");
    }
    console.log("State", this.state);
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
        


          {!this.state.accepted && this.state.createPass && (
        <section className='account_wraper forgot_holder'>
          <div className='container_large'>
            <div className='login_holder reset_link'>
              <div className='login_logo'>
                <img src={"images/jmmb_1.png"} className='img-fluid' alt='' />
              </div>
              <div
                className='login_form'
                style={{
                  maxHeight: "500px",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                <h1 style={{ textAlign: "center" }}>Terms and Conditions</h1>
                <br />
                <p>{this.state.terms}</p>
                <div className='d-block text-center'>
                  <Link
                    to='#'
                    className='button primary_button'
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ accepted: true });
                    }}
                  >
                    I AGREE
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}
        { !this.state.createPass && (
          <section className='account_wraper forgot_holder'>
            <div className='container_large'>
              <div className='login_holder'>
                <div className='login_logo'>
                  <img
                    src={"/images/jmmb_1.png"}
                    className='img-fluid'
                    alt=''
                  />
                </div>
                <div className='login_form'>
                  <h2>Reset your password?</h2>
                  <h3>Enter your password and click reset</h3>
                  <form onSubmit={this.onResetSubmit}>
                    <div className='mb-4'>
                      <TextField
                        style={{ width: "100%" }}
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
                      {/* <input
                        type='password'
                        name='password'
                        placeholder='Enter new password *'
                        onChange={this.onChangeValue}
                        required
                      /> */}
                    </div>
                    <div className='mb-4'>
                      {/* <input type="password" name="newPassword"
                                               placeholder="Enter new password again *" onChange={this.onChangeValue}
                                               required/> */}
                      <TextField
                        style={{ width: "100%" }}
                        id='password'
                        label='Confirm Password'
                        name='newPassword'
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
                    <div className='d-block'>
                      <input
                        type='submit'
                        className='button primary_button button_block'
                        value='Reset Password'
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
        {this.state.accepted && this.state.createPass && (
          <section className='account_wraper forgot_holder'>
            <div className='container_large'>
              <div className='login_holder'>
                <div className='login_logo'>
                  <img
                    src={"/images/jmmb_1.png"}
                    className='img-fluid'
                    alt=''
                  />
                </div>
                <div className='login_form'>
                  <h2>Create your password?</h2>
                  <h3>Enter your password and click Create</h3>
                  <form onSubmit={this.onResetSubmit}>
                    <div className='mb-4'>
                      <TextField
                        style={{ width: "100%" }}
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
                      {/* <input
                        type='password'
                        name='password'
                        placeholder='Enter new password *'
                        onChange={this.onChangeValue}
                        required
                      /> */}
                    </div>
                    <div className='mb-4'>
                      {/* <input type="password" name="newPassword"
                                               placeholder="Enter new password again *" onChange={this.onChangeValue}
                                               required/> */}
                      <TextField
                        style={{ width: "100%" }}
                        id='password'
                        label='Confirm Password'
                        name='newPassword'
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
                    <div className='d-block'>
                      <input
                        type='submit'
                        className='button primary_button button_block'
                        value='Create Password'
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
}

function mapPropsToState(store) {
  return {
    preferences: store.preferences.all,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: (params) => dispatch(reset(params)),
    getPreferences: () => dispatch(getPreferences()),
    push: (param) => dispatch(push(param)),
  };
};
export default connect(mapPropsToState, mapDispatchToProps)(ResetPassword);
