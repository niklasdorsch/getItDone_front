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
            <div>
                <LogoutButton/>
            </div>
        );
    }
};

export default EventPage;
