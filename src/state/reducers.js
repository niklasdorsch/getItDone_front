import { combineReducers } from 'redux';
import {
    ACTION, ADD_USER_INFO, LOGOUT_USER, RECEIVING_CURRENT_EVENT_INFO,
    SENDING_CURRENT_EVENT_INFO,
    RECEIVING_ALL_EVENTS, CLEAR_CURRENT_EVENT,
} from './actions';

const defaultSampleState = {
    user: '1',
    currentEvent: {},
};

function sample(state = defaultSampleState, action) {
    switch (action.type) {
    case ACTION:
        return Object.assign({}, state, { user: `${state.user}+1` });
    case SENDING_CURRENT_EVENT_INFO:
        return Object.assign({}, state, { currentEvent: action.info, eventIsLoading: true });
    case RECEIVING_CURRENT_EVENT_INFO:
        return Object.assign({}, state, { currentEvent: action.info, eventIsLoading: false });
    case CLEAR_CURRENT_EVENT:
        return Object.assign({}, state, { currentEvent: null });

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
    default:
        return state;
    }
}


const defaultEventDashState = {};
function eventDash(state = defaultEventDashState, action) {
    switch (action.type) {
    case RECEIVING_ALL_EVENTS:
        return Object.assign({}, state, { events: action.info });
    default:
        return state;
    }
}


const todoApp = combineReducers({
    sample, user, requirements, eventDash,
});

export default todoApp;
