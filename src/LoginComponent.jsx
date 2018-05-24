import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sampleAction } from './actions';
import { auth, provider } from './firebase';

import FacebookButton from './FacebookButton';

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
                <section className="hero is-fullheight">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="column is-4 is-offset-4">
                                <h3 className="title has-text-grey">Get it done</h3>
                                <p className="subtitle has-text-grey">An app that let&#39;s you crowdsource your event</p>
                                <FacebookButton method={this.login} />
                                <br />
                                <p className="has-text-grey">
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
