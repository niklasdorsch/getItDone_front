import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRequirementContributors } from '../../state/actions';
import { getUserPageURL } from '../../state/routes';

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
        if (this.props.loading) {
            return (
                <div className="has-text-centered">
                    Loading . . .
                </div>
            );
        }
        const details = (this.state.isToggled && this.props.userContributions)
            ? (
                <div className="container level">
                    <div className="level-item">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Amount Contributed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.userContributions.map((userContribution) => {
                                    return (
                                        <tr key={userContribution.userId}>
                                            <td>
                                                { (this.props.isPublic) ?
                                                    (
                                                        <p>{ userContribution.name }</p>
                                                    )
                                                    :
                                                    (
                                                        <a href={getUserPageURL(userContribution.userId)}>
                                                            { userContribution.name }
                                                        </a>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                { userContribution.amount }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
            : null;

        return (
            <div>
                { details }
                <div className="has-text-centered">
                    <button
                        className="button"
                        onClick={this.toggle}
                    >
                        {(this.state.isToggled) ? 'Hide' : 'Show'} Details
                    </button>
                </div>
            </div>
        );
    }
};

const mapStateToProps = function (state) {
    return {
        loading: state.event.requirementDetailsLoading,
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

