import React, { Component } from 'react';
import Logo from './logo.png';

const Toolbar = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'item',
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <section className="hero is-primary">
                <div className="hero-body">
                    <nav className="level">
                        <p className="level-item has-text-centered">
                            <a href="./" className="link is-info is-size-4">Create Event</a>
                        </p>
                        <p className="level-item has-text-centered">
                            <a href="./" className="link is-info is-size-4">Browse Events</a>
                        </p>
                        <p className="level-item has-text-centered">
                            <img src={Logo} alt="" style={{ height: '5rem' }} />
                        </p>
                        <p className="level-item has-text-centered">
                            <a href="./" className="link is-info is-size-4">My Events</a>
                        </p>
                        <p className="level-item has-text-centered">
                            <a href="./" className="link is-info is-size-4">My Profile</a>
                        </p>
                    </nav>
                </div>
            </section>
        );
    }
};

export default Toolbar;
