import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../../components/Header';
import { addUser } from '../../../store/actions/users.actions';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import save from '../../../components/common/assets/icons/save.svg';
import cancel from '../../../components/common/assets/icons/x-circle.svg';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  componentDidMount() {}

  onChangeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChangeTypehead = (selected, key) => {
    selected &&
      this.setState({
        [key]: selected[0].id,
      });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    let userObject = { ...this.state };
    delete userObject.roles;
    this.props['addUser'](userObject);
  };

  render() {
    console.log(this.state);
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
                  <i className='fas fa-user' /> Add New User{' '}
                </h5>
              </div>
              <div className='row form-container '>
                <div className='dash_form'>
                  <form onSubmit={this.onFormSubmit}>
                    <div className='mb-4'>
                      <label>Username</label>
                      <input
                        type='text'
                        name='user_name'
                        placeholder='Username*'
                        required
                        onChange={this.onChangeValue}
                      />
                    </div>
                    <div className='mb-4'>
                      <label>Name</label>
                      <input
                        type='text'
                        name='first_name'
                        placeholder='Name*'
                        onChange={this.onChangeValue}
                        required
                      />
                    </div>
                    <div className='mb-4'>
                      <label>Email</label>
                      <input
                        type='email'
                        name='email'
                        placeholder='Email*'
                        onChange={this.onChangeValue}
                        required
                      />
                    </div>
                    <div className='mb-4'>
                      <label>Telephone</label>
                      <input
                        type='number'
                        name='phone'
                        placeholder='Telephone'
                        onChange={this.onChangeValue}
                      />
                    </div>
                    <div className='mb-4'>
                      <label>Role</label>
                      <div className='mb-4'>
                        <label>Role*</label>
                        <Typeahead
                          allowNew
                          id='custom-selections-example'
                          // multiple
                          onChange={(selected) => {
                            this.onChangeTypehead(selected, 'role');
                          }}
                          newSelectionPrefix='Add a new category: '
                          options={this.state.roles}
                          placeholder='Role*'
                        />
                      </div>
                    </div>
                    <div className='mb-4'>
                      <label>Group</label>
                      <div className='mb-4'>
                        <label>Group*</label>
                        <Typeahead
                          //   disabled={true}
                          allowNew
                          id='custom-selections-example'
                          onChange={(selected) => {
                            this.onChangeTypehead(selected, 'group');
                          }}
                          // multiple
                          newSelectionPrefix='Add a new category: '
                          options={this.state.roles}
                          placeholder='Group*'
                        />
                      </div>
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
  console.log('store.users', store.users);
  return {
    users: store.users.users,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (params) => dispatch(addUser(params)),
    push: (param) => dispatch(push(param)),
  };
};
export default connect(mapPropsToState, mapDispatchToProps)(AddUser);
