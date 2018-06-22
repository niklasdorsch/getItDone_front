import React, { Component } from 'react';

import RequirementDetailsDropdown from './RequirementDetailsDropdown';

const toPercentString = (numerator, denominator) => String(Math.ceil((numerator / denominator) * 100));


const ProgressBar = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsToggled: false,
        };
    }

    toggleContribute = () => {
        this.props.toggleContribute();
    }

    render() {
        return (
            <div className="box">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div>
                                <div className="title">
                                    {this.props.name}
                                </div>
                                <div className="">
                                    {this.props.description}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button className="button is-primary" onClick={this.props.toggleContribute}>
                                {this.props.isContributing ? 'Cancel' : 'Contribute'}
                            </button>
                        </div>
                    </div>
                </div>
                <article className="media">
                    <figure className="media-left">
                        <p className="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="item" />
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <div>
                                <div className="is-grey">
                                    <b>{this.props.current}/{this.props.total}</b> - Total
                                </div>
                                <progress
                                    className="progress is-success"
                                    value={toPercentString(this.props.current, this.props.total)}
                                    max="100"
                                />
                                <div className="is-grey">
                                    <b>{this.props.userTotal}/{this.props.total}</b> - Your contribution
                                </div>
                                <progress
                                    className="progress is-warning"
                                    value={toPercentString(this.props.userTotal, this.props.total)}
                                    max="100"
                                />
                            </div>
                        </div>
                    </div>
                </article>
                <RequirementDetailsDropdown {...this.props} />
            </div>
        );
    }
};

export default ProgressBar;
