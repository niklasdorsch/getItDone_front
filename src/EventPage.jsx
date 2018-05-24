import React, { Component } from 'react';
import EventRequirementComponent from './EventRequirementComponent';

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
                <section className="section">
                    <div className="container">
                        <p className="title is-1">
                            Event Name
                        </p>
                        <p className="subtitle has-text-grey is-3">
                            May, 4th 2018
                        </p>
                    </div>
                    <div className="container">
                        <p className="subtitle has-text-grey-dark is-5">
                            Organzied by <a href="google.com">The people of the internet</a>
                        </p>
                        <div className="container">
                            <p className="title is-4">
                                Description
                            </p>
                            <p className="">
                                Quisque aliquam cursus urna, non bibendum
                                 massa Quisque aliquam cursus urna,
                                non bibendum massa Quisque aliquam cursus urna,
                                non bibendum massa Quisque aliquam cursus
                                urna, non bibendum massa Quisque aliquam
                                cursus urna, non bibendum massa
                            </p>
                        </div>
                    </div>
                    <br />
                    <div className="container">
                        <p className="title is-4">
                            What needs to get done
                        </p>
                        <EventRequirementComponent
                            current={5}
                            total={10}
                            name="Sheep"
                            description="We need these to look fluffy"
                        />
                        <EventRequirementComponent
                            current={5}
                            total={10}
                            name="Sheep"
                        />
                    </div>
                </section>
            </div>
        );
    }
};

export default EventPage;
