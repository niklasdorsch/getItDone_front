import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import './style.css';
import { stateLoader } from './state/StateLoader';
import { store } from './state/reduxStore';

require('babel-polyfill');

store.subscribe(() => {
    stateLoader.saveLoginState(store.getState());
});


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-js-content'),
);
