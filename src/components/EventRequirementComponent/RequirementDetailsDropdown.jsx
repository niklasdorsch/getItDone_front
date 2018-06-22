import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRequirementContributors } from '../../state/actions';

const DetailDropdown = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggled: false,
        };
    }

    toggle = () => {
        this.setState((prev) => {
            if (!prev.isToggled) {
                this.props.getRequirementContributors(this.props.id);
            }
            return { isToggled: !prev.isToggled };
        });
    }

    render() {
        return (
            <div className="has-text-centered">
                <button
                    className="button"
                    onClick={this.toggle}
                >
                    {(this.state.isToggled) ? 'Hide' : 'Show'} Details
                </button>
            </div>
        );
    }
};

const mapStateToProps = function (state) {
    return {
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        getRequirementContributors: (...args) => {
            dispatch(getRequirementContributors(...args));
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DetailDropdown);

