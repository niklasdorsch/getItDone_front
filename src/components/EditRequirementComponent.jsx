import React, { Component } from 'react';


const EditRequirementComponent = class extends Component {
    handleNameChange = (event) => {
        this.props.updateRequirement({
            id: this.props.id,
            item: 'name',
            value: event.target.value,
        });
    }

    handleDescriptionChange = (event) => {
        this.props.updateRequirement({
            id: this.props.id,
            item: 'description',
            value: event.target.value,
        });
    }


    handleNumberChange = (event) => {
        this.props.updateRequirement({
            id: this.props.id,
            item: 'total',
            value: event.target.value,
        });
    }

    render() {
        return (
            <div className="box">
                <div className="columns">
                    <div className="column">
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
                                            value={this.props.name}
                                            onChange={this.handleNameChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label
                                        className="label"
                                        htmlFor={`${this.props.id}-requirement-total-input`}
                                    >
                                        Number needed
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            id={`${this.props.id}-requirement-total-input`}
                                            type="text"
                                            placeholder="Text input"
                                            value={this.props.total}
                                            onChange={this.handleNumberChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label
                                className="label"
                                htmlFor={`${this.props.id}-requirement-description-input`}
                            >
                                Description
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    id={`${this.props.id}-requirement-description-input`}
                                    type="text"
                                    placeholder="Text input"
                                    value={this.props.description}
                                    onChange={this.handleDescriptionChange}
                                />
                            </div>
                        </div>
                    </div>
                    {(this.props.canRemove) ?
                        <div className="column is-1">
                            <button
                                className="button is-danger is-2 is-offset-10"
                                onClick={this.props.removeMethod}
                            >
                                Remove
                            </button>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
};

export default EditRequirementComponent;
