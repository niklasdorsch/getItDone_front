import React, { Component } from 'react';


const ProgressBar = class extends Component {
    toggleContribute = () => {
        this.props.toggleContribute();
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
                            className="input is-rounded"
                            type="number"
                            placeholder="Rounded input"
                            value="1"
                        />
                    </div>
                    <div className="level">
                        <div className="level-left">
                            <div className="has-text-danger">
                                {this.props.error ? this.props.error : null}
                            </div>
                        </div>
                        <div className="level-right">
                            <button
                                className="button is-primary is-pulled-right"
                                onClick={this.toggleContribute}
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

export default ProgressBar;
