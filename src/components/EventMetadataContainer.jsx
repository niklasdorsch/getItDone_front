import React, { Component } from 'react';
import MomentComponent from './MomentComponent';

import { getUserPageURL } from '../state/routes';


const EventMetadataContainer = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: 'sa',
        };
    }

    render() {
        const {
            name,
            date,
            description,
            owners,
        } = this.props.currentEvent;

        return (
            <div>
                <div className="container">
                    <p className="title is-1">
                        {name}
                    </p>
                    <p className="subtitle has-text-grey is-3">
                        <MomentComponent timestamp={date} />
                    </p>
                </div>
                <br />
                <div className="container">
                    <p className="subtitle has-text-grey-dark is-5">
                        <span>
                            Organzied by&nbsp;
                            {Object.entries(owners).map(([key, value]) =>
                                <a key={key} href={getUserPageURL(key)}>{value.name}&nbsp;</a>)}
                        </span>
                    </p>
                    <div className="container">
                        <p className="title is-4">
                            Description
                        </p>
                        <p className="">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default EventMetadataContainer;
