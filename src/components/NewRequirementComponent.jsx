import React, { Component } from 'react';


const NewRequirementComponent = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'sa',
            number: null,
        };
    }

    componentDidMount() {
    }

    handleNameChange = (event) => {
        this.props.updateRequirement({
            id: this.props.id,
            item: 'name',
            value: event.target.value,
        });
    }


    handleNumberChange = (event) => {
        this.props.updateRequirement({
            id: this.props.id,
            item: 'number',
            value: event.target.value,
        });
    }

    render() {
        return (
            <div className="box">
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label
                                className="label"
                                htmlFor={`${this.props.id}-requirement-name-input`}
                            >
                                Name
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    id={`${this.props.id}-requirement-name-input`}
                                    type="text"
                                    placeholder="Text input"
                                    onChange={this.handleNameChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label
                                className="label"
                                htmlFor={`${this.props.id}-requirement-number-input`}
                            >
                                Number needed
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    id={`${this.props.id}-requirement-number-input`}
                                    type="text"
                                    placeholder="Text input"
                                    onChange={this.handleNumberChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column is-1">
                        <button
                            className="button is-danger is-2 is-offset-10"
                            onClick={this.props.removeMethod}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default NewRequirementComponent;
