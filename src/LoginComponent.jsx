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
                <div className="App">
                    <p>{this.state.user ? `Hi, ${this.state.user.displayName}!` : 'Hi!'}</p>
                    <button onClick={this.login}>
                      Login with Facebook
                    </button>

                    <button onClick={this.logout}>
                      Logout
                    </button>
                </div>

                <section className="hero is-success is-fullheight">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="column is-4 is-offset-4">
                                <h3 className="title has-text-grey">Login</h3>
                                <p className="subtitle has-text-grey">Please login to proceed.</p>
                                <div className="box">
                                    <figure className="avatar">
                                        <img src="https://placehold.it/128x128" alt="Placeholder" />
                                    </figure>
                                </div>
                                <p className="has-text-grey">
                                    <a href="../">Sign Up</a> &nbsp;·&nbsp;
                                    <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                                    <a href="../">Need Help?</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
