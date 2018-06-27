import React, { Component } from 'react';
import MomentComponent from './MomentComponent';

import { getUserPageURL } from '../state/routes';

const commaHtml = i => <span key={i}>,&nbsp;</span>;
const andHtml = i => <span key={i}>&nbsp;and&nbsp;</span>;
const htmlArrayToAccumilationStyle = (htmlArray) => {
    if (htmlArray.length < 2) {
        return htmlArray;
    }
    let newArray = [htmlArray[0]];
    for (let i = 1; i < htmlArray.length - 1; i += 1) {
        newArray = newArray.concat([commaHtml(i), htmlArray[i]]);
    }
    newArray = newArray.concat([andHtml(htmlArray.length - 1), htmlArray[htmlArray.length - 1]]);
    return newArray;
};

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
            location,
            isPrivate,
        } = this.props.currentEvent;

        return (
            <div>
                <div className="container">
                    <p className="subtitle has-text-grey is-6">
                        {(isPrivate) ? 'Private event' : 'Public event'}
                    </p>
                    <p className="title is-1">
                        {name}
                    </p>
                    <p className="subtitle has-text-grey is-3">
                        <MomentComponent timestamp={date} />
                    </p>
                    <p className="subtitle has-text-grey is-3">
                        {location}
                    </p>
                </div>
                <br />
                <div className="container">
                    <p className="subtitle has-text-grey-dark is-5">
                        <span>
                            Organzied by&nbsp;
                            {
                                htmlArrayToAccumilationStyle(owners.map((owner) => {
                                    if (this.props.currentEvent.isPublic) {
                                        return (
                                            <span
                                                key={owner.userid}
                                            >
                                                {owner.name}
                                            </span>
                                        );
                                    }
                                    return (
                                        <a
                                            key={owner.userid}
                                            href={getUserPageURL(owner.userid)}
                                        >
                                            {owner.name}
                                        </a>
                                    );
                                }))
                            }
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
