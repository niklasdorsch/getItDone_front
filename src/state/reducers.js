import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
    ADD_USER_INFO, LOGOUT_USER,
    RECEIVING_CURRENT_EVENT_INFO,
    SENDING_CURRENT_EVENT_INFO,
    RECEIVING_ALL_EVENTS, SEND_ALL_EVENTS, CLEAR_CURRENT_EVENT,
} from './actions';

const defaultEventState = {
    currentEvent: {},
    eventIsLoading: true,
};

function event(state = defaultEventState, action) {
    switch (action.type) {
    case SENDING_CURRENT_EVENT_INFO:
        return Object.assign({}, state, { currentEvent: action.info, eventIsLoading: true });
    case RECEIVING_CURRENT_EVENT_INFO:
        return Object.assign({}, state, { currentEvent: action.info, eventIsLoading: false });
    case CLEAR_CURRENT_EVENT:
        return Object.assign({}, state, { currentEvent: null, eventIsLoading: true });
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
        return Object.assign({}, state, { uid: action.uid, token: action.token });
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


const defaultEventDashState = {
    events: {},
    waitingForEvents: false,
};
function eventDash(state = defaultEventDashState, action) {
    switch (action.type) {
    case SEND_ALL_EVENTS:
        return Object.assign({}, state, { waitingForEvents: true });
    case RECEIVING_ALL_EVENTS:
        return Object.assign({}, state, { events: action.info.events, waitingForEvents: false });
    default:
        return state;
    }
}


const todoApp = combineReducers({
    event,
    user,
    requirements,
    eventDash,
    router: routerReducer,
});

export default todoApp;
