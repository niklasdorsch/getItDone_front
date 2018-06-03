import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { addUserInfo } from '../state/actions';
import { auth, provider } from '../state/firebase';

import FacebookButton from './FacebookButton';

import { LANDING } from '../state/routes';

const LoginComponent = class extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    async login() {
        const result = await auth()
            .signInWithPopup(provider)
            .catch((e) => {
                console.log(e);
            })
            .then((result1) => {
                this.props.history.push(LANDING);
                console.log('in then of signin function');
                console.log(result1);
                return result1;
            });
        this.props.addUserInfo(result);
    }

    render() {
        return (
            <div>
                <section className="hero is-fullheight">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="column is-4 is-offset-4">
                                <h3 className="title has-text-grey">Get it done</h3>
                                <p className="subtitle has-text-grey">
                                    An app that let&#39;s you crowdsource your event
                                </p>
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

const mapDispatchToProps = function (dispatch) {
    return {
        addUserInfo: (...args) => {
            dispatch(addUserInfo(...args));
        },
    };
};

export default compose(
    connect(null, mapDispatchToProps),
    withRouter,
)(LoginComponent);
