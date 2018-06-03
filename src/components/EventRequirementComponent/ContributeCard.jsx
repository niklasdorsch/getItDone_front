import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitNewContribution } from '../../state/actions';

const mapStateToProps = function (state) {
    return {
        error: state.sample.user,
        inputValue: 1,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        submitNewContribution: () => {
            dispatch(submitNewContribution());
        },
    };
};

const ProgressBar = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            inputValue: 1,
        };
    }

    submitNewContribution = () => {
        this.props.submitNewContribution();
        this.props.toggleContribute();
    }

    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    render() {
        return (
            <div className="column is-4">
                <div className="box">
                    <p className="subtitle">
                        How many {this.props.name} would you like to contribute?
                    </p>
                    <div className="field">
                        <input
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}
                            className="input is-rounded"
                            type="number"
                            placeholder="Amount"
                        />
                    </div>
                    <div className="level">
                        <div className="level-left">
                            <div className="has-text-danger">
                                {this.state.error ? this.state.error : null}
                            </div>
                        </div>
                        <div className="level-right">
                            <button
                                className="button is-primary is-pulled-right"
                                onClick={this.submitNewContribution}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);

