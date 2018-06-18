import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import EventRequirementComponent from '../components/EventRequirementComponent';
import EventMetadataContainer from '../components/EventMetadataContainer';
import MessageComponent from '../components/MessageComponent';

import { getEventInformation, clearCurrentEvent } from '../state/actions';

const EventPage = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: 'sa',
        };
    }

    componentDidMount() {
        this.props.getEventInformation(this.props.match.params.eventid);
    }

    componentWillUnmount() {
        this.props.clearCurrentEvent();
    }

    render() {
        if (this.props.isLoading) {
            return (
                <MessageComponent message="Loading..." />
            );
        }
        if (!this.props.currentEvent || this.props.currentEvent.error) {
            return (
                <MessageComponent message="Event not found." />
            );
        }
        const { requirements } = this.props.currentEvent;

        return (
            <div>
                <section className="section">
                    <EventMetadataContainer currentEvent={this.props.currentEvent} />
                    <br />
                    <div className="container">
                        <p className="title is-4">
                            What needs to get done
                        </p>
                        {(requirements && Object.keys(requirements).length > 0)
                            ?
                            this.props.currentEvent.requirements.map(requirement => (
                                <div key={requirement.requirementid}>
                                    <EventRequirementComponent
                                        current={requirement.current}
                                        total={requirement.total}
                                        userTotal={requirement.user}
                                        name={requirement.name}
                                        description={requirement.description}
                                    />
                                </div>
                            ))
                            : null
                        }
                    </div>
                </section>
            </div>
        );
    }
};

const mapStateToProps = function (state) {
    return {
        currentEvent: state.event.currentEvent,
        isLoading: state.event.eventIsLoading,
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
