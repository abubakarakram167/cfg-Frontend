import React, {Component} from 'react';
import {Helmet} from 'react-helmet-async';
import Header from "../../../components/Header";
import {getAllUsers, changeUsersStatus} from '../../../store/actions/users.actions'
import {push} from 'connected-react-router';
import {connect} from "react-redux";
import {screens} from "./addConfig.json";
import history from "../../../utils/history";

class UserManagement extends Component {
    state = {
        username: "",
        name: "",
        email: "",
        role: "",
        telephone: "",
        group: ""
    }

    componentDidMount() {
        if (!screens[this.props.pathname]) {
            history.push('/dashboard');
        }
    }

    onChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onFormSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <article>
                    <Helmet>
                        <title>Add {screens[this.props.pathname]}</title>
                        <meta
                            name="description"
                            content="A React.js Boilerplate application homepage"
                        />
                    </Helmet>
                </article>
                <Header/>
                <main>
                    <div className="dash-wrapper">
                        <div className="row dash-add-cfg">
                            <div className="row">
                                <h5 style={{fontWeight: 700}}><i className="fas fa-user"/> Add {screens[this.props.pathname]} </h5>
                            </div>
                            <div className="row form-container ">
                                <div className="dash_form">
                                    <form onSubmit={this.onFormSubmit}>
                                        <div className="mb-4">
                                            <label>Name</label>
                                            <input type="text" name="name" placeholder="Name*"
                                                   onChange={this.onChangeValue} required/>
                                        </div>
                                        <div className="mb-4">
                                            <label>Author</label>
                                            <input type="email" name="author" placeholder="Author*"
                                                   onChange={this.onChangeValue} required/>
                                        </div>
                                        <div className="mb-4">
                                            <label>Start Date</label>
                                            <input type="text" name="startDate" placeholder="Start Date*"
                                                   onChange={this.onChangeValue} required/>
                                        </div>
                                        <div className="mb-4">
                                            <label>End Date</label>
                                            <input type="text" name="endDate" placeholder="End Date*"
                                                   onChange={this.onChangeValue} required/>
                                        </div>
                                        <div className="mb-4">
                                            <label>Total Points</label>
                                            <input type="text" name="totalPoints" placeholder="Total Points*"
                                                   onChange={this.onChangeValue} required/>
                                        </div>
                                        {/*<div className="mb-4">*/}
                                        {/*    <label>Group</label>*/}
                                        {/*    <input type="text" name="group" placeholder="Group*"*/}
                                        {/*           onChange={this.onChangeValue} required/>*/}
                                        {/*</div>*/}
                                        <div className="d-block">
                                            <input type="submit" className="button primary_button button_block"
                                                   value="Save"/>
                                            <input type="submit"
                                                   style={{border: "1px solid lightgray", "marginTop": "10px"}}
                                                   className="button button_block" value="Cancel"/>
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
        changeUsersStatus: (type, users) => dispatch(changeUsersStatus(type, users)),
        getAllUsers: (params) => dispatch(getAllUsers(params)),
        push: (param) => dispatch(push(param)),
    };
};
export default connect(mapPropsToState, mapDispatchToProps)(UserManagement);
