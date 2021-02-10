import React, {Component} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from "react-router-dom";
import Header from "../../../components/Header";
import Datatable from "../../../components/Datatable/Datatable";
import {contentList} from '../../../store/actions/dynamic.actions'
import {push} from 'connected-react-router';
import {connect} from "react-redux";
import {toast} from "react-toastify";
import history from "../../../utils/history";
import {screensConfig} from "./addConfig";
import _ from 'lodash';

class MultipleListingScreen extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        role: "",
        users: [],
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
        this.setState({pageContext: screensConfig[this.props.pathname]});
        this.props["contentList"](this.props.pathname, `_count=10&_pageNo=1`);
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
            state: {user: this.state.users[0]}
        })
    }
    onRowClicked = (content) => {
        history.push({
            pathname: `/content/${this.props.pathname}`,
            state: {content}
        })
    }

    render() {
        const columns = [
            {
                name: 'ID',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Name',
                selector: 'title',
            },
            {
                name: 'Author',
                selector: 'author.first_name',
                cell: (row) => <span>{_.get(row, 'author.first_name', undefined) || _.get(row, 'author.user_name', undefined) || _.get(row, 'author.email', )}</span>
            },
            {
                name: 'Start Date',
                selector: 'start_date',
            },
            {
                name: 'End Date',
                selector: 'end_date',
            },
            {
                name: 'Total Points',
                selector: 'status',
            },
            {
                name: 'Status',
                selector: 'status',
            }
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
                        <title>Add {this.state.pageContext && this.state.pageContext.title}</title>
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
                                <label style={{
                                    "fontSize": "1rem",
                                    "fontWeight": "700"
                                }}> {this.state.pageContext && this.state.pageContext.title}</label>
                                <Link to={`/add/${this.props.pathname}`} type="button"
                                      className="button-title-small button_inline m-l-15 um_primary_button">
                                    <i className="fas fa-plus-circle"/> Add new
                                </Link>
                                <button onClick={this.editUser} type="button"
                                        className="button-title-small button_inline m-l-15">
                                    <i className="fas fa-edit"/> Edit
                                </button>
                            </div>
                        </div>
                        <div className={"row"}>
                            {/*<div className={"col-md-1"}/>*/}
                            <div className={"col-md-12"}>
                                <Datatable
                                    data={this.props.data}
                                    columns={columns}
                                    handleSelected={this.handleSelected}
                                    conditionalRowStyles={conditionalRowStyles}
                                    onRowClicked={this.onRowClicked}
                                />
                            </div>
                            {/*<div className={"col-md-1"}/>*/}
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

function mapPropsToState(store) {
    console.log("store.users", store.users)
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
        count: _.get(store, 'dynamic.listing.count', 0),
        data: _.get(store, 'dynamic.listing.data', []),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        contentList: (type, urlString) => dispatch(contentList(type, urlString)),
        push: (param) => dispatch(push(param)),
    };
};
export default connect(mapPropsToState, mapDispatchToProps)(MultipleListingScreen);
