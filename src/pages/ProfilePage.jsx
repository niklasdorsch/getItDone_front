import React, { Component } from 'react';
import LogoutButton from '../components/LogoutButton';

const EventPage = class extends Component {
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
                <div className="container">
                    <p className="title">
                        Profile Page
                    </p>
                    <p className="subtitle">
                        Profile page is not implemented
                    </p>
                    <LogoutButton />
                </div>
            </div>
        );
    }
};

export default EventPage;
