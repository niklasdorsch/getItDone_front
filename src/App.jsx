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
import { MoonLoader } from 'react-spinners';

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

        let inside = (this.props.isLoggedIn) ?
            (
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
            ) :
            (
                <div>
                    <Switch>
                        <Route path={routes.EVENT_PAGE} component={EventPage} />
                        <Route exact path={routes.LANDING} component={LoginComponent} />
                        <Route component={redirectToLanding} />
                    </Switch>
                </div>
            );

        if (this.props.isInitializing) {
            inside =
                (
                    <section className="hero is-fullheight">
                        <div className="hero-body">
                            <div className="container has-text-centered">
                                <div className="column is-4 is-offset-4">
                                    <div style={{ marginLeft: '28%' }}>
                                        <MoonLoader
                                            color="#123abc"
                                            loading={true}
                                            size={100}
                                        />
                                    </div>
                                    <br />
                                    <br />
                                    <div className="title">
                                        Getting loading done
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                );
        }

        return (
            <ConnectedRouter history={history}>
                <div>
                    {inside}
                </div>
            </ConnectedRouter>
        );
    }
};

const mapStateToProps = state => ({
    isLoggedIn: state.user.uid,
    isInitializing: state.user.isInitializing,
});

export default compose(
    hot(module),
    connect(mapStateToProps),
)(App);
