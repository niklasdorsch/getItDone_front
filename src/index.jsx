import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import todoApp from './state/reducers';
import App from './App';
import './style.css';
import StateLoader from './state/StateLoader';


require('babel-polyfill');

const loggerMiddleware = createLogger({
    collapsed: true,
    level: 'info',
});

const stateLoader = StateLoader();

let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, loggerMiddleware];
}


const store = createStore(todoApp, stateLoader.loadState(), applyMiddleware(...middleware));
store.subscribe(() => {
    stateLoader.saveState(store.getState());
});


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-js-content'),
);
