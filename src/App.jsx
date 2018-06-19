import { hot } from 'react-hot-loader';
import 'bulma/css/bulma.css';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import React, { Component } from 'react';
import {
    Switch,
    // BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom';

import { ConnectedRouter } from 'react-router-redux';

import * as routes from './state/routes';
import { history } from './state/history';

import LoginComponent from './components/LoginComponent';
import EventPage from './pages/EventPage';
import EventListPage from './pages/EventListPage';
import UserEventListPage from './pages/UserEventListPage';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';

const App = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const redirectToLanding = () => <Redirect to={routes.LANDING} />;
        return (
            <ConnectedRouter history={history}>
                <div>
                    {(this.props.isLoggedIn) ?
                        <div>
                            <Navbar />
                            <Switch>
                                <Route exact path={routes.LANDING} component={LandingPage} />
                                <Route exact path={routes.EVENT_LIST} component={EventListPage} />
                                <Route exact path={routes.PROFILE} component={ProfilePage} />
                                <Route exact path={routes.CREATE_EVENT} component={CreateEventPage} />
                                <Route exact path={routes.EDIT_EVENT} component={EditEventPage} />
                                <Route exact path={routes.USER_EVENT_LIST} component={UserEventListPage} />
                                <Route path={routes.EVENT_PAGE} component={EventPage} />
                                <Route component={NotFoundPage} />
                            </Switch>
                        </div>
                        :
                        <div>
                            <Switch>
                                <Route exact path={routes.LANDING} component={LoginComponent} />
                                <Route component={redirectToLanding} />
                            </Switch>
                        </div>
                    }
                </div>
            </ConnectedRouter>
        );
    }
};

const mapStateToProps = state => ({
    isLoggedIn: state.user.uid,
});

export default compose(
    hot(module),
    connect(mapStateToProps),
)(App);
