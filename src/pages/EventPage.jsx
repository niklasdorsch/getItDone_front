import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import EventRequirementComponent from '../components/EventRequirementComponent';
import EventMetadataContainer from '../components/EventMetadataContainer';

import { getEventInformation } from '../state/actions';

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

    render() {
        if (Object.keys(this.props.currentEvent).length === 0) {
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
                        {Object.entries(this.props.currentEvent.requirements).map(([key, value]) => {
                            console.log(value);
                            return (
                                <div key={key}>
                                    <EventRequirementComponent
                                        current={value.numCurrent}
                                        total={value.numNeeded}
                                        userTotal={value.numThisUser}
                                        name={value.item}
                                        description={value.description}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        );
    }
};

const mapStateToProps = function (state) {
    return {
        currentEvent: state.sample.currentEvent,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        getEventInformation: (...args) => {
            dispatch(getEventInformation(...args));
        },
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(EventPage);
