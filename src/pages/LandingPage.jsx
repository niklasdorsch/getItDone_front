import React, { Component } from 'react';
import LogoutButton from '../components/LogoutButton';
import { Link } from 'react-router-dom';
import { CREATE_EVENT } from '../state/routes';

const LandingPage = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: 'sa',
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="section">
                <div className="container is-size-5">
                    <h1 className="title is-center ">
                        Welcome to getting things done!
                    </h1>
                    <p>
                        Use this app to help organize the things you need for events.
                    </p>
                    <br />
                    <p>
                        Say you are putting on a barbeque.
                        You are gonna need some things.
                    </p>
                    <ul style={{ listStyleType: 'circle', marginLeft:'2em'}}>
                        <li>Hot dogs</li>
                        <li>Salad</li>
                        <li>Lawn chairs</li>
                        <li>Beer</li>
                    </ul>
                    <p>
                        Sadly you only have some of these things.
                    </p>
                    <br />
                    <p className="is-size-4">
                        Here is where the app comes in...
                    </p>
                    <br />
                    <ul>
                        <li>Create an event.</li>
                        <li>Fill in some stuff about when and where.</li>
                        <li>Add all the things you will need.</li>
                        <li>Send your friends a link</li>
                    </ul>
                    <br />
                    <p>
                        They can use the app to tell you what they can bring
                    </p>
                    <br />
                    <p>
                        You can easily reduce the resources you need to make
                        the event happen by having other people help!
                    </p>
                    <p>
                        It&apos;s a group effort.
                    </p>
                    <br />
                    <Link href="#" to={CREATE_EVENT} className="link is-info is-size-3">
                        Click here to create your first event
                    </Link>
                </div>
            </div>
        );
    }
};

export default LandingPage;
