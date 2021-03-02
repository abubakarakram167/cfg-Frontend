import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { push } from 'connected-react-router';
import { connect } from "react-redux";
import { Editor } from 'react-draft-wysiwyg';
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import _ from "lodash";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Link } from 'react-router-dom';
import Header from "../../../components/Header";
import { getAllUsers, changeUsersStatus } from '../../../store/actions/users.actions'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { editHead } from "../../../store/actions/dynamic.actions";
import { screensConfig } from '../MultipleAddScreen/addConfig';
import axiosInstance from '../../../utils/axios';
import history from "../../../utils/history";
import { StylesProvider } from '@material-ui/core';
import './customToolbarOptions.css';

// console.log("the custom", JSON.parse(customToolbarOptions))
class SessionContentScreen extends Component {
    constructor(props) {
        super(props);
        let detail = '';
        this.state = {
            once: true,
            username: "",
            name: "",
            email: "",
            role: "",
            telephone: "",
            group: "",
            editorState: EditorState.createWithText(detail),
            detail: "",
            title: "",
            subTitle: "",
            startDate: "",
            endDate: "",
            totalPoints: "",
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
            tage: [],
            keywords: [],
            groups: [],
            categories: [],
            show: false
        }
    }

    componentDidMount() {
      if (screensConfig[this.props.pathname] === null || this.props.content === null) {
        history.push('/dashboard');
      }
      this.setState({pageContext: screensConfig[this.props.pathname], show: true});
      this.setState({ title: '', subTitle: '', detail: ''});
    }

