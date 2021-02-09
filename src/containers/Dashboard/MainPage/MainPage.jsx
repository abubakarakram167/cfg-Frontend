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

class MainPage extends Component {

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
                    <div className="dash-home-grid">
                        <div className="row">
                            <div className="col bg-off-white dashboardBorder">
                                <i className="fas fa-chart-line"/>
                                <label>Dashboard</label>
                            </div>
                            <div className="col bg-blue dashboardBorder">
                                <Link to={"/userManagement"} className={"bg-blue"}>
                                    <i className="fas fa-users-cog"/>
                                    <label>User Mgmt</label>
                                </Link>
                            </div>
                            <div className="col bg-pink dashboardBorder">
                                <i className="fas fa-comments"/>
                                <label>CFG Session</label>
                            </div>
                            <div className="col bg-dark-red dashboardBorder">
                                <i className="fas fa-stream"/>
                                <label>Timeline</label>
                            </div>
                            <div className="col bg-orange dashboardBorder">
                                <i className="fas fa-tools"/>
                                <label>CFG Tools</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col bg-green dashboardBorder">
                                <i className="fas fa-calendar-day"/>
                                <label>Events</label>
                            </div>
                            <div className="col bg-orange dashboardBorder">
                                <i className="fas fa-question-circle"/>
                                <label>Quiz</label>
                            </div>
                            <div className="col bg-light-blue dashboardBorder">
                                <i className="fas fa-cogs"/>
                                <label>Preferences</label>
                            </div>
                            <div className="col bg-blue dashboardBorder">
                                <i className="fas fa-images"/>
                                <label>Media Library</label>
                            </div>
                            <div className="col bg-pink dashboardBorder">
                                <i className="fas fa-comment-alt"/>
                                <label>Mini CFG</label>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}


export default MainPage;
