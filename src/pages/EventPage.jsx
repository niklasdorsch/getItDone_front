import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import EventRequirementComponent from '../components/EventRequirementComponent';
import EventMetadataContainer from '../components/EventMetadataContainer';

import { getEventInformation, clearCurrentEvent } from '../state/actions';

const EventPage = class extends Component {
    constructor(props) {
        super(props);
        this.props.clearCurrentEvent();
        this.state = {
            item: 'sa',
        };
    }

    componentDidMount() {
        this.props.getEventInformation(this.props.match.params.eventid);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className="section">
                    <p className="title is-1">
                        Loading...
                    </p>
                </div>
            );
        }
        if (!this.props.currentEvent) {
            return (
                <div className="section">
                    <p className="title is-1">
                        Event not found.
                    </p>
                </div>
            );
        }
        return (
            <div>
                <section className="section">
                    <EventMetadataContainer currentEvent={this.props.currentEvent} />
                    <br />
                    <div className="container">
                        <p className="title is-4">
                            What needs to get done
                        </p>
                        {this.props.currentEvent.requirements.map(requirement => (
                            <div key={requirement.requirementid}>
                                <EventRequirementComponent
                                    current={requirement.current}
                                    total={requirement.total}
                                    userTotal={requirement.user}
                                    name={requirement.name}
                                    description={requirement.description}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        );
    }
};

const mapStateToProps = function (state) {
    return {
        currentEvent: state.sample.currentEvent,
        isLoading: state.sample.eventIsLoading,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        getEventInformation: (...args) => {
            dispatch(getEventInformation(...args));
        },
        clearCurrentEvent: () => {
            dispatch(clearCurrentEvent());
        },
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(EventPage);
