import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
    ADD_USER_INFO, LOGOUT_USER,
    RECEIVING_CURRENT_EVENT_INFO,
    SENDING_CURRENT_EVENT_INFO,
    RECEIVING_ALL_EVENTS, SEND_ALL_EVENTS, CLEAR_CURRENT_EVENT,
    RECEIVING_REQUIREMENT_CONTRIBUTION, RECEIVING_USER_EVENTS, SEND_USER_EVENTS,
    RECEIVE_DELETE_EVENT,
    RECEIVE_REQUIREMENT_CONTRIBUTION, SEND_REQUIREMENT_CONTRIBUTION,
    RECEIVE_IS_FOLLOWING_EVENT, FINISHED_INITIALIZING,
} from './actions';


const updateUserContribution = (state, action) => {
    const { requirementId, amount } = action;
    const { [requirementId]: thisRequirement, ...otherRequirements } = state.requirements;
    const { current, user: userAmount, ...rest } = thisRequirement;
    const newCurrent = current + (amount - userAmount);
    return {
        requirements: {
            [requirementId]: {
                current: newCurrent,
                user: amount,
                ...rest,
            },
            ...otherRequirements,
        },
    };
};

const updateRequirementDetail = (state, action) => {
    const { userContributions, requirementId } = action;
    const { [requirementId]: thisRequirement, ...otherRequirements } = state.requirements;
    delete thisRequirement.userContributions;
    const { ...rest } = thisRequirement;
    return {
        requirements: {
            [requirementId]: {
                userContributions,
                ...rest,
            },
            ...otherRequirements,
        },
    };
};

const defaultEventState = {
    currentEvent: {},
    eventIsLoading: true,
    requirementDetailsLoading: false,
};

function event(state = defaultEventState, action) {
    switch (action.type) {
    case SENDING_CURRENT_EVENT_INFO:
        return Object.assign({}, state, { currentEvent: action.info, eventIsLoading: true });
    case RECEIVING_CURRENT_EVENT_INFO:
        return Object.assign({}, state, {
            currentEvent: action.event,
            requirements: action.requirements,
            eventIsLoading: false,
            isFollowing: action.isFollowing,
        });
    case CLEAR_CURRENT_EVENT:
        return Object.assign({}, state, { currentEvent: null, eventIsLoading: true });
    case RECEIVING_REQUIREMENT_CONTRIBUTION:
        return Object.assign({}, state, updateUserContribution(state, action));
    case RECEIVE_DELETE_EVENT:
        return Object.assign({}, state, { deleteMessage: action.message, deleteError: action.error });
    case SEND_REQUIREMENT_CONTRIBUTION:
        return Object.assign({}, state, { requirementDetailsLoading: true });
    case RECEIVE_REQUIREMENT_CONTRIBUTION:
        return Object.assign({}, state, updateRequirementDetail(state, action), { requirementDetailsLoading: false });
    case RECEIVE_IS_FOLLOWING_EVENT:
        return Object.assign({}, state, { isFollowing: action.isFollowing });
    default:
        return state;
    }
}

const defaultUserState = {
    isInitializing: true,
};

function user(state = defaultUserState, action) {
    switch (action.type) {
    case ADD_USER_INFO:
        return Object.assign({}, state, { uid: action.uid, token: action.token });
    case LOGOUT_USER:
        return Object.assign({}, { uid: null, token: null });
    case FINISHED_INITIALIZING:
        return Object.assign({}, state, { isInitializing: false });
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
    userEvents: {},
    waitingForEvents: false,
};
function eventDash(state = defaultEventDashState, action) {
    switch (action.type) {
    case SEND_ALL_EVENTS:
        return Object.assign({}, state, { waitingForEvents: true });
    case SEND_USER_EVENTS:
        return Object.assign({}, state, { waitingForEvents: true });
    case RECEIVING_ALL_EVENTS:
        return Object.assign({}, state, { events: action.events, waitingForEvents: false });
    case RECEIVING_USER_EVENTS:
        return Object.assign({}, state, { userEvents: action.events, waitingForEvents: false });
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
