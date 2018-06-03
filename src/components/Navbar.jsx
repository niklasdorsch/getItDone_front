import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../state/routes';

import Logo from '../assets/logo.png';

const Navbar = class extends Component {
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
                            <Link href="#" to={routes.LANDING} className="link is-info is-size-4">Create Event</Link>

                        </p>
                        <p className="level-item has-text-centered">
                            <Link href="#" to={routes.EVENT_LIST} className="link is-info is-size-4">Browse Events</Link>
                        </p>
                        <p className="level-item has-text-centered">
                            <img src={Logo} alt="" style={{ height: '5rem' }} />
                        </p>
                        <p className="level-item has-text-centered">
                            <Link href="#" to={routes.EVENT_PAGE} className="link is-info is-size-4">My Events</Link>
                        </p>
                        <p className="level-item has-text-centered">
                            <Link href="#" to={routes.PROFILE} className="link is-info is-size-4">My Profile</Link>
                        </p>
                    </nav>
                </div>
            </section>
        );
    }
};

export default Navbar;
