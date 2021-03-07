import React from 'react';
import {Helmet} from 'react-helmet-async';
import {isAuthenticUser} from "../validateUser";
import history from "../../../utils/history";
import {Link} from "react-router-dom";

class RegisterLink extends React.PureComponent {

    render() {
        if (isAuthenticUser()) {
            return history.push('/');
        }
        return (
            <>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="description" content=""/>
                    <meta name="keywords" content=""/>
                    <meta name="author" content=""/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" type="image/png" href={"images/favicon.png"}/>
                    <title>Register | JMMB Foundation</title>
                </Helmet>
                <div className="login_top_bar">
                    <div className="container_large">
                        <h1>JMMB Foundation</h1>
                    </div>
                </div>

                <section className="account_wraper forgot_holder">
                    <div className="container_large">
                        <div className="login_holder reset_link">
                            <div className="login_logo"><img src={"images/jmmb_1.png"} className="img-fluid" alt=""/>
                            </div>
                            <div className="login_form">
                                <div className="send_icon"><i className="fas fa-paper-plane"/></div>
                                {~window.location.href.indexOf('reset') &&
                                <>
                                    <p>If you email address is registered, a link will be sent with instructions
                                        on how to reset your password within the next few minutes.
                                    </p>
                                    <p>This link will expire in three (3) hours.</p>
                                </>
                                }
                                {!~window.location.href.indexOf('reset') &&
                                <>
                                    <p>Your request to join the JMMB Joan Duncan Foundation Conversation for Greatness
                                        family has been submitted. Once approved, a link will be sent to the email provided
                                        with instructions on how to setup your account.</p>
                                    <p>This link will expire in three (3) hours.</p>
                                </>
                                }
                                <div className="d-block text-center">
                                    <Link to="/login" className="button primary_button col-8">BACK TO LOGIN PAGE</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default RegisterLink;