    componentDidUpdate() {
        const getInfo = JSON.parse(localStorage.getItem('content'));
        if(this.state.show && getInfo !== null) {
            this.setState({ 
                title: getInfo?.title,
                subTitle: getInfo?.sub_title,
                detail: getInfo?.detail,
                startDate: getInfo?.start_date,
                endDate: getInfo?.end_date,
                totalPoints: getInfo?.total_points,
                status: getInfo?.status,
                show: false
            });
        }
    }
    static getDerivedStateFromProps(props, state) {
        const getInfo = JSON.parse(localStorage.getItem('content'));

        if (state.once && getInfo) {
            let editorState;
            if (getInfo.detail) {
                let contentBlock = htmlToDraft(`<p>${getInfo.detail}</p>`);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    editorState = EditorState.createWithContent(contentState);
                }
            }
            let stateObject = {
                ...state,
                once: false,
                ...getInfo
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
            [e.target.name]: e.target.value
        });
    }

    onFormSubmit = (e) => {
        const update = JSON.parse(localStorage.getItem("content"));
        const session = JSON.parse(localStorage.getItem("session"));
        const type = JSON.parse(localStorage.getItem("type"));
        console.log(type)
        e.preventDefault();
        const userData = {
            content_header_id: type === "title" ? update?.id : session?.id,
            title: this.state?.title,
            sub_title: this.state?.subTitle,
            detail: this.state?.detail,
            start_date: this.state?.startDate,
            end_date: this.state?.endDate,
            total_points: this.state?.totalPoints,
            status: this.state?.status,
            type:  type === "title" ? "subtitle" : "title"
        }
        const url = type === "title" ? "sub-title" : "title";
        // if(update !== null) {
            axiosInstance.post(`/api/content/${url}`, userData)
            .then((res) => {
                toast.success("Session created successfully");
                setTimeout(() => {
                    history.push("/content/detail/session");
                }, [3000])
            })
            .catch((err) => {
                console.log(err)
                toast.error(err?.response?.data?.message);
            })
        // } 
        // else {
        //     axiosInstance.post('/api/content/session', userData)
        //     .then((res) => {
        //         toast.success("Session created successfully");
        //         setTimeout(() => {
        //             history.push("/content/detail/session");
        //         }, [3000])
        //     })
        //     .catch((err) => {
        //         toast.error(err?.response?.data?.message);
        //     })
        // }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
            detail: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        });
    };

    onChangeTypehead = (selected, key) => {
        if (selected && selected.length && selected[0].id) {
            this.setState({
                [key]: selected
            });
        } else {
            this.setState({
                [key]: []
            });
        }
    }

    render() {
        return (
            <>
                <article>
                    <Helmet>
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
                                <div className="session-title">
                                    <input type="text" style={{ border: 'none', color: '#888484' }} onChange={this.onChangeValue} placeholder="Title" name="title" value={this.state?.title} />
                                </div>
                                <div className="session-sub-title">
                                    <input type="text" placeholder="subTitle" style={{ border: 'none', color: '#888484' }} onChange={this.onChangeValue} name="subTitle" value={this.state?.subTitle} />
                                </div>
                            </div>
                            <div className="col-md-4" style={{textAlign: "right"}}>
                                <button className="button-title button_inline"><i className="fas fa-eye"/> preview
                                </button>
                                <div className="btn-group">
                                    <button onClick={this.onFormSubmit} type="button" className="btn btn-danger"
                                      style={{
                                        borderTopLeftRadius: "25px",
                                        borderBottomLeftRadius: "25px",
                                        padding: "10px 0",
                                        paddingLeft: "25px",
                                        paddingRight: "5px"
                                      }}
                                    >
                                      <i className="fas fa-upload"/> Publish
                                    </button>
                                    <button type="button"
                                            className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                                            style={{
                                                paddingRight: "25px",
                                                borderBottomRightRadius: "25px",
                                                borderTopRightRadius: "25px",
                                                paddingLeft: "25px",
                                                borderLeft: "1px solid white"
                                            }}
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to="#">Action</Link>
                                        <Link className="dropdown-item" to="#">Another action</Link>
                                        <Link className="dropdown-item" to="#">Something else here</Link>
                                        <div className="dropdown-divider"/>
                                        <Link className="dropdown-item" to="#">Separated link</Link>
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
                            <Editor
                              editorState={this.state.editorState}
                              wrapperClassName="wrapperClassName"       
                              onEditorStateChange={this.onEditorStateChange}
                              toolbar = {{ options: ['inline', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'remove'] }}
                            />
                          </div>
                            <div className="col-md-3">
                              <div className="dash_form_right">
                                  <form onSubmit={this.onFormSubmit}>
                                      <div className="mb-4">
                                          <span>Categories *</span>
                                          <Typeahead
                                              disabled={true}
                                              allowNew
                                              id="custom-selections-example"
                                              multiple
                                              newSelectionPrefix="Add a new category: "
                                              options={[]}
                                              placeholder="Categories *"
                                              onChange={(selected) => {
                                                  this.onChangeTypehead(selected, 'categories')
                                              }}
                                          />
                                      </div>
                                      <div className="mb-4">
                                          <span>Apply to Group(s)*</span>
                                          <Typeahead
                                              disabled={true}
                                              allowNew
                                              id="custom-selections-example"
                                              multiple
                                              newSelectionPrefix="Add a new Group: "
                                              options={[]}
                                              placeholder="Groups *"
                                              onChange={(selected) => {
                                                  this.onChangeTypehead(selected, 'groups')
                                              }}
                                          />
                                      </div>
                                      <div className="mb-4">
                                          <span>Keywords</span>
                                          <Typeahead
                                              disabled={true}
                                              allowNew
                                              id="custom-selections-example"
                                              multiple
                                              newSelectionPrefix="Add a new Keyword: "
                                              options={[]}
                                              placeholder="Keywords"
                                              onChange={(selected) => {
                                                  this.onChangeTypehead(selected, 'keywords')
                                              }}
                                          />
                                      </div>
                                      <div className="row mb-4" style={{ width: "99%", marginLeft: "1px", marginRight: "1px" }}>
                                          <div className="col-sm-6" style={{ backgroundColor: "#F9F9F9" }}>
                                              <span>Start Date</span>
                                              <br />
                                              <input style={{ border: "none", height: "50px", backgroundColor: "#F9F9F9" }} type="date" name="startDate" placeholder="01/01/2021"
                                                  value={this.state.startDate}
                                                  onChange={this.onChangeValue} required />
                                          </div>
                                          <div className="col-sm-6" style={{ backgroundColor: "#F9F9F9" }}>
                                              <span>End Date</span>
                                              <br />
                                              <input style={{ border: "none", height: "50px", backgroundColor: "#F9F9F9" }} type="date" name="endDate" placeholder="01/01/2021"
                                                  value={this.state.endDate}
                                                  onChange={this.onChangeValue} required />
                                          </div>
                                      </div>
                                      <div className="mb-4">
                                          <select placeholder="Draft" value={this.state.status} name={"status"}
                                                  onChange={this.onChangeValue}>
                                              <option value={"draft"}>Draft</option>
                                              <option value={"published"}>Publish</option>
                                          </select>
                                      </div>
                                      <div className="mb-4">
                                          <label>Total Points</label>
                                          <input type="text" name="totalPoints" placeholder="Total Points*"
                                                  value={this.state.totalPoints}
                                                  onChange={this.onChangeValue} required/>
                                      </div>
                                      <span>Feature Image <i className={'fas fa-plus-circle'}
                                                              style={{color: 'red'}}></i></span>
                                      <div className={'featured-img-container'}>
                                          <img src={'/images/member-1.png'} style={{width: '150px'}} alt=""/>
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
        editHead: (string, data) => dispatch(editHead(string, data)),
        push: (param) => dispatch(push(param)),
    };
};
export default connect(mapPropsToState, mapDispatchToProps)(SessionContentScreen);
