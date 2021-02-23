import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../../components/Header';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { screensConfig } from './addConfig';
import { Typeahead } from 'react-bootstrap-typeahead';
import history from '../../../utils/history';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { editHead } from '../../../store/actions/dynamic.actions';
import _ from 'lodash';
import save from '../../../components/common/assets/icons/save.svg';
import cancel from '../../../components/common/assets/icons/x-circle.svg';
import { withStyles } from "@material-ui/core/styles";
import { TextField, IconButton, InputAdornment,InputLabel,Select } from "@material-ui/core";

const useStyles = (theme) => ({
 
  w_100: {
    width: "100%",
  },
  
});

class MultipleEditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      once: true,
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
      total_points: '',
      category: '',
      categories:[],
      status: '',
      quizSuccess: '',
      quizFail: '',
      start_date: '',
      end_date: '',
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
      head: {},
    };
  }

  componentDidMount() {
    if (!screensConfig[this.props.pathname]) {
      history.push('/dashboard');
    }
    this.setState({ pageContext: screensConfig[this.props.pathname] });
  }

  static getDerivedStateFromProps(props, state) {
    if (state.once && props.head) {
      return {
        ...state,
        once: false,
        ...props.head,
      };
    }
    return null;
  }

  onChangeValue = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    this.props['editHead'](this.props.pathname, { ...this.state });
  };

  render() {
    const { classes } = this.props;
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
                  <i className='fas fa-user' /> Edit{' '}
                  {this.state.pageContext && this.state.pageContext.title}{' '}
                </h5>
              </div>
              <div className='row form-container '>
                <div className='dash_form'>
                  <form onSubmit={this.onFormSubmit}>
                    {this.state.pageContext.fields.name && (
                      <div className='mb-4'>
                       
                        <TextField
                      className={classes.w_100}
                      id='name'
                      variant='filled'
                      label='Name'
                      name='title'
                      value={this.state.title}
                      required
                      onChange={this.onChangeValue}
                     
                    />
                      </div>
                    )}
                    {this.state.pageContext.fields.author && (
                      <div className='mb-4'>
                        

                      <TextField
                      className={classes.w_100}
                      id='author'
                      variant='filled'
                      label='Author'
                      name='author'
                      value={first_name || email}
                      InputProps={{
                        readOnly: true,
                      }}
                      
                    />
                      </div>
                    )}
                    {this.state.pageContext.fields.startDate && (
                      <div className='mb-4'>
                        {/* <label>Start Date</label>
                        <input
                          type='date'
                          name='start_date'
                          placeholder='Start Date*'
                          value={this.state.start_date}
                          onChange={this.onChangeValue}
                          required
                        /> */}
                        <TextField
        id="start_date"
        label="Start Date"
        type='date'
        // defaultValue="2017-05-24"
        name='start_date'
        onChange={this.onChangeValue}
        className={classes.w_100}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
                      </div>
                    )}
                    {this.state.pageContext.fields.endDate && (
                      <div className='mb-4'>
                       <TextField
        id="end_date"
        label="End Date"
        type='date'
        // defaultValue="2017-05-24"
        name='end_date'
        onChange={this.onChangeValue}
        className={classes.w_100}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
                      </div>
                    )}
                    {this.state.pageContext.fields.points && (
                      <div className='mb-4'>
                        
                         <TextField
                      className={classes.w_100}
                      id='totalpoint'
                      variant='filled'
                      label='Total Points'
                      name='total_points'
                      type='number'
                      value={this.state.total_points}
                      required
                      onChange={this.onChangeValue}
                     
                    />
                      </div>
                    )}
                    {this.state.pageContext.fields.category && (
                      <div className='mb-4'>
                      


<InputLabel htmlFor="categories">Categories</InputLabel>
                           <Select
                           native
                           onChange={this.onChangeValue}
                           className={classes.w_100}
                           inputProps={{id:"categories"}}
                           name='category'
                              >
          
          <option aria-label="None" value="" />
          {this.state.categories.map((r)=>{
           return <option id={r.id} value={r.label}>{r.label}</option>
          })}
         
        </Select>

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
    head: _.get(store.router, 'location.state.head', undefined),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    editHead: (string, data) => dispatch(editHead(string, data)),
    push: (param) => dispatch(push(param)),
  };
};
// export default connect(mapPropsToState, mapDispatchToProps)(MultipleEditScreen);
export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(MultipleEditScreen));
