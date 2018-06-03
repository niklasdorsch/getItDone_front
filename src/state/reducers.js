import { combineReducers } from 'redux';
import { ACTION, ADD_USER_INFO, LOGOUT_USER, RECEIVING_CURRENT_EVENT_INFO } from './actions';

const defaultSampleState = {
    user: '1',
    currentEvent: {},
};

function sample(state = defaultSampleState, action) {
    switch (action.type) {
    case ACTION:
        return Object.assign({}, state, { user: `${state.user}+1` });
    case RECEIVING_CURRENT_EVENT_INFO:
        return Object.assign({}, state, { currentEvent: action.info });

    default:
        return state;
    }
}

const defaultUserState = {
    userInfo: null,
};

function user(state = defaultUserState, action) {
    switch (action.type) {
    case ADD_USER_INFO:
        return Object.assign({}, state, { userInfo: action.info });
    case LOGOUT_USER:
        return Object.assign({}, state, { userInfo: null });
    default:
        return state;
    }
}

const defaultRequirementsState = {};

function requirements(state = defaultRequirementsState, action) {
    switch (action.type) {
    case RECEIVING_CURRENT_EVENT_INFO:
        return Object.assign({}, state, action.info.eventRequirments);
    default:
        return state;
    }
}

const todoApp = combineReducers({
    sample, user, requirements,
});

export default todoApp;
