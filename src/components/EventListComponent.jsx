import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { addUserInfo } from '../state/actions';
import { auth, provider } from '../state/firebase';


import { LANDING } from '../state/routes';


const EventListComponent = class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Organizers</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="event-list-row" href="/">
                        <td>event 1</td>
                        <td>event 1</td>
                        <td>event 1</td>
                        <td>event 1</td>
                    </tr>
                </tbody>
            </table>
        );
    }
};


const mapStateToProps = function (state) {
    return {
        word: state.sample.user,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        addUserInfo: (...args) => {
            dispatch(addUserInfo(...args));
        },
    };
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(EventListComponent);
