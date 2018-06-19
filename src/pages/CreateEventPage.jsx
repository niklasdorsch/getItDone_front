import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import EditEventComponent from '../components/EditEventComponent';

import { submitNewEvent } from '../state/actions';

const CreateEventPage = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            datetime: '',
            location: '',
            description: '',
            requirements: {},
            isPrivate: true,
            errorMessages: [],
        };
    }

    render() {
        return (
            <EditEventComponent
                submitMethod={this.props.submitNewEvent}
                title="Create Event"
            />
        );
    }
};


const mapDispatchToProps = function (dispatch) {
    return {
        submitNewEvent: (...args) => {
            dispatch(submitNewEvent(...args));
        },
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(CreateEventPage);
