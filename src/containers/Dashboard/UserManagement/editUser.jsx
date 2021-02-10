import React, {Component} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from "react-router-dom";
import Header from "../../../components/Header";
import Datatable from "../../../components/Datatable/Datatable";
import {getAllUsers, changeUsersStatus} from '../../../store/actions/users.actions'
import {push} from 'connected-react-router';
import {connect} from "react-redux";
import {Typeahead} from "react-bootstrap-typeahead";
import _ from 'lodash';

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            once: true,
            user_name: "",
            first_name: "",
            email: "",
            role: "",
            phone: "",
            group: "",
            roles: [
                {id: 'auditor', label: 'Auditor'},
                {id: 'candidate', label: 'Candidate'},
                {id: 'content-manager', label: 'Content Manager'},
                {id: 'facilitator', label: 'Facilitator'},
                {id: 'reviewer', label: 'Reviewer'},
                {id: 'system-administrator', label: 'System Administrator'},
            ]
        }
    }

    componentDidMount() {
        console.log("did")
    }

    static getDerivedStateFromProps(props, state) {
        if (state.once  && props.user) {
            return {
                ...state,
                once: false,
                ...props.user
            };
        }
        return null;
    }

    onChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onChangeTypehead = (selected, key) => {
        if (selected && selected.length && selected[0].id) {
            this.setState({
                [key]: selected[0].id
            });
        } else  {
            this.setState({
                [key]:  null
            });
        }
    }
    onFormSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        console.log("sdbalkf", this.state)
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
                        <div className="row dash-add-cfg center-div">
                            <div className="row">
                                <h5 style={{fontWeight: 700}}><i className="fas fa-user"/> Edit {this.state.first_name}</h5>
                            </div>
                            <div className="row form-container">
                                <div className="dash_form">
                                    <form onSubmit={this.onFormSubmit}>
                                        <div className="mb-4">
                                            <label>Username</label>
                                            <input type="text" name="user_name" value={this.state.user_name || ''} placeholder="Username*" required onChange={this.onChangeValue} />
                                        </div>
                                        <div className="mb-4">
                                            <label>Name</label>
                                            <input type="text" name="first_name" value={this.state.first_name || ''} placeholder="Name*" onChange={this.onChangeValue}  required/>
                                        </div>
                                        <div className="mb-4">
                                            <label>Email</label>
                                            <input type="email" name="email" value={this.state.email || ''} placeholder="Email*" onChange={this.onChangeValue}  required/>
                                        </div>
                                        <div className="mb-4">
                                            <label>Telephone</label>
                                            <input type="text" name="phone" value={this.state.phone || ''} placeholder="Telephone*" onChange={this.onChangeValue}  required/>
                                        </div>
                                        <div className="mb-4">
                                            <label>Role</label>
                                            <div className="mb-4">
                                                <label>Role*</label>
                                                <Typeahead
                                                    allowNew
                                                    defaultSelected={[this.state.roles[3]]}
                                                    id="custom-selections-example"
                                                    // multiple
                                                    onChange={(selected) => { this.onChangeTypehead(selected, 'role')}}
                                                    newSelectionPrefix="Add a new category: "
                                                    options={this.state.roles}
                                                    placeholder="Role*"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label>Group</label>
                                            <div className="mb-4">
                                                <label>Group*</label>
                                                <Typeahead
                                                    allowNew
                                                    id="custom-selections-example"
                                                    defaultSelected={[this.state.roles[1]]}
                                                    onChange={(selected) => { this.onChangeTypehead(selected, 'group')}}
                                                    // multiple
                                                    newSelectionPrefix="Add a new category: "
                                                    options={this.state.roles}
                                                    placeholder="Group*"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label>Status</label>
                                            <div className="mb-4">
                                                <label>Status*</label>
                                                <Typeahead
                                                    allowNew
                                                    id="custom-selections-example"
                                                    defaultSelected={[this.state.roles[1]]}
                                                    onChange={(selected) => { this.onChangeTypehead(selected, 'group')}}
                                                    // multiple
                                                    newSelectionPrefix="Status"
                                                    options={this.state.roles}
                                                    placeholder="Status*"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-block" style={{textAlign: 'center'}}>
                                            <input type="submit" className="button primary_button"
                                                   value="Save"/>
                                            <input type="submit"
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
    return {
        user: _.get(store.router, 'location.state.user', []),
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
