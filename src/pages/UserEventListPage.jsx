import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { getAllEvents } from '../state/actions';

import EventListComponent from '../components/EventListComponent';


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
        return (
            <div className="section">
                <EventListComponent events={this.props.events} />
            </div>
        );
    }
};


const mapStateToProps = function (state) {
    return {
        events: state.eventDash.events,
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

