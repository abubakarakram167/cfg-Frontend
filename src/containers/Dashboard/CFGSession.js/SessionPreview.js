import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../../components/Header';

const SessionPreview = () => {
    return (
        <div>
            <article>
                <Helmet>
                    <meta
                        name="description"
                        content="A React.js Boilerplate application homepage"
                    />
                </Helmet>
            </article>
            <Header />
            <main>
                <div className="dash-wrapper">
                    <div className="row dash-session-header" style={{ marginLeft: "25%", marginRight: "25%", background: "#FFFFFF"}}>
                        <img className="SessionImg" height={300} alt="" />
                        <div style={{ minHeight: "500px" }}>
                            <h1 style={{ color: "#E09B3B", fontSize: "28px", marginTop: "5px", marginBottom: "30px" }}>Chapter1: Mind fullness</h1>
                            <h6 style={{ color: "#929292", fontSize: "25px" }}>what is mind fullness?</h6>
                            <p style={{ color: "#6A6A6A", fontSize: "18px" }}>kjnkjnhhkjnkjhkjkhbjgvhgvgfcvfdxewsjhjj</p>
                        </div>
                        <div  className="nextButton">
                            <button className="sessionNext">Next</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SessionPreview