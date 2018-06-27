import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { getAllEvents } from '../state/actions';

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
        this.props.getAllEvents();
    }

    render() {
        if (this.props.waiting) {
            return (
                <MessageComponent message="Waiting to load resources" />
            );
        }
        if (!this.props.events || Object.keys(this.props.events).length === 0) {
            return (
                <MessageComponent message="Could not load events, there may be no events" submessage="Try reloading" />
            );
        }
        return (
            <div className="section">
                <div className="container">
                    <p className="title">
                        Events
                    </p>
                    <p className="subtitle">
                        Public events that you can help out with
                    </p>
                </div>
                <br />
                <EventListComponent events={this.props.events} />
            </div>
        );
    }
};


const mapStateToProps = function (state) {
    return {
        events: state.eventDash.events,
        waiting: state.eventDash.waitingForEvents,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        getAllEvents: () => {
            dispatch(getAllEvents());
        },
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(EventListPage);

