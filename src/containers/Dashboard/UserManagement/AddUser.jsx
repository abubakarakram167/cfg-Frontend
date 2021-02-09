import React, {Component} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from "react-router-dom";
import Header from "../../../components/Header";
import Datatable from "../../../components/Datatable/Datatable";
import {getAllUsers, changeUsersStatus} from '../../../store/actions/users.actions'
import {push} from 'connected-react-router';
import {connect} from "react-redux";

class UserManagement extends Component {
    state = {
        username: "",
        name: "",
        email: "",
        role: "",
        telephone: "",
        group: ""
    }

    componentDidMount() {}

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
                        <title>Add User</title>
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
                                <h5 style={{fontWeight: 700}}><i className="fas fa-user"/> Add New User </h5>
                            </div>
                            <div className="row form-container ">
                                <div className="dash_form">
                                    <form onSubmit={this.onFormSubmit}>
                                        <div className="mb-4">
                                            <label>Username</label>
                                            <input type="text" name="username" placeholder="Username*" required onChange={this.onChangeValue} />
                                        </div>
                                        <div className="mb-4">
                                            <label>Name</label>
                                            <input type="text" name="name" placeholder="Name*" onChange={this.onChangeValue}  required/>
                                        </div>
                                        <div className="mb-4">
                                            <label>Email</label>
                                            <input type="email" name="email" placeholder="Email*" onChange={this.onChangeValue}  required/>
                                        </div>
                                        <div className="mb-4">
                                            <label>Telephone</label>
                                            <input type="text" name="telephone" placeholder="Telephone*" onChange={this.onChangeValue}  required/>
                                        </div>
                                        <div className="mb-4">
                                            <label>Role</label>
                                            <input type="text" name="role" placeholder="Role*" onChange={this.onChangeValue}  required/>
                                        </div>
                                        <div className="mb-4">
                                            <label>Group</label>
                                            <input type="text" name="group" placeholder="Group*" onChange={this.onChangeValue}  required/>
                                        </div>
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
    console.log("store.users", store.users)
    return {
        users: store.users.users
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
