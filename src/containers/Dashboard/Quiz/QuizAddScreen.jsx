import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../../components/Header';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { screensConfig } from '../MultipleAddScreen/addConfig';
import { Typeahead } from 'react-bootstrap-typeahead';
import history from '../../../utils/history';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { addQuizHead } from '../../../store/actions/quiz.actions';
import save from '../../../components/common/assets/icons/save.svg';
import cancel from '../../../components/common/assets/icons/x-circle.svg';
import { withStyles } from "@material-ui/core/styles";
import { TextField, IconButton, InputAdornment, InputLabel, Select } from "@material-ui/core";

const useStyles = (theme) => ({

  w_100: {
    width: "100%",
  },

});

class UserManagement extends Component {
  state = {
    username: '',
    name: '',
    email: '',
    role: '',
    telephone: '',
    group: '',
    author: '',
    publish_date: '',
    expiry_date: '',
    points: '',
    category: '1',
    categories: [],
    status: '',
    quizSuccess: '',
    quizFail: '',
    startDatePlaceHolder: true,
    endDatePlaceHolder: true,
    created_at: new Date(),
    updated_at: new Date,
  };

  componentDidMount() {
    let {id , email} = JSON.parse(localStorage.getItem('user'))
    email = email.split('@')[0];
    this.setState({
      author: email,
      created_by: id
    });
  }

  onChangeValue = (e) => {

    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onFormSubmit = (e) => {
    e.preventDefault();

    this.props['addQuizHead']({ ...this.state });
    console.log(this.state)
  };

  render() {
    //console.log(this.state)
    const { classes } = this.props;
    const { startDatePlaceHolder, endDatePlaceHolder } = this.state;
    let { first_name, email } = JSON.parse(localStorage.getItem('user'));
    return (
      <>
        <article>
          <Helmet>
            <title>
              Add Quiz
            </title>
            <meta
              name='description'
              content='Add Quiz Form'
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
                  Quiz{' '}
                </h5>
              </div>
              <div style = {{ overflowY: "scroll", height: 600 }} className='row form-container '>
                <div style = {{ textAlign: "center" }} >
                  <img style = {{ width: 400, height: 350 }} src= {'/images/CFG logo 2015.png'} />
                </div>
                <div style  ={{ textAlign: 'end' }} >
                  <button style = {{ position: "relative", bottom: 50, right: 30, padding: 10,paddingTop: 7,paddingBottom:7, borderRadius:7, borderWidth: 1, borderColor: "darkgray", color: '#4c4343' }} >
                  <i className='fas fa-camera' />  Edit Photo
                  </button>
                </div>  
                <div className='dash_form'>
                  <form onSubmit={this.onFormSubmit}> 
                      <div className='mb-4'>
                        <TextField
                          className={classes.w_100}
                          id='name'
                          variant='filled'
                          label='Name'
                          name='quiz_name'

                          required
                          onChange={this.onChangeValue}

                        />
                      </div>
                    
                    
                      <div className='mb-4'>
                        {/* <label>Author</label>
                        <input
                          type='text'
                          name='author'
                          placeholder='Author*'
                          value={first_name || email}
                          readOnly
                        /> */}
                        <TextField
                          className={classes.w_100}
                          id='author'
                          variant='filled'
                          label='Author'
                          value={this.state.author}
                          name='author'
                          InputProps={{
                            readOnly: true,
                          }}



                        />
                      </div>
                    
                    
                      <div className='mb-4'>
                        {/* <label>Start Date</label>
                        <input
                          type={startDatePlaceHolder ? 'text' : 'date'}
                          name='start_date'
                          placeholder='Start Date*'
                          onChange={this.onChangeValue}
                          onFocus={() => {
                            this.setState({ startDatePlaceHolder: false });
                          }}
                          required
                        /> */}

                        <TextField
                          id="start_date"
                          label="Start Date"
                          type={startDatePlaceHolder ? 'text' : 'date'}
                          // defaultValue="2017-05-24"
                          name='publish_date'
                          onChange={this.onChangeValue}
                          className={classes.w_100}
                          onFocus={() => {
                            this.setState({ startDatePlaceHolder: false });
                          }}
                          required
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />


                      </div>

                      <div className='mb-4'>
                        {/* <label>End Date</label>
                        <input
                          type={endDatePlaceHolder ? 'text' : 'date'}
                          name='end_date'
                          placeholder='End Date*'
                          onFocus={() => {
                            this.setState({ endDatePlaceHolder: false });
                          }}
                          onChange={this.onChangeValue}
                          required
                        /> */}
                        <TextField
                          id="end_date"
                          label="End Date"
                          type={endDatePlaceHolder ? 'text' : 'date'}
                          // defaultValue="2017-05-24"
                          name='expiry_date'
                          onChange={this.onChangeValue}
                          className={classes.w_100}
                          onFocus={() => {
                            this.setState({ endDatePlaceHolder: false });
                          }}
                          required
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>

                        
                      <div className='mb-4'>
                        

                        
                        <TextField
                          className={classes.w_100}
                          id='success_page'
                          variant='filled'
                          label='Success Page'
                          name='success_navigate_page'

                          required
                          onChange={this.onChangeValue}

                        />


                      </div><div className='mb-4'>
                        

                        <TextField
                          id="failure_page"
                          label="Failure Page"
                          variant='filled'
                          name='fail_navigate_page'
                          onChange={this.onChangeValue}
                          className={classes.w_100}
                          
                          required
                          
                        />


                      </div>


                    
                      
                   
                    
                      <div className='mb-4'>
                        {/* <label>Total Points</label>
                        <input
                          type='number'
                          name='total_points'
                          placeholder='Total Points*'
                          onChange={this.onChangeValue}
                          required
                        /> */}
                        <TextField
                          className={classes.w_100}
                          id='totalpoint'
                          variant='filled'
                          label='Total Points'
                          name='total_points'
                          type='number'

                          required
                          onChange={this.onChangeValue}

                        />
                      </div>
                    
                   
                      <div className='mb-4'>
                        {/* <label>Categories *</label>
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
                        /> */}
                        <InputLabel htmlFor="categories">Categories</InputLabel>
                        <Select
                          native
                          onChange={this.onChangeValue}
                          className={classes.w_100}
                          inputProps={{ id: "categories" }}
                          name='category'
                        >

                          <option aria-label="None" value="" />
                          {this.state.categories.map((r) => {
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
    addQuizHead: (data) => dispatch(addQuizHead(data)),
    push: (param) => dispatch(push(param)),
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(UserManagement));


