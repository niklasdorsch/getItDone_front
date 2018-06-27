import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { getUserEvents } from '../state/actions';

import EventListComponent from '../components/EventListComponent';
import MessageComponent from '../components/MessageComponent';


const EventListPage = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: 'sa',
        };
    }

    componentDidMount() {
        this.props.getUserEvents();
    }

    render() {
        if (this.props.waiting) {
            return (
                <MessageComponent message="Waiting to load resources" />
            );
        }
        if (!this.props.userEvents || Object.keys(this.props.userEvents).length === 0) {
            return (
                <MessageComponent
                    message="Could not load events, you may not own any events"
                    submessage="Try reloading"
                />
            );
        }
        return (
            <div className="section">
                <div className="container">
                    <p className="title">
                        Your Events
                    </p>
                    <p className="subtitle">
                        Private events that you are putting on or following
                    </p>
                </div>
                <br />
                <EventListComponent events={this.props.userEvents} />
            </div>
        );
    }
};


const mapStateToProps = function (state) {
    return {
        userEvents: state.eventDash.userEvents,
        waiting: state.eventDash.waitingForEvents,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        getUserEvents: () => {
            dispatch(getUserEvents());
        },
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(EventListPage);

