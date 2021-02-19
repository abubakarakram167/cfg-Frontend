import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../../components/Header';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { screensConfig } from './addConfig';
import { Typeahead } from 'react-bootstrap-typeahead';
import history from '../../../utils/history';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { addHead } from '../../../store/actions/dynamic.actions';
import save from '../../../components/common/assets/icons/save.svg';
import cancel from '../../../components/common/assets/icons/x-circle.svg';

class UserManagement extends Component {
  state = {
    username: '',
    name: '',
    email: '',
    role: '',
    telephone: '',
    group: '',
    author: '',
    startDate: '',
    endDate: '',
    points: '',
    category: '',
    status: '',
    quizSuccess: '',
    quizFail: '',
    startDatePlaceHolder: true,
    endDatePlaceHolder: true,
    pageContext: {
      title: '',
      fields: {
        name: true,
        author: true,
        startDate: true,
        endDate: true,
        points: true,
        category: true,
        group: true,
        status: true,
        quizSuccess: true,
        quizFail: true,
      },
    },
  };

  componentDidMount() {
    if (!screensConfig[this.props.pathname]) {
      history.push('/dashboard');
    }
    this.setState({ pageContext: screensConfig[this.props.pathname] });
  }

  onChangeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    this.props['addHead'](this.props.pathname, { ...this.state });
  };

  render() {
    const { startDatePlaceHolder, endDatePlaceHolder } = this.state;
    let { first_name, email } = JSON.parse(localStorage.getItem('user'));
    return (
      <>
        <article>
          <Helmet>
            <title>
              Add {this.state.pageContext && this.state.pageContext.title}
            </title>
            <meta
              name='description'
              content='A React.js Boilerplate application homepage'
            />
          </Helmet>
        </article>
        <Header />
        <main>
          <div className='dash-wrapper'>
            <div className='row dash-add-cfg' style={{ margin: '0 auto' }}>
              <div className='row'>
                <h5
                  style={{ marginLeft: -20, fontWeight: 700, color: '#6A6A6A' }}
                >
                  <i className='fas fa-user' /> Add{' '}
                  {this.state.pageContext && this.state.pageContext.title}{' '}
                </h5>
              </div>
              <div className='row form-container '>
                <div className='dash_form'>
                  <form onSubmit={this.onFormSubmit}>
                    {this.state.pageContext.fields.name && (
                      <div className='mb-4'>
                        <label>Name</label>
                        <input
                          type='text'
                          name='title'
                          placeholder='Name*'
                          onChange={this.onChangeValue}
                          required
                        />
                      </div>
                    )}
                    {this.state.pageContext.fields.author && (
                      <div className='mb-4'>
                        <label>Author</label>
                        <input
                          type='text'
                          name='author'
                          placeholder='Author*'
                          value={first_name || email}
                          readOnly
                        />
                      </div>
                    )}
                    {this.state.pageContext.fields.startDate && (
                      <div className='mb-4'>
                        <label>Start Date</label>
                        <input
                          type={startDatePlaceHolder ? 'text' : 'date'}
                          name='start_date'
                          placeholder='Start Date*'
                          onChange={this.onChangeValue}
                          onFocus={() => {
                            this.setState({ startDatePlaceHolder: false });
                          }}
                          required
                        />
                      </div>
                    )}
                    {this.state.pageContext.fields.endDate && (
                      <div className='mb-4'>
                        <label>End Date</label>
                        <input
                          type={endDatePlaceHolder ? 'text' : 'date'}
                          name='end_date'
                          placeholder='End Date*'
                          onFocus={() => {
                            this.setState({ endDatePlaceHolder: false });
                          }}
                          onChange={this.onChangeValue}
                          required
                        />
                      </div>
                    )}
                    {this.state.pageContext.fields.points && (
                      <div className='mb-4'>
                        <label>Total Points</label>
                        <input
                          type='number'
                          name='total_points'
                          placeholder='Total Points*'
                          onChange={this.onChangeValue}
                          required
                        />
                      </div>
                    )}
                    {this.state.pageContext.fields.category && (
                      <div className='mb-4'>
                        <label>Categories *</label>
                        <Typeahead
                          disabled
                          allowNew
                          id='custom-selections-example'
                          multiple
                          newSelectionPrefix='Add a new category: '
                          options={[]}
                          placeholder='Categories *'
                          name='category'
                          onChange={this.onChangeValue}
                        />
                      </div>
                    )}
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
                        <div
                          onClick={() => {
                            history.push(`/listing/${this.props.pathname}`);
                          }}
                          className='d-flex align-items-center justify-content-center'
                        >
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
  let pathname;
  if (store.router && store.router.location && store.router.location.pathname) {
    pathname = store.router.location.pathname;
    if (~pathname.indexOf('/')) {
      pathname = pathname.split('/');
      pathname = pathname[pathname.length - 1];
    }
  }
  return {
    pathname,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addHead: (string, data) => dispatch(addHead(string, data)),
    push: (param) => dispatch(push(param)),
  };
};
export default connect(mapPropsToState, mapDispatchToProps)(UserManagement);
