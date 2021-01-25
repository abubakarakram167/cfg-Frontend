/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {Component} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from "react-router-dom";
import Header from "../../components/Header";

class HomePage extends Component {

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
                <div>kamran</div>
            </>
        );
    }
}


export default HomePage;
