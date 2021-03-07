import React from "react";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import { isAuthenticUser } from "../validateUser";
import history from "../../../utils/history";
import { register } from "../../../store/actions/auth.actions";
import { push } from "connected-react-router";

import { TextField } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

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

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
    };
  }

  onChangeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props["register"]({
      ...this.state,
      password: "A@123bvbvbv",
    });
  };

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
          <title>Register | JMMB Foundation</title>
        </Helmet>
        <div className='login_top_bar'>
          <div className='container_large'>
            <h1>JMMB Foundation</h1>
          </div>
        </div>

        <section className='account_wraper'  >
          <div className='container_large'>
            <div className='login_holder'>
              <div className='login_logo'>
                <img src={"images/jmmb_1.png"} className='img-fluid' alt='' />
              </div>
              <div className='login_form'>
                <form onSubmit={this.onFormSubmit}>
                  <div className='mb-4'>
                    <TextField
                      className={classes.w_100}
                      id='fullName'
                      label='Full Name'
                      name='firstName'
                      variant='filled'
                      required
                      onChange={this.onChangeValue}
                      error={
                        this.state.firstName !== "" &&
                        !this.state.firstName.match(
                          "^[a-zA-Z]{2,}\\s[a-zA-Z]{1,}"
                        )
                      }
                    />
                  </div>
                  <div className='mb-4'>
                    <TextField
                      className={classes.w_100}
                      id='email'
                      label='Email'
                      type='email'
                      name='email'
                      variant='filled'
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
                  <div className='d-block'>
                    <input
                      type='submit'
                      className='button primary_button button_block'
                      value='Sign Up'
                    />
                  </div>
                </form>
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
    register: (params) => dispatch(register(params)),
    push: (param) => dispatch(push(param)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(Register));
