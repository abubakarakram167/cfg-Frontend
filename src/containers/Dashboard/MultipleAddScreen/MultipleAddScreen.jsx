import React, {Component} from 'react';
import {Helmet} from 'react-helmet-async';
import Header from "../../../components/Header";
import {push} from 'connected-react-router';
import {connect} from "react-redux";
import {screensConfig} from "./addConfig";
import { Typeahead } from 'react-bootstrap-typeahead';
import history from "../../../utils/history";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {addHead} from '../../../store/actions/dynamic.actions'

class UserManagement extends Component {
    state = {
        username: "",
        name: "",
        email: "",
        role: "",
        telephone: "",
        group: "",
        author: "",
        startDate: "",
        endDate: "",
        points: "",
        category: "",
        status: "",
        quizSuccess: "",
        quizFail: "",
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
    }

    componentDidMount() {
        if (!screensConfig[this.props.pathname]) {
            history.push('/dashboard');
        }
        this.setState({ pageContext : screensConfig[this.props.pathname] });
    }

    onChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props['addHead'](this.props.pathname, {...this.state})
    }

    render() {
        return (
            <>
                <article>
                    <Helmet>
                        <title>Add { this.state.pageContext && this.state.pageContext.title }</title>
                        <meta
                            name="description"
                            content="A React.js Boilerplate application homepage"
                        />
                    </Helmet>
                </article>
                <Header/>
                <main>
                    <div className="dash-wrapper">
                        <div className="row dash-add-cfg" style={{margin:'0 auto'}}>
                            <div className="row">
                                <h5 style={{fontWeight: 700}}><i className="fas fa-user"/> Add { this.state.pageContext && this.state.pageContext.title} </h5>
                            </div>
                            <div className="row form-container ">
                                <div className="dash_form">
                                    <form onSubmit={this.onFormSubmit}>
                                        {
                                            this.state.pageContext.fields.name
                                            &&
                                            <div className="mb-4">
                                            <label>Name</label>
                                            <input type="text" name="title" placeholder="Name*"
                                                   onChange={this.onChangeValue} required/>
                                        </div>
                                        }
                                        {
                                            this.state.pageContext.fields.author
                                            &&
                                            <div className="mb-4">
                                                <label>Author</label>
                                                <input type="text" name="author" placeholder="Author*"
                                                       onChange={this.onChangeValue} required/>
                                            </div>
                                        }
                                        {
                                            this.state.pageContext.fields.startDate
                                            &&
                                            <div className="mb-4">
                                                <label>Start Date</label>
                                                <input type="text" name="start_date" placeholder="Start Date*"
                                                       onChange={this.onChangeValue} required/>
                                            </div>
                                        }
                                        {
                                            this.state.pageContext.fields.endDate
                                            &&
                                            <div className="mb-4">
                                                <label>End Date</label>
                                                <input type="text" name="end_date" placeholder="End Date*"
                                                       onChange={this.onChangeValue} required/>
                                            </div>
                                        }
                                        {
                                            this.state.pageContext.fields.points
                                            &&
                                            <div className="mb-4">
                                                <label>Total Points</label>
                                                <input type="text" name="total_points" placeholder="Total Points*"
                                                       onChange={this.onChangeValue} required/>
                                            </div>
                                        }
                                        {
                                            this.state.pageContext.fields.category
                                            &&
                                            <div className="mb-4">
                                                <label>Categories *</label>
                                                <Typeahead
                                                    allowNew
                                                    id="custom-selections-example"
                                                    multiple
                                                    newSelectionPrefix="Add a new category: "
                                                    options={[]}
                                                    placeholder="Categories *"
                                                />
                                            </div>
                                        }
                                        {/*<div className="mb-4">*/}
                                        {/*    <label>Group</label>*/}
                                        {/*    <input type="text" name="group" placeholder="Group*"*/}
                                        {/*           onChange={this.onChangeValue} required/>*/}
                                        {/*</div>*/}
                                        <div className="d-block" style={{textAlign: 'center'}}>
                                            <input type="submit" className="button primary_button" style={{marginRight: '10px'}}
                                                   value="Save"/>
                                            <input type="button"
                                                   onClick={() => {history.push(`/listing/${this.props.pathname}`)}}
                                                   style={{border: "1px solid lightgray", "marginTop": "10px"}}
                                                   className="button" value="Cancel"/>
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
        pathname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addHead: (string, data) => dispatch(addHead(string, data)),
        push: (param) => dispatch(push(param)),
    };
};
export default connect(mapPropsToState, mapDispatchToProps)(UserManagement);
