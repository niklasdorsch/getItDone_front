import { combineReducers } from 'redux';
import { ACTION } from './actions';

const defaultSampleState = {
    user: '1',
};

function sample(state = defaultSampleState, action) {
    switch (action.type) {
    case ACTION:
        return Object.assign({}, state, { user: `${state.user}+1` });
    default:
        return state;
    }
}

const todoApp = combineReducers({
    sample,
});

export default todoApp;
