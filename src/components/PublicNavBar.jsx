import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../state/routes';

import Logo from '../assets/logo.png';

const PublicNavBar = () => (
    <section className="hero is-primary">
        <div className="hero-body">
            <nav className="level">
                <p className="level-item has-text-centered">
                    <Link href="#" to={routes.LANDING} className="link is-info is-size-4">
                        <img src={Logo} alt="" style={{ height: '5rem' }} />
                    </Link>
                </p>
                <p className="level-item has-text-centered">
                    <Link href="#" to={routes.LANDING} className="link is-info is-size-4">Sign in to contribute</Link>
                </p>
            </nav>
        </div>
    </section>
);


export default PublicNavBar;
