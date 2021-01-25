import React from 'react';
import {Link} from "react-router-dom";
import {Helmet} from 'react-helmet-async';
import {connect} from 'react-redux'
import {push} from 'connected-react-router';
import {isAuthenticUser} from '../validateUser';

import {login} from '../../../store/actions/auth.actions'
import history from "../../../utils/history";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-with-button';
import MicrosoftLogin from "react-microsoft-login";


class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            logged: false,
            user: {},
            currentProvider: ''
        }
        this.nodes = {}

        this.onLoginSuccess = this.onLoginSuccess.bind(this)
        this.onLoginFailure = this.onLoginFailure.bind(this)
        this.onLogoutSuccess = this.onLogoutSuccess.bind(this)
        this.onLogoutFailure = this.onLogoutFailure.bind(this)
        this.logout = this.logout.bind(this)
    }

    setNodeRef (provider, node) {
        if (node) {
            this.nodes[ provider ] = node
        }
    }

    onLoginSuccess (user) {
        console.log(user)

        this.setState({
            logged: true,
            currentProvider: user._provider,
            user
        })
    }

    onLoginFailure (err) {
        console.error(err)

        this.setState({
            logged: false,
            currentProvider: '',
            user: {}
        })
    }

    onLogoutSuccess () {
        this.setState({
            logged: false,
            currentProvider: '',
            user: {}
        })
    }

    onLogoutFailure (err) {
        console.error(err)
    }

    logout () {
        const { logged, currentProvider } = this.state

        if (logged && currentProvider) {
            this.nodes[currentProvider].props.triggerLogout()
        }
    }

    onChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onLoginSubmit = (e) => {
        e.preventDefault();
        this.props["login"]({
            ...this.state
        });
    }
    authHandler = (err, data) => {
        console.log(err, data);
    }


    static getDerivedStateFromProps(props, state) {
        if (props.auth && props.auth.user && props.auth.user.token) {
            props.history.push('/');
            return null;

        }
        return null;
    }

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
                    <title>Login | JMMB Foundation</title>
                </Helmet>
                <div className="login_top_bar">
                    <div className="container_large">
                        <h1>JMMB Foundation</h1>
                    </div>
                </div>

                <section className="account_wraper">
                    <div className="container_large">
                        <div className="login_holder">
                            <div className="login_logo"><img src={"images/jmmb_1.png"} className="img-fluid" alt=""/>
                            </div>
                            <div className="login_form">
                                <form onSubmit={this.onLoginSubmit}>
                                    <div className="mb-4">
                                        <label>Email</label>
                                        <input type="text" name="email" placeholder="Email *"
                                               onChange={this.onChangeValue}/>
                                    </div>
                                    <div className="mb-3 relative">
                                        <label>Password</label>
                                        <input type="password" name="password" placeholder="Password"
                                               onChange={this.onChangeValue}/>
                                        <button type="button" className="show_password">
                                            <i className="fas fa-eye-slash"/>
                                        </button>
                                    </div>
                                    <div className="forgot_links mb-4">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value=""
                                                               id="flexCheckDefault"/>
                                                        <label className="form-check-label"
                                                               htmlFor="flexCheckDefault">
                                                            Remember Me
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <p className="forgot_password"><Link to="#">Forgot Password?</Link></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-block">
                                        <input type="submit" className="button primary_button button_block"
                                               value="Sign In"/>
                                    </div>
                                </form>
                                <div className="social_login my-4">
                                    <h3>or</h3>
                                    <ul>
                                        <li>
                                            <GoogleLogin
                                                clientId="943652713814-j2mt07ub0944r9e94n7mer3b07sj9l5j.apps.googleusercontent.com"
                                                render={renderProps => (
                                                    <Link to="#" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={"images/google-icon.png"} alt=""/></Link>
                                                )}
                                                buttonText="Login"
                                                onSuccess={this.onLoginSuccess}
                                                onFailure={this.onLoginSuccess}
                                                cookiePolicy={'single_host_origin'}
                                            />
                                        </li>
                                        <li>
                                            <MicrosoftLogin
                                                clientId={"54d2a53c-0bac-45e4-ad96-3fe987822acc"}
                                                authCallback={this.authHandler}
                                                buttonTheme={"light_short"}
                                            />
                                            {/*<Link to="#"><img src={"images/mail-icon.png"} alt=""/></Link>*/}
                                        </li>
                                        <li><Link to="#"><img src={"images/twitter-icon.png"} alt=""/></Link></li>
                                        <li>
                                            <FacebookLogin
                                                appId="413382886411661"
                                                autoLoad={false}
                                                textButton={""}
                                                fields="name,email,picture"
                                                scope="public_profile,email,phone"
                                                callback={this.onLoginSuccess}
                                                cssClass={"fb-button"}
                                                icon={"fa fa-facebook"}
                                                size={"small"}
                                                render={renderProps => (
                                                    <Link to="#" onClick={renderProps.onClick}><img src={"images/facebook-icon.png"} alt=""/></Link>
                                                )}
                                            />
                                            {/*    <Link to="#"><img src={"images/facebook-icon.png"} alt=""/></Link>*/}

                                        </li>
                                    </ul>
                                </div>
                                <div className="dont_account">
                                    <p>Don't have an account? <Link to={'/register'}>Signup</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="round_img">
                        <img src={"images/bible-verses-about-love@2x.jpg"} className="img-fluid"
                             alt=""/>
                    </div>
                </section>
            </>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        login: (params) => dispatch(login(params)),
        push: (param) => dispatch(push(param)),
    };
};
export default connect(null, mapDispatchToProps)(Login);
