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
const store = createStore(todoApp, stateLoader.loadState(), applyMiddleware(thunk, loggerMiddleware));
store.subscribe(() => {
    stateLoader.saveState(store.getState());
});


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-js-content'),
);
