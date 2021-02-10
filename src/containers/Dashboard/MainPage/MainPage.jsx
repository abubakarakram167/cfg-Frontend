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
import history from "../../../utils/history";

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
                                <span onClick={() => {history.push('/userManagement')}} style={{background: 'transparent'}}>
                                    <i className="fas fa-users-cog"/>
                                    <label>User Mgmt</label>
                                </span>
                            </div>
                            <div className="col bg-pink dashboardBorder">
                                <span onClick={() => {history.push('/listing/session')}} style={{background: 'transparent'}}>
                                    <i className="fas fa-comments"/>
                                    <label>CFG Session</label>
                                </span>
                            </div>
                            <div className="col bg-dark-red dashboardBorder">
                                <span style={{background: 'transparent'}}>
                                    <i className="fas fa-stream"/>
                                    <label>Timeline</label>
                                </span>
                            </div>
                            <div className="col bg-orange dashboardBorder">
                                <span onClick={() => {history.push('/listing/tool')}} style={{background: 'transparent'}}>
                                    <i className="fas fa-tools"/>
                                    <label>CFG Tools</label>
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col bg-green dashboardBorder">
                                <span onClick={() => {history.push('/listing/event')}}  style={{background: 'transparent'}}>
                                    <i className="fas fa-calendar-day"/>
                                    <label>Events</label>
                                </span>
                            </div>
                            <div className="col bg-orange dashboardBorder">
                                <span onClick={() => {history.push('/listing/quiz')}} style={{background: 'transparent'}}>
                                    <i className="fas fa-question-circle"/>
                                    <label>Quiz</label>
                                </span>
                            </div>
                            <div className="col bg-light-blue dashboardBorder">
                                <span style={{background: 'transparent'}}>
                                    <i className="fas fa-cogs"/>
                                    <label>Preferences</label>
                                </span>
                            </div>
                            <div className="col bg-blue dashboardBorder">
                                <i className="fas fa-images"/>
                                <label>Media Library</label>
                            </div>
                            <div className="col bg-pink dashboardBorder">
                                <span onClick={() => {history.push('/listing/mini')}} style={{background: 'transparent'}}>
                                    <i className="fas fa-comment-alt"/>
                                    <label>Mini CFG</label>
                                </span>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}


export default MainPage;
