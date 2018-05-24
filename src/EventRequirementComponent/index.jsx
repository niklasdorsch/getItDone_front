import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import ContributeCard from './ContributeCard';

const EventRequirementComponent = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'item',
            isContributing: false,
            badInput: 'Bad error',
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
                        current={5}
                        total={10}
                        name="Sheep"
                        isContributing={this.state.isContributing}
                        description="We need these to look fluffy"
                        toggleContribute={this.toggleContribute}
                    />
                </div>
                {this.state.isContributing ? (
                    <ContributeCard
                        toggleContribute={this.toggleContribute}
                        error="Some error"
                        name="Sheep"
                    />
                ) : (
                    null
                )}
            </div>
        );
    }
};

export default EventRequirementComponent;
