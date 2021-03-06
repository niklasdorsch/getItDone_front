import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MomentComponent from './MomentComponent';

import { getEventPageURL } from '../state/routes';


const EventListComponent = class extends Component {
    constructor(props) {
        super(props);
        this.goToPage = this.goToPage.bind(this);
    }

    goToPage = id => (() => this.props.history.push(getEventPageURL(id)));

    render() {
        return (
            <div className="container">
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.events.map(event => (
                            <tr key={event.eventId} className="event-list-row" onClick={this.goToPage(event.eventId)}>
                                <td>{event.name}</td>
                                <td><MomentComponent timestamp={event.date} /></td>
                                <td>{event.location}</td>
                                <td>{event.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default withRouter(EventListComponent);
