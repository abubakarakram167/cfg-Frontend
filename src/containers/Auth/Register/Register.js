import React from 'react';
import {Helmet} from 'react-helmet-async';
import {connect} from "react-redux";
import {isAuthenticUser} from "../validateUser";
import history from "../../../utils/history";
import {register} from "../../../store/actions/auth.actions";
import {push} from "connected-react-router";

class Register extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: ''
        };
    }

    onChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props["register"]({
            ...this.state,
            password: 'A@123bvbvbv'
        });
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
                    <title>Register | JMMB Foundation</title>
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
                                <form onSubmit={this.onFormSubmit}>
                                    <div className="mb-4">
                                        <label>Full Name</label>
                                        <input type="text" name="firstName" placeholder="Full Name *" onChange={this.onChangeValue}/>
                                    </div>
                                    <div className="mb-4">
                                        <label>Email</label>
                                        <input type="text" name="email" placeholder="Email *" onChange={this.onChangeValue}/>
                                    </div>
                                    <div className="d-block">
                                        <input type="submit" className="button primary_button button_block"
                                               value="Sign Up"/>
                                    </div>
                                </form>
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
        register: (params) => dispatch(register(params)),
        push: (param) => dispatch(push(param)),
    };
};
export default connect(null, mapDispatchToProps)(Register)
