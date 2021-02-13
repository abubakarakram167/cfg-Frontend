import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuClass: 'inactive',
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {firstName: ""}
        };
    }

    toggleMenu = (e) => {
        e.preventDefault();
        this.setState({
            menuClass: this.state.menuClass === 'inactive' ? 'active' : 'inactive'
        });
    }

    render() {
        let {first_name, last_name, userName} = JSON.parse(localStorage.getItem('user'));
        return (
            <>
                {/*Desktop Header Start Here*/}
                <header>
                    <div className="container-fluid">
                        <div className="header_wraper">
                            <div className="top_left">
                                <div className="logo_icon">
                                    <Link to="#"><img src={"/images/cfg-logo.png"} alt=""/></Link>
                                </div>
                                <div className="logo_icon">
                                    <Link style={{color: 'white'}} to="/dashboard"><i style={{fontSize: '33px'}} className="fas fa-home"/></Link>
                                </div>
                                <div className="top_left_search">
                                    <input type="search" name=""/>
                                </div>
                            </div>
                            <div className="top_center">
                                {this.state.user.role === 'Admin' && <ul>
                                    <li className="active"><Link to="#"><i className="fas fa-home"/></Link></li>
                                    <li><Link to="#"><i className="fas fa-users"/></Link></li>
                                    <li><Link to="#"><i className="fas fa-trophy"/></Link></li>
                                    <li><Link to="#"><i className="fas fa-gift"/></Link></li>
                                </ul>}
                            </div>
                            <div className="top_right">
                                <ul className={"menuEnd"}>
                                    <li className="user_info">
                                        <Link to="#">
                                            <img src={"/images/member-5.png"} className="user-image" alt=""/>
                                            <span className="hidden-xs username">{first_name || last_name || userName}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#"><i className="fas fa-bell"/></Link>
                                    </li>
                                    {this.state.user.role === 'Admin' && <li className="cart_basket">
                                        <Link to="#">
                                            <i className="fas fa-shopping-basket"/>
                                            <span>2</span>
                                        </Link>
                                    </li>}
                                    <li>
                                        <Link to="#"><i className="fas fa-user-cog"/></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
                {/*Desktop Header Ends Here*/}

                {/*Mobile Header Start Here*/}
                <div className="mobile_header">
                    <div className="m_left">
                        <div className="menu_icon" id="menu-toggle" onClick={this.toggleMenu}><img
                            src={"images/menu-icon.svg"} alt=""/></div>
                    </div>
                    <div className="m_center"><Link to="#"><img src={"images/jmmb-logo.svg"} alt=""/></Link></div>
                    <div className="m_right">
                        <div className="three_dots"><img src={"images/three-dots.svg"} alt=""/></div>
                    </div>
                </div>
                {/*Mobile Header Ends Here*/}

                {/*Drawer Menu*/}
                <div className="sidebar_drawer">
                    <nav id="sidebar-wrapper" className={this.state.menuClass}>
                        <div className="sidebar_close">
                            <Link id="close-menu" to="#" className="pull-right toggle square" onClick={this.toggleMenu}><i
                                className="fa fa-times fa-lg"/></Link>
                        </div>
                        <div className="sidebar_user">
                            <div className="sidebar_user_photo"><img src={"images/bible-verses-about-love@2x.jpg"}
                                                                     alt=""/></div>
                            <div className="sidebar_user_info">
                                <h2>{this.state.user.firstName} <span>{this.state.user.lastName}</span></h2>
                            </div>
                            <div className="sidebar_upload_photo">
                                <div className="upload_photo">
                                    <label htmlFor="file-upload" className="custom_file_upload">
                                        <img src={"images/camera-icon.svg"} alt=""/>
                                    </label>
                                    <input id="file-upload" type="file"/>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar_achievements">
                            <div className="my_achivments">
                                <h3>Achievements</h3>
                                <div className="badge_wraper">
                                    <div className="badge_icon"><img src={"images/bronze-trophy.png"} alt=""/></div>
                                    <div className="badge_info">
                                        <p>
                                            <span>Badge</span>
                                            <span><i className="fas fa-certificate"/></span>
                                        </p>
                                        <p>
                                            <span>Points</span>
                                            <span>20,000</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar_menu">
                            <ul>
                                <li><Link to="#"><i className="fas fa-home"/> Home</Link></li>
                                <li><Link to="#"><i className="fas fa-user-alt"/> Profile</Link></li>
                                <li><Link to="#"><i className="fas fa-users"/> Groups</Link></li>
                                <li><Link to="#"><i className="fas fa-gift"/> Rewards</Link></li>
                                <li><Link to="#"><i className="fas fa-comments"/> My Conversations</Link></li>
                                <li><Link to="#"><i className="fas fa-user-friends"/> My CFG Family</Link></li>
                                <li><Link to="#"><i className="far fa-calendar-alt"/> Events</Link></li>
                                <li><Link to="#"><i className="fas fa-tools"/> CFG Tools</Link></li>
                                <li><Link to="#"><i className="fas fa-comment-dots"/> Host a Conversation</Link></li>
                            </ul>
                        </div>
                        <div className="sidebar_footer">
                            <h3>Version</h3>
                            <p>JMMB Foundation CFG v1.0.1</p>
                            <p>Jesse framework v2.1</p>
                        </div>
                    </nav>
                </div>

            </>
        );
    }
}

export default Header;
