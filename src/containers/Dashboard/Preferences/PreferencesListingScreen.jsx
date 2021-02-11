import React, {Component} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from "react-router-dom";
import Header from "../../../components/Header";
import Datatable from "../../../components/Datatable/Datatable";
import {getPreferences} from '../../../store/actions/preferences.actions';
import {push} from 'connected-react-router';
import {connect} from "react-redux";
import _ from 'lodash';

class PreferencesListingScreen extends Component {
    state = {
        preference: []
    }

    componentDidMount() {
        this.props["getPreferences"]();
    }


    render() {
        const columns = [
            {
                name: 'ID',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Option',
                selector: 'option_name',
            },
            {
                name: 'Value',
                selector: 'option_value'
            },
            {
                name: 'Description',
                selector: 'description',
            }
        ];
        const conditionalRowStyles = [
            {
                when: row => row.isEven,
                style: {
                    backgroundColor: '#daf4f7',
                },
            }
        ];

        return (
            <>
                <article>
                    <Helmet>
                        <title>Preferences</title>
                        <meta
                            name="description"
                            content="A React.js Boilerplate application homepage"
                        />
                    </Helmet>
                </article>
                <Header/>
                <main>
                    <div className="dash-wrapper">
                        <div className="row dash-session-header">
                            <div className="col-md-8">
                                <label style={{
                                    "fontSize": "1rem",
                                    "fontWeight": "700"
                                }}> Preferences </label>
                                <Link to={`#`} type="button"
                                      className="button-title-small button_inline m-l-15 um_primary_button">
                                    <i className="fas fa-plus-circle"/> Add new
                                </Link>
                            </div>
                        </div>
                        <div className={"row"}>
                            {/*<div className={"col-md-1"}/>*/}
                            <div className={"col-md-12"}>
                                <Datatable
                                    data={this.props.preferences}
                                    columns={columns}
                                    handleSelected={this.handleSelected}
                                    conditionalRowStyles={conditionalRowStyles}
                                    onRowClicked={this.onRowClicked}
                                />
                            </div>
                            {/*<div className={"col-md-1"}/>*/}
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

function mapPropsToState(store) {
    return {
        preferences: _.get(store, 'preferences.all', [])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPreferences: () => dispatch(getPreferences()),
        push: (param) => dispatch(push(param)),
    };
};
export default connect(mapPropsToState, mapDispatchToProps)(PreferencesListingScreen);
