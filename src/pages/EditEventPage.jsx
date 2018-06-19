import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import EditEventComponent from '../components/EditEventComponent';
import MessageComponent from '../components/MessageComponent';

import { editEvent } from '../state/actions';

const EditEventPage = props => (
    (props.currentEvent && Object.keys(props.currentEvent).length > 0)
        ?
        (<EditEventComponent
            submitMethod={props.editEvent}
            title="Edit Event"
            initialState={props.currentEvent}
            requirements={props.requirements}
        />)
        :
        <MessageComponent message="Cannot currently edit event" />
);


const mapStateToProps = function (state) {
    return {
        currentEvent: state.event.currentEvent,
        requirements: state.event.requirements,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        editEvent: (...args) => {
            dispatch(editEvent(...args));
        },
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(EditEventPage);
