import React, {Component} from 'react';
import {Helmet} from 'react-helmet-async';
import Header from "../../../components/Header";
import {getAllUsers, changeUsersStatus} from '../../../store/actions/users.actions'
import {push} from 'connected-react-router';
import {connect} from "react-redux";
import history from "../../../utils/history";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Typeahead} from "react-bootstrap-typeahead";
import {screensConfig} from "./addConfig";
import _ from "lodash";
import { stateToHTML } from "draft-js-export-html";

class UserManagement extends Component {
    state = {
        once: true,
        username: "",
        name: "",
        email: "",
        role: "",
        telephone: "",
        group: "",
        editorState: EditorState.createWithText(_.get(this.props, 'content.detail', '')),
        pageContext: {
            title: "",
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
                quizFail: true
            }
        },
        content: {},
    }

    componentDidMount() {
        if (!screensConfig[this.props.pathname] || !this.props.content) {
            history.push('/dashboard');
        }
        this.setState({pageContext: screensConfig[this.props.pathname]});
    }

    static getDerivedStateFromProps(props, state) {
        if (state.once  && props.content) {
            return {
                ...state,
                once: false,
                content: {...props.content}
            };
        }
        return null;
    }

    onChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onFormSubmit = (e) => {
        e.preventDefault();
    }

    onEditorStateChange = (editorState) => {
        console.log("convertFromHTML", editorState.getCurrentContent().getPlainText())
        console.log("convertFromHTML", convertFromRaw(convertToRaw(editorState.getCurrentContent())))
        this.setState({
            editorState,
            editorContentHtml: stateToHTML(editorState.getCurrentContent()),
        });
    };

    render() {
        console.log('state', this.state)
        return (
            <>
                <article>
                    <Helmet>
                        {/*<title>Add {screens[this.props.pathname]}</title>*/}
                        <meta
                            name="description"
                            content="A React.js Boilerplate application homepage"
                        />
                    </Helmet>
                </article>
                <Header/>
                <main>
                    <div className="dash-wrapper">
                        <div className="row dash-session-header">
                            <div className="col-md-8">
                                <div className="session-title">{_.get(this.state, 'content.title', '')}</div>
                                <div className="session-sub-title">{_.get(this.state, 'content.sub_title', '')}</div>
                            </div>
                            <div className="col-md-4" style={{textAlign: "right"}}>
                                <button className="button-title button_inline"><i className="fas fa-eye"/> preview
                                </button>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-danger"
                                            style={{
                                                borderTopLeftRadius: "25px",
                                                borderBottomLeftRadius: "25px",
                                                padding: "10px 0",
                                                paddingLeft: "25px",
                                                paddingRight: "5px"
                                            }}>
                                        <i className="fas fa-upload"/> Publish
                                    </button>
                                    <button type="button"
                                            className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                                            style={{
                                                paddingRight: "25px",
                                                borderBottomRightRadius: "25px",
                                                borderTopRightRadius: "25px",
                                                // padding: "10px 0",
                                                paddingLeft: "25px",
                                                borderLeft: "1px solid white"
                                            }}
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                        <div className="dropdown-divider"/>
                                        <a className="dropdown-item" href="#">Separated link</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="btn-group" role="group" aria-label="First group">
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: "20px"}}>
                            <div className="col-md-9" style={{position: "relative"}}>
                                <div className="editor-floating-buttons">
                                    <button className="button_inline"><i className="fas fa-angle-left"/> Prev
                                    </button>
                                    <button className="button_inline"><i className="fas fa-home"/> Complete</button>
                                </div>
                                <Editor
                                    editorState={this.state.editorState}
                                    // defaultEditorState = {defaultState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <div className="dash_form_right">
                                    <form onSubmit={this.onFormSubmit}>
                                        <div className="mb-4">
                                            <span>Categories *</span>
                                            <Typeahead
                                                allowNew
                                                id="custom-selections-example"
                                                multiple
                                                newSelectionPrefix="Add a new category: "
                                                options={[]}
                                                placeholder="Categories *"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <span>Apply to Group(s)*</span>
                                            <Typeahead
                                                allowNew
                                                id="custom-selections-example"
                                                multiple
                                                newSelectionPrefix="Add a new Group: "
                                                options={[]}
                                                placeholder="Groups *"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <span>Keywords</span>
                                            <Typeahead
                                                allowNew
                                                id="custom-selections-example"
                                                multiple
                                                newSelectionPrefix="Add a new Keyword: "
                                                options={[]}
                                                placeholder="Keywords"
                                            />
                                        </div>

                                       <div className="mb-4">
                                            <span>Publish Date</span>
                                            <input type="text" name="startDate" placeholder="01/01/2021"
                                                   value={_.get(this.state, 'content.start_date', 0)}
                                                   onChange={this.onChangeValue} required/>
                                        </div>
                                        <div className="mb-4">
                                            <label>End Date</label>

                                            <select placeholder="Draft"
                                                   onChange={this.onChangeValue} >
                                                <option>Draft</option>
                                                <option>Publish</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label>Total Points</label>
                                            <input type="text" name="totalPoints" placeholder="Total Points*" value={_.get(this.state, 'content.total_points', 0)}
                                                   onChange={this.onChangeValue} required/>
                                        </div>
                                        <span>Feature Image <i className={'fas fa-plus-circle'} style={{color:'red'}}></i></span>
                                        <div className={'featured-img-container'}>
                                            <img src={'/images/member-1.png'} style={{width: '150px'}}/>

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
    console.log("store.users", store)
    let pathname;
    if (store.router && store.router.location && store.router.location.pathname) {
        pathname = store.router.location.pathname
        if (~pathname.indexOf('/')) {
            pathname = pathname.split('/');
            pathname = pathname[pathname.length - 1];
        }
    }
    return {
        pathname,
        content: _.get(store.router, 'location.state.content', undefined),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeUsersStatus: (type, users) => dispatch(changeUsersStatus(type, users)),
        getAllUsers: (params) => dispatch(getAllUsers(params)),
        push: (param) => dispatch(push(param)),
    };
};
export default connect(mapPropsToState, mapDispatchToProps)(UserManagement);
