import React, { Component } from 'react';

import DateTime from 'react-datetime';
import moment from 'moment';
import NewRequirementComponent from '../components/NewRequirementComponent';


const yesterday = DateTime.moment().subtract(1, 'day');
const isTodayOrFuture = current => current.isAfter(yesterday);


const EditEventComponent = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            datetime: '',
            location: '',
            description: '',
            requirements: {},
            isPrivate: true,
            errorMessages: [],
        };
    }

    componentDidMount() {
        if (Object.keys(this.state.requirements).length === 0) {
            this.addRequirement({ id: 1 });
        }
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleDateTimeChange = (datetime) => {
        this.setState({ datetime });
    }

    handleLocationChange = (event) => {
        this.setState({ location: event.target.value });
    }

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    }

    handlePrivacyRadioButtons = (event) => {
        this.setState({ isPrivate: (event.target.value === 'private') });
    }

    handleAddRequirement = () => {
        this.addRequirement();
    };

    addRequirement = ({
        id,
        name = '',
        number = '',
        description = '',
    } = {}) => {
        this.setState((previousState) => {
            let newId = id;
            if (newId == null) {
                const currentIds = Object.keys(previousState.requirements).map(num => parseInt(num, 10));
                newId = Math.max(...currentIds) || 1;
                while (currentIds.includes(newId)) {
                    newId += 1;
                }
            }
            const newRequirements = Object.assign(previousState.requirements);
            newRequirements[newId] = {
                name,
                number,
                description,
            };
            return {
                requirements: newRequirements,
            };
        });
    }

    handleSubmit = () => {
        console.log('here');
        const errors = this.inputIsValid();
        if (errors.length > 0) {
            this.setState({
                errorMessages: errors,
            });
        } else {
            this.setState({
                errorMessages: [],
            });
            this.props.submitMethod(this.state);
        }
    }

    removeRequirement = id => () => this.setState((previousState) => {
        const newRequirements = Object.assign(previousState.requirements);
        delete newRequirements[id];
        return {
            requirements: newRequirements,
        };
    });

    updateRequirement = ({ id, item, value }) => {
        this.setState((previousState) => {
            const newRequirements = Object.assign(previousState.requirements);
            newRequirements[id][item] = value;
            return { requirements: newRequirements };
        });
    }

    inputIsValid = () => {
        const errors = [];
        if (this.state.name.length === 0) {
            errors.push('Event Name');
        }
        if (this.state.location.length === 0) {
            errors.push('Event Location');
        }
        if (this.state.description.length === 0) {
            errors.push('Event Description');
        }
        if (!moment.isMoment(this.state.datetime)) {
            errors.push('Event date and time');
        }
        if (Object.keys(this.state.requirements).length === 0) {
            errors.push('At least one requirement');
        }
        let check1 = true;
        let check2 = true;
        Object.entries(this.state.requirements).forEach(([, value]) => {
            if (check1 && (value.name.length === 0 || value.number.length === 0)) {
                errors.push('Requirment name and number needed');
                check1 = false;
            }
            const onlyDigits = new RegExp('^\\d+$');
            if (check2
                && value.number.length > 0
                && (!onlyDigits.test(value.number) || parseInt(value.number, 10) < 0)
            ) {
                errors.push('Requirment number should be postive integer');
                check2 = false;
            }
        });
        return errors;
    }


    render() {
        const requirementsHolder = Object.entries(this.state.requirements).map(([key, value]) => (
            <NewRequirementComponent
                key={key}
                id={key}
                name={value.name}
                number={value.number}
                updateRequirement={this.updateRequirement}
                removeMethod={this.removeRequirement(key)}
                canRemove={Object.keys(this.state.requirements).length > 1}
            />
        ));
        let errorMessage = null;
        if (this.state.errorMessages.length > 0) {
            errorMessage = (
                <article className="message is-warning">
                    <div className="message-header">
                        <p>Warning, there were some issues with your input</p>
                    </div>
                    <div className="message-body">
                        <ul style={{ listStyleType: 'circle' }}>
                            {this.state.errorMessages.map((message, i) => <li key={i}>{message}</li>)}
                        </ul>
                    </div>
                </article>
            );
        }

        return (
            <div className="section">
                <div className="container">
                    <div className="title is-2">{this.props.title}</div>
                </div>
                <br />
                <div className="container">
                    <div className="title is-3">Information</div>
                    <div className="field">
                        <div className="control">
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="privacy"
                                    value="public"
                                    onChange={this.handlePrivacyRadioButtons}
                                    checked={!this.state.isPrivate}
                                />
                                Public
                            </label>
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="privacy"
                                    value="private"
                                    onChange={this.handlePrivacyRadioButtons}
                                    checked={this.state.isPrivate}
                                />
                                Private
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="event-input">Event Name</label>
                        <div className="control">
                            <input
                                className="input"
                                id="event-input"
                                type="text"
                                placeholder="Text input"
                                onChange={this.handleNameChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="datetime-picker">Date</label>
                        <DateTime
                            isValidDate={isTodayOrFuture}
                            onChange={this.handleDateTimeChange}
                            inputProps={{
                                placeholder: 'Pick Date',
                                className: 'input form-control',
                                id: 'datetime-picker',
                            }}
                        />
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="location-input">Location</label>
                        <div className="control">
                            <input
                                className="input"
                                id="location-input"
                                type="text"
                                placeholder="Text input"
                                onChange={this.handleLocationChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="description-textarea">Description</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                id="description-textarea"
                                placeholder="Textarea"
                                onChange={this.handleDescriptionChange}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <div className="container">
                    <div className="title is-3">Requirements</div>
                    {requirementsHolder}
                </div>
                <br />
                {errorMessage}
                <div className="container">
                    <div className="level">
                        <div className="level-left">
                            <button
                                className="button is-primary"
                                onClick={this.handleAddRequirement}
                            >
                                Add Requirement
                            </button>
                        </div>
                        <div className="level-right">
                            <button
                                className="button is-primary is-large"
                                onClick={this.handleSubmit}
                            >
                                Submit New Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};


export default EditEventComponent;
