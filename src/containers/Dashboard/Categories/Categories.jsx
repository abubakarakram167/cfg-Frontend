/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {Component} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from "react-router-dom";
import Header from "../../../components/Header";
import './category.css';
import {connect} from "react-redux";
import {getAllCategories} from "../../../store/actions/categories.actions";
import {push} from "connected-react-router";

class Categories extends Component {

    componentDidMount() {
        this.props["getAllCategories"]();
    }

    render() {
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
                    <div className="dash-home-category">
                        <div className="row">
                            <div className="">
                                <div className="form-group">
                                    <label htmlFor="phone">Category Name</label>
                                    <input id="phone" name="phone" type="tel" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Category Description</label>
                                    <textarea id="message" name="phone" className="form-control" required/>
                                </div>
                                <br/>
                                <Link to="#" className="btn btn-primary btn-xs pull-right"><b>+</b> Add new
                                    categories</Link>
                            </div>
                        </div>
                        <div className="row">
                            <table className="table table-striped custab">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    {/*<th className="text-center">Action</th>*/}
                                </tr>
                                </thead>
                                <tr>
                                    <td>1</td>
                                    <td>News</td>
                                    <td>News Cate</td>
                                    {/*<td className="text-center"><a className='btn btn-info btn-xs' href="#"><span*/}
                                    {/*    className="glyphicon glyphicon-edit"></span> Edit</a> <a href="#"*/}
                                    {/*                                                             className="btn btn-danger"><span*/}
                                    {/*    className="glyphicon glyphicon-remove"></span> Del</a></td>*/}
                                </tr>
                            </table>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

function mapPropsToState (store) {
    return {
        categories: store.categories
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: () => dispatch(getAllCategories()),
        push: (param) => dispatch(push(param)),
    };
};

export default connect(mapPropsToState, mapDispatchToProps)(Categories)
