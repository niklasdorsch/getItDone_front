
import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import { history } from './history';

import todoApp from './reducers';


const loggerMiddleware = createLogger({
    collapsed: true,
    level: 'info',
});

const routerMW = routerMiddleware(history);


let middleware = [
    thunk,
    routerMW,
];


if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, loggerMiddleware];
}

const store = createStore(todoApp, applyMiddleware(...middleware));


module.exports = {
    store,
};
