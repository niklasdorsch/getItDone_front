import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import ContributeCard from './ContributeCard';

const EventRequirementComponent = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isContributing: false,
        };
    }


    toggleContribute = () => {
        this.setState(prev => ({ isContributing: !prev.isContributing }));
    }


    render() {
        return (
            <div className="columns">
                <div className="column">
                    <ProgressBar
                        {...this.props}
                        toggleContribute={this.toggleContribute}
                    />
                </div>
                {this.state.isContributing ? (
                    <ContributeCard
                        {...this.props}
                        toggleContribute={this.toggleContribute}
                    />
                ) : (
                    null
                )}
            </div>
        );
    }
};

export default EventRequirementComponent;
