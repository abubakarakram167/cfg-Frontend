import React, {Component} from 'react';
import {Helmet} from 'react-helmet-async';
import Header from '../../../components/Header';
import {
  getAllUsers,
  changeUsersStatus,
} from '../../../store/actions/users.actions';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import history from '../../../utils/history';
import {Editor} from 'react-draft-wysiwyg';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Typeahead} from 'react-bootstrap-typeahead';
import {screensConfig} from './addConfig';
import _ from 'lodash';
import {stateToHTML} from 'draft-js-export-html';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {editHead} from '../../../store/actions/dynamic.actions';

class UserManagement extends Component {
  constructor(props) {
    super(props);
    let detail = '';
    this.state = {
      once: true,
      username: '',
      name: '',
      email: '',
      role: '',
      telephone: '',
      group: '',
      editorState: EditorState.createWithText(detail),
      detail: '',
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
      content: {},
      tage: [],
      keywords: [],
      groups: [],
      categories: [],
    };
  }

  componentDidMount() {
    if (!screensConfig[this.props.pathname] || !this.props.content) {
      history.push('/dashboard');
    }
    this.setState({pageContext: screensConfig[this.props.pathname]});
  }

  static getDerivedStateFromProps(props, state) {
    if (state.once && props.content) {
      let editorState;
      if (props.content.detail) {
        let contentBlock = htmlToDraft(`<p>${props.content.detail}</p>`);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks,
          );
          editorState = EditorState.createWithContent(contentState);
        }
      }
      let stateObject = {
        ...state,
        once: false,
        // content: {...props.content},
        ...props.content,
      };
      if (editorState) {
        stateObject.editorState = editorState;
      }
      return stateObject;
    }
    return null;
  }

  onChangeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    // let arrayOfTags = [];
    // if (this.state.categories && this.state.categories.length) {
    //     for (let elem of this.state.categories) {
    //         if (elem.id && ~elem.indexOf('new')) {
    //             arrayOfTags.push({
    //                 text: elem.label,
    //                 tagType: "category"
    //             })
    //         } else {
    //             arrayOfTags.push({
    //                 id: elem.id,
    //                 text: elem.label,
    //                 tagType: "category"
    //             })
    //         }
    //      }
    // }
    // if (this.state.groups && this.state.groups.length) {
    //     for (let elem of this.state.groups) {
    //         if (elem.id && ~elem.indexOf('new')) {
    //             arrayOfTags.push({
    //                 text: elem.label,
    //                 tagType: "group"
    //             })
    //         } else {
    //             arrayOfTags.push({
    //                 id: elem.id,
    //                 text: elem.label,
    //                 tagType: "keywords"
    //             })
    //         }
    //     }
    // }
    // if (this.state.keywords && this.state.keywords.length) {
    //     for (let elem of this.state.keywords) {
    //         if (elem.id && ~elem.indexOf('new')) {
    //             arrayOfTags.push({
    //                 text: elem.label,
    //                 tagType: "category"
    //             })
    //         } else {
    //             arrayOfTags.push({
    //                 id: elem.id,
    //                 text: elem.label,
    //                 tagType: "category"
    //             })
    //         }
    //     }
    // }
    this.props['editHead'](this.props.pathname, {...this.state});
  };

  onEditorStateChange = (editorState) => {
    console.log(
      'style',
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    );
    console.log('convertFromHTML', editorState.getCurrentInlineStyle());
    // console.log("convertFromHTML", editorState.getCurrentContent().getPlainText())
    console.log(
      'object',
      convertFromRaw(convertToRaw(editorState.getCurrentContent())),
    );
    this.setState({
      editorState,
      detail: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };

  onChangeTypehead = (selected, key) => {
    console.log('selected', selected);
    if (selected && selected.length && selected[0].id) {
      this.setState({
        [key]: selected,
      });
    } else {
      this.setState({
        [key]: [],
      });
    }
  };

  render() {
    console.log('state', this.state);
    return (
      <>
        <article>
          <Helmet>
            {/*<title>Add {screens[this.props.pathname]}</title>*/}
            <meta
              name='description'
              content='A React.js Boilerplate application homepage'
            />
          </Helmet>
        </article>
        <Header />
        <main>
          <div className='dash-wrapper'>
            <div className='row dash-session-header'>
              <div className='col-md-8'>
                <div className='session-title'>
                  {_.get(this.state, 'title', '')}
                </div>
                <div className='session-sub-title'>
                  {_.get(this.state, 'sub_title', '')}
                </div>
              </div>
              <div className='col-md-4' style={{textAlign: 'right'}}>
                <button className='button-title button_inline'>
                  <i className='fas fa-eye' /> preview
                </button>
                <div className='btn-group'>
                  <button
                    onClick={this.onFormSubmit}
                    type='button'
                    className='btn btn-danger'
                    style={{
                      borderTopLeftRadius: '25px',
                      borderBottomLeftRadius: '25px',
                      padding: '10px 0',
                      paddingLeft: '25px',
                      paddingRight: '5px',
                    }}>
                    <i className='fas fa-upload' /> Publish
                  </button>
                  <button
                    type='button'
                    className='btn btn-danger dropdown-toggle dropdown-toggle-split'
                    style={{
                      paddingRight: '25px',
                      borderBottomRightRadius: '25px',
                      borderTopRightRadius: '25px',
                      // padding: "10px 0",
                      paddingLeft: '25px',
                      borderLeft: '1px solid white',
                    }}
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'>
                    <span className='sr-only'>Toggle Dropdown</span>
                  </button>
                  <div className='dropdown-menu'>
                    <a className='dropdown-item' href='#'>
                      Action
                    </a>
                    <a className='dropdown-item' href='#'>
                      Another action
                    </a>
                    <a className='dropdown-item' href='#'>
                      Something else here
                    </a>
                    <div className='dropdown-divider' />
                    <a className='dropdown-item' href='#'>
                      Separated link
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div
                  className='btn-group'
                  role='group'
                  aria-label='First group'></div>
              </div>
            </div>
            <div className='row' style={{marginTop: '20px'}}>
              <div className='col-md-9' style={{position: 'relative'}}>
                {/*<div className="editor-floating-buttons">*/}
                {/*    <button className="button_inline"><i className="fas fa-angle-left"/> Prev*/}
                {/*    </button>*/}
                {/*    <button className="button_inline"><i className="fas fa-home"/> Complete</button>*/}
                {/*</div>*/}
                <Editor
                  editorState={this.state.editorState}
                  // defaultEditorState = {defaultState}
                  toolbarClassName='toolbarClassName'
                  wrapperClassName='wrapperClassName'
                  editorClassName='editorClassName'
                  onEditorStateChange={this.onEditorStateChange}
                />
              </div>
              <div className='col-md-3'>
                <div className='dash_form_right'>
                  <form onSubmit={this.onFormSubmit}>
                    <div className='mb-4'>
                      <span>Categories *</span>
                      <Typeahead
                        disabled={true}
                        allowNew
                        id='custom-selections-example'
                        multiple
                        newSelectionPrefix='Add a new category: '
                        options={[]}
                        placeholder='Categories *'
                        onChange={(selected) => {
                          this.onChangeTypehead(selected, 'categories');
                        }}
                      />
                    </div>
                    <div className='mb-4'>
                      <span>Apply to Group(s)*</span>
                      <Typeahead
                        disabled={true}
                        allowNew
                        id='custom-selections-example'
                        multiple
                        newSelectionPrefix='Add a new Group: '
                        options={[]}
                        placeholder='Groups *'
                        onChange={(selected) => {
                          this.onChangeTypehead(selected, 'groups');
                        }}
                      />
                    </div>
                    <div className='mb-4'>
                      <span>Keywords</span>
                      <Typeahead
                        disabled={true}
                        allowNew
                        id='custom-selections-example'
                        multiple
                        newSelectionPrefix='Add a new Keyword: '
                        options={[]}
                        placeholder='Keywords'
                        onChange={(selected) => {
                          this.onChangeTypehead(selected, 'keywords');
                        }}
                      />
                    </div>

                    <div className='mb-4'>
                      <span>Publish Date</span>
                      <input
                        type='text'
                        name='startDate'
                        placeholder='01/01/2021'
                        value={_.get(this.state, 'start_date', 0)}
                        onChange={this.onChangeValue}
                        required
                      />
                    </div>
                    <div className='mb-4'>
                      <label>End Date</label>

                      <select
                        placeholder='Draft'
                        value={this.state.status}
                        name={'status'}
                        onChange={this.onChangeValue}>
                        <option value={'draft'}>Draft</option>
                        <option value={'published'}>Publish</option>
                      </select>
                    </div>
                    <div className='mb-4'>
                      <label>Total Points</label>
                      <input
                        type='text'
                        name='total_points'
                        placeholder='Total Points*'
                        value={_.get(this.state, 'total_points', 0)}
                        onChange={this.onChangeValue}
                        required
                      />
                    </div>
                    <span>
                      Feature Image{' '}
                      <i
                        className={'fas fa-plus-circle'}
                        style={{color: 'red'}}></i>
                    </span>
                    <div className={'featured-img-container'}>
                      <img
                        src={'/images/member-1.png'}
                        style={{width: '150px'}}
                      />
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
    content: _.get(store.router, 'location.state.content', undefined),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeUsersStatus: (type, users) =>
      dispatch(changeUsersStatus(type, users)),
    getAllUsers: (params) => dispatch(getAllUsers(params)),
    editHead: (string, data) => dispatch(editHead(string, data)),
    push: (param) => dispatch(push(param)),
  };
};
export default connect(mapPropsToState, mapDispatchToProps)(UserManagement);
