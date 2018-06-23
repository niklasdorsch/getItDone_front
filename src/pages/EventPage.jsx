import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import EventRequirementComponent from '../components/EventRequirementComponent';
import EventMetadataContainer from '../components/EventMetadataContainer';
import MessageComponent from '../components/MessageComponent';

import { getEventInformation, clearCurrentEvent, deleteEvent } from '../state/actions';
import { getEditEventPageURL } from '../state/routes';

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
        // this.props.clearCurrentEvent();
    }

    handleEdit = () => {
        this.props.history.push(getEditEventPageURL(this.props.match.params.eventid));
    }

    handleDelete = () => {
        this.props.deleteEvent(this.props.match.params.eventid);
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

        const editSection = (this.props.currentEvent.isOwner)
            ? (
                <div className="level">
                    <div className="level-left" />
                    <div className="level-right">
                        <p className="level-item">
                            <button className="button is-warning" onClick={this.handleEdit}>Edit</button>
                        </p>
                        <p className="level-item">
                            <button className="button is-danger" onClick={this.handleDelete}>Delete</button>
                        </p>
                    </div>
                </div>
            ) : null;

        const { requirements } = this.props;

        return (
            <div>
                <section className="section">
                    {editSection}
                    <EventMetadataContainer currentEvent={this.props.currentEvent} />
                    <br />
                    <div className="container">
                        <p className="title is-4">
                            What needs to get done
                        </p>
                        {(requirements && Object.keys(requirements).length > 0)
                            ?
                            Object.entries(requirements).map(([id, requirement]) => (
                                <div key={requirement.requirementid}>
                                    <EventRequirementComponent
                                        id={id}
                                        current={requirement.current}
                                        total={requirement.total}
                                        userTotal={requirement.user}
                                        name={requirement.name}
                                        description={requirement.description}
                                        userContributions={requirement.userContributions}
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
        requirements: state.event.requirements,
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
        deleteEvent: (...args) => {
            dispatch(deleteEvent(...args));
        },
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(EventPage);
