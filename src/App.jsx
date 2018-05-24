import { hot } from 'react-hot-loader';
import 'bulma/css/bulma.css';
import React from 'react';
import SampleComponent from './SampleComponent';
import LoginComponent from './LoginComponent';
import EventPage from './EventPage';
import Toolbar from './Toolbar';


const App = () => (
    <div>
        <Toolbar />
        <EventPage />
        <LoginComponent />
    </div>
);

export default hot(module)(App);
