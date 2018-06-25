import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { logoutUser } from '../state/actions';

import { LANDING } from '../state/routes';

const LogoutComponent = class extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logoutUser();
        this.props.history.push(LANDING);
    }

    render() {
        return (
            <div>
                <button className="button is-primary is-size-4" onClick={this.logout}>
                    Log out
                </button>
            </div>
        );
    }
};


const mapDispatchToProps = function (dispatch) {
    return {
        logoutUser: (...args) => {
            dispatch(logoutUser(...args));
        },
    };
};


export default compose(
    connect(null, mapDispatchToProps),
    withRouter,
)(LogoutComponent);
