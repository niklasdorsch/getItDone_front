import React, { Component } from 'react';
import LogoutButton from '../components/LogoutButton';

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
                <h1 className="title is-center ">
                    Welcome to getting things done!
                </h1>
                <p>
                    Use this app to help organize the things you need for events.
                    Say you are putting on a barbeque.
                    You are gonna need some things.
                </p>
                <ul>
                    <li>Hot dogs</li>
                    <li>Salad</li>
                    <li>Lawn chairs</li>
                    <li>Beer</li>
                </ul>
                <p>
                    Sadly you only have 1 of these things.
                    Here is where the app comes in.
                    Create an event. Fill in some stuff about it.
                    Add all the things you will need.
                    Send your friends the link or copy it your event page.
                    They can then tell you what they can bring
                </p>
                <p>
                    Now you can easily reduce the resources you need to make
                    the event happen by having other people help!
                    It is a group effort.
                </p>
                <LogoutButton />
            </div>
        );
    }
};

export default LandingPage;
