import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import EventRequirementComponent from '../components/EventRequirementComponent';
import EventMetadataContainer from '../components/EventMetadataContainer';
import MessageComponent from '../components/MessageComponent';
import PublicNavBar from '../components/PublicNavBar';

import {
    getEventInformation, getPublicEventInformation, clearCurrentEvent,
    deleteEvent, setFollowEvent,
} from '../state/actions';

import { getEditEventPageURL } from '../state/routes';

const EventPage = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: 'sa',
        };
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.getEventInformation(this.props.match.params.eventId);
        } else {
            this.props.getPublicEventInformation(this.props.match.params.eventId);
        }
    }

    componentWillUnmount() {
        // this.props.clearCurrentEvent();
    }

    handleEdit = () => {
        this.props.history.push(getEditEventPageURL(this.props.match.params.eventId));
    }

    handleDelete = () => {
        this.props.deleteEvent(this.props.match.params.eventId);
    }

    toggleFollow = () => {
        this.props.setFollowEvent({
            isFollowing: !this.props.isFollowing,
            eventId: this.props.match.params.eventId,
        });
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
        const editSection = (
            <div className="container level">
                {(this.props.currentEvent.isPublic) ?
                    (
                        <div className="level-left" />
                    ) :
                    (
                        <div className="level-left">
                            <p className="level-item">
                                <button
                                    className={`button is-primary ${(this.props.isFollowing) ? 'is-outlined' : null}`}
                                    onClick={this.toggleFollow}
                                >
                                    Follow{(this.props.isFollowing) ? 'ing' : null}
                                </button>
                            </p>
                        </div>
                    )
                }
                {(this.props.currentEvent.isOwner) ?
                    (
                        <div className="level-right">
                            <p className="level-item">
                                <button className="button is-warning" onClick={this.handleEdit}>Edit</button>
                            </p>
                            <p className="level-item">
                                <button className="button is-danger" onClick={this.handleDelete}>Delete</button>
                            </p>
                        </div>
                    ) :
                    (
                        <div className="level-right" />
                    )
                }
            </div>
        );

        const { requirements } = this.props;

        return (
            <div>
                {(this.props.currentEvent.isPublic) ?
                    (
                        <PublicNavBar />
                    )
                    : null
                }
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
                                <div key={requirement.requirementId}>
                                    <EventRequirementComponent
                                        id={id}
                                        current={requirement.current}
                                        total={requirement.total}
                                        userTotal={requirement.user}
                                        name={requirement.name}
                                        description={requirement.description}
                                        userContributions={requirement.userContributions}
                                        isPublic={this.props.currentEvent.isPublic}
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
        isFollowing: state.event.isFollowing,
        isLoggedIn: state.user.uid,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        getEventInformation: (...args) => {
            dispatch(getEventInformation(...args));
        },
        getPublicEventInformation: (...args) => {
            dispatch(getPublicEventInformation(...args));
        },
        clearCurrentEvent: () => {
            dispatch(clearCurrentEvent());
        },
        deleteEvent: (...args) => {
            dispatch(deleteEvent(...args));
        },
        setFollowEvent: (...args) => {
            dispatch(setFollowEvent(...args));
        },
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(EventPage);
