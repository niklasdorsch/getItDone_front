import React, { Component } from 'react';

import EventListComponent from '../components/EventListComponent';


const EventListPage = class extends Component {
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
                <EventListComponent />
            </div>
        );
    }
};

export default EventListPage;
