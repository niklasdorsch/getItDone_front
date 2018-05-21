import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import todoApp from './reducers';
import App from './App';
import './style.css';

require('babel-polyfill');

const store = createStore(todoApp, applyMiddleware(logger));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-js-content'),
);

