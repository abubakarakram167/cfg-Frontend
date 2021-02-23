import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { isAuthenticUser } from "../validateUser";

import { forgot } from "../../../store/actions/auth.actions";
import history from "../../../utils/history";

import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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

class ForgetPassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  onChangeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onResetSubmit = (e) => {
    e.preventDefault();
    this.props["forgot"]({
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
    return null;
  }

  render() {
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

        <section className='account_wraper forgot_holder'>
          <div className='container_large'>
            <div className='login_holder'>
              <div className='login_logo'>
                <img src={"/images/jmmb_1.png"} className='img-fluid' alt='' />
              </div>
              <div className='login_form'>
                <h2>Forgot your password?</h2>
                <h3>Enter your email address and click reset</h3>
                <form onSubmit={this.onResetSubmit}>
                  <div className='mb-4'>
                    <TextField
                      className={classes.w_100}
                      variant='filled'
                      id='email'
                      name='email'
                      label='Email'
                      type='email'
                      required
                      error={
                        this.state.email !== "" &&
                        !this.state.email.match(
                          "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                        )
                      }
                      onChange={this.onChangeValue}
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
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    forgot: (params) => dispatch(forgot(params)),
    push: (param) => dispatch(push(param)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(ForgetPassword));
