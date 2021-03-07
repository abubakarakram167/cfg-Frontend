import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../../components/Header';
import { editUser } from '../../../store/actions/users.actions';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import _ from 'lodash';
import { paramCase } from 'change-case';
import save from '../../../components/common/assets/icons/save.svg';
import cancel from '../../../components/common/assets/icons/x-circle.svg';
import { withStyles } from "@material-ui/core/styles";
import { TextField, IconButton, InputAdornment,InputLabel,Select } from "@material-ui/core";

const useStyles = (theme) => ({
 
  w_100: {
    width: "100%",
  },
  
});

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      once: true,
      user_name: '',
      first_name: '',
      email: '',
      role: '',
      phone: '',
      group: '',
      roles: [
        { id: 'auditor', label: 'Auditor' },
        { id: 'candidate', label: 'Candidate' },
        { id: 'content-manager', label: 'Content Manager' },
        { id: 'facilitator', label: 'Facilitator' },
        { id: 'reviewer', label: 'Reviewer' },
        { id: 'system-administrator', label: 'System Administrator' },
      ],
      statuses: [
        { id: 2, label: 'Disabled' },
        { id: 1, label: 'Approved' },
        { id: 0, label: 'Pending' },
      ],
    };
  }

  componentDidMount() {
    console.log('did');
  }

  static getDerivedStateFromProps(props, state) {
    console.log(`user: ${props.user}  and state is ${state}`)
    if (state.once && props.user) {
      return {
        ...state,
        once: false,
        ...props.user,
      };
    }
    return null;
  }

  onChangeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChangeTypehead = (selected, key) => {
    if (selected && selected.length && selected[0].id) {
      this.setState({
        [key]: selected[0].id,
      });
    } else {
      this.setState({
        [key]: null,
      });
    }
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    let userObject = { ...this.state };
    userObject.role = paramCase(userObject.role);
    delete userObject.roles;
    delete userObject.password;
    this.props['editUser'](userObject);
  };

  render() {
    const {classes}=this.props;
    let defaultStatus = this.state.statuses.filter((o) => {
      return o.id === this.state.status || o.label === this.state.status;
    });
    let defaultRole = this.state.roles.filter((o) => {
      return o.label === this.state.role;
    });
    console.log('defaultStatus', defaultStatus);
    return (
      <>
        <article>
          <Helmet>
            <title>Add User</title>
            <meta
              name='description'
              content='A React.js Boilerplate application homepage'
            />
          </Helmet>
        </article>
        <Header />
        <main>
          <div className='dash-wrapper'>
            <div className='row dash-add-cfg center-div'>
              <div className='row'>
                <h5
                  style={{ marginLeft: -20, fontWeight: 700, color: '#6A6A6A' }}
                >
                  <i className='fas fa-user' /> Edit {this.state.first_name}
                </h5>
              </div>
              <div className='row form-container'>
                <div className='dash_form'>
                  <form onSubmit={this.onFormSubmit}>
                    <div className='mb-4'>
                     
                       <TextField
                      className={classes.w_100}
                      id='username'
                      variant='filled'
                      label='Username'
                      name='user_name'
                      required
                      onChange={this.onChangeValue}
                     
                    />
                    </div>
                    <div className='mb-4'>
                     
                       <TextField
                      className={classes.w_100}
                      id='first_name'
                      variant='filled'
                      label='Name'
                      name='first_name'
                      required
                      onChange={this.onChangeValue}
                     
                    />
                    </div>
                    <div className='mb-4'>
                    <TextField
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
                    <div className='mb-4'>
                    <TextField
                      className={classes.w_100}
                      id='phone'
                      variant='filled'
                      label='Telephone'
                      name='phone'
                      type='number'
                      required
                      onChange={this.onChangeValue}
                     
                    />
                    </div>
                    <div className='mb-4'>
                    <InputLabel htmlFor="role">Role</InputLabel>
                           <Select
                           native
                            onChange={(selected) => {this.onChangeTypehead(selected, 'role');}}
                           className={classes.w_100}
                           inputProps={{id:"role"}}
                              >
          <option aria-label="None" value="" />
          {this.state.roles.map((r)=>{
           return <option id={r.id} value={r.label}>{r.label}</option>
          })}
         
        </Select>
                    </div>
                    <div className='mb-4'>
                    <InputLabel htmlFor="role">Group</InputLabel>
                           <Select
                           native
                            onChange={(selected) => {this.onChangeTypehead(selected, 'group');}}
                           className={classes.w_100}
                           inputProps={{id:"role"}}
                              >
          
          <option aria-label="None" value="" />
          {this.state.roles.map((r)=>{
           return <option id={r.id} value={r.label}>{r.label}</option>
          })}
         
        </Select>
                    </div>
                    <div className='mb-4'>
                    <InputLabel htmlFor="role">Status</InputLabel>
                           <Select
                           native
                            onChange={(selected) => {this.onChangeTypehead(selected, 'status');}}
                           className={classes.w_100}
                           inputProps={{id:"role"}}
                              >
          
          <option aria-label="None" value="" />
          {this.state.roles.map((r)=>{
           return <option id={r.id} value={r.label}>{r.label}</option>
          })}
         
        </Select>
                    </div>
                    <div className='d-block' style={{ textAlign: 'center' }}>
                      <button
                        type='submit'
                        className='button primary_button'
                        style={{ marginRight: 10 }}
                      >
                        <div className='d-flex align-items-center justify-content-center'>
                          <img src={save} />
                          <span style={{ marginLeft: 5 }}>Save</span>
                        </div>
                      </button>
                      <button
                        type='button'
                        className='button secondary_button mw-50'
                      >
                        <div className='d-flex align-items-center justify-content-center'>
                          <img src={cancel} />
                          <span style={{ marginLeft: 5 }}>Cancel</span>
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

function mapPropsToState(store) {
  console.log('store.users', store);
  return {
    user: _.get(store.router, 'location.state.user', []),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (params) => dispatch(editUser(params)),
    push: (param) => dispatch(push(param)),
  };
};


export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(EditUser));