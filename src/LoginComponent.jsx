import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sampleAction } from './actions';
import { auth, provider } from './firebase';

const mapStateToProps = function (state) {
    return {
        word: state.sample.user,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        doClick: () => {
            dispatch(sampleAction());
        },
    };
};

const LoginComponent = class extends Component {
    static updateLoggedInState(res) {
        console.log(res);
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            user: null,
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }


    componentDidMount() {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '165917417435636',
                cookie: true,
                xfbml: true,
                version: 'v2.8',
            });
            window.FB.AppEvents.logPageView();

            window.FB.Event.subscribe('auth.statusChange', (res) => {
                if (res.authResponse) {
                    LoginComponent.updateLoggedInState(res);
                } else {
                    LoginComponent.updateLoggedInState();
                }
            });
        };


        (function (d, s, id) {
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            const js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    async login() {
        const result = await auth().signInWithPopup(provider);
        console.log(result);
        this.setState({ user: result.user });
    }

    async logout() {
        await auth().signOut();
        this.setState({ user: null });
    }

    handleClick() {
        this.props.doClick();
    }

    render() {
        return (
            <div>
                <div
                    className="fb-login-button"
                    data-max-rows="1"
                    data-size="large"
                    data-button-type="continue_with"
                    data-show-faces="false"
                    data-auto-logout-link="false"
                    data-use-continue-as="false"
                />
                <div className="App">
                    <p>{this.state.user ? `Hi, ${this.state.user.displayName}!` : 'Hi!'}</p>
                    <button onClick={this.login}>
                      Login with Facebook
                    </button>

                    <button onClick={this.logout}>
                      Logout
                    </button>
                </div>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
