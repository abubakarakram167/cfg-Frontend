import React, {Component} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from "react-router-dom";
import Header from "../../../components/Header";
import Datatable from "../../../components/Datatable/Datatable";
import {getAllUsers, changeUsersStatus} from '../../../store/actions/users.actions'
import {push} from 'connected-react-router';
import {connect} from "react-redux";
import {toast} from "react-toastify";
import history from "../../../utils/history";

class UserManagement extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        role: "",
        users: []
    }

    componentDidMount() {
        this.props["getAllUsers"](`_count=100&_pageNo=1`);
    }

    handleSelected = (data) => {
        this.setState({
            users: data.selectedRows
        });
    }
    onChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    editUser = (e) => {
        e.preventDefault();
        if (!this.state.users.length || this.state.users.length > 1) {
            toast.error('Please select only one user to edit');
            return;
        }
        history.push({
            pathname: 'editUser',
            state: { user: this.state.users[0] }
        })
    }

    onResetSubmit = (e) => {
        e.preventDefault();
        let stringLitral = ""
        if (this.state.first_name && this.state.first_name.trim() !== "") {
            stringLitral += `&first_name=${this.state.first_name}`
        }
        if (this.state.last_name && this.state.last_name.trim() !== "") {
            stringLitral += `&last_name=${this.state.last_name}`
        }
        if (this.state.email && this.state.email.trim() !== "") {
            stringLitral += `&email=${this.state.email}`
        }
        if (this.state.role && this.state.role.trim() !== "") {
            stringLitral += `&role=${this.state.role}`
        }
        if (stringLitral !== "") {
            this.props["getAllUsers"](`_count=10&_pageNo=1${stringLitral}`);
        } else {
            this.props["getAllUsers"](`_count=10&_pageNo=1`);
        }
    }

    changeUsersStatus = (type) => {
        // eslint-disable-next-line no-restricted-globals
        let yes = confirm("Are you sure you want to continue with this operation?");
        if (yes && this.state.users.length) {
            let users = this.state.users.map(e => e.id)
            this.props["changeUsersStatus"](type, users);
            setTimeout(() => {
                this.props["getAllUsers"](`_count=10&_pageNo=1`);
            }, 1000)
        }
    }

    render() {
        const columns = [
            {
                name: 'ID',
                selector: 'id',
                sortable: true,
                cell: row => <Link to={`/${row.id}`}>{row.id}</Link>
            },
            {
                name: 'First Name',
                selector: 'first_name',
                // sortable: true,
            },
            // {
            //     name: 'Last Name',
            //     selector: 'last_name',
            //     sortable: true
            // },
            {
                name: 'Email',
                selector: 'email',
                // sortable: true
            },
            {
                name: 'Role',
                selector: 'role',
                // sortable: true
            },
            {
                name: 'Status',
                selector: 'status',
                // sortable: true
            },
        ];

        const conditionalRowStyles = [
            {
                when: row => row.isEven,
                style: {
                    backgroundColor: '#daf4f7',
                },
            }
        ];

        return (
            <>
                <article>
                    <Helmet>
                        <title>Home Page</title>
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
                                <label style={{"fontSize": "1rem", "fontWeight": "700"}}> <i className="fas fa-user-cog"/>  User Management</label>
                                <Link to={"/addUser"} type="button" className="button-title-small button_inline m-l-15 um_primary_button">
                                    <i className="fas fa-plus-circle"/> Add new
                                </Link>
                                <button type="button" className="button-title-small button_inline m-l-15">
                                    <i className="fas fa-key"/> Reset
                                </button>
                                <button type="button" className="button-title-small button_inline m-l-15" onClick={() => {this.changeUsersStatus('disabled')}}>
                                    <i className="fas fa-user-lock"/> Lock
                                </button>
                                <button type="button" className="button-title-small button_inline m-l-15 um_approve_button" onClick={() => {this.changeUsersStatus('approved')}}>
                                    <i className="fas fa-check-circle"/> Approve
                                </button>
                                <button onClick={this.editUser} type="button" className="button-title-small button_inline m-l-15">
                                    <i className="fas fa-edit"/> Edit
                                </button>
                            </div>
                        </div>
                    </div>
                    < br />
                    < br />
                    < br />
                    <div className={"row"}>
                        <div className={"col-md-1"}/>
                        <div className="col-md-2">
                            <input className={"input-border"} type="text" name="first_name" placeholder="FirstName" onChange={this.onChangeValue}
                                   />
                        </div>
                        <div className="col-md-2">
                            <input className={"input-border"} type="text" name="last_name" placeholder="LastName" onChange={this.onChangeValue}
                                   />
                        </div>
                        <div className="col-md-2">
                            <input className={"input-border"} type="text" name="email" placeholder="Email" onChange={this.onChangeValue}
                                   />
                        </div>
                        <div className="col-md-2">
                            <select name="role" className={"input-border"} onChange={this.onChangeValue}>
                                <option value="">Select</option>
                                <option value="auditor">Auditor</option>
                                <option value="candidate">Candidate</option>
                                <option value="content-manager">Content Manager</option>
                                <option value="facilitator">Facilitator</option>
                                <option value="reviewer">Reviewer</option>
                                <option value="system-administrator">System Administrator</option>
                            </select>
                        </div>
                        <div className={"col-md-1"}>
                            <div className="d-block">
                                <input type="submit" className="button primary_button button_block"
                                       value="Search" onClick={this.onResetSubmit}/>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-md-1"}/>
                        <div className={"col-md-10"}>
                            <Datatable
                                data={this.props.users}
                                columns={columns}
                                handleSelected={this.handleSelected}
                                conditionalRowStyles={conditionalRowStyles}
                            />
                        </div>
                        <div className={"col-md-1"}/>
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
