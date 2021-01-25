import React from 'react'
import SocialLogin from 'react-social-login'

class SocialButton extends React.Component {

    render() {
        console.log("THis.props", this.props);
        return (
            <button {...this.props}>
                { this.props.children }
            </button>
        );
    }
}

export default SocialLogin(SocialButton);
