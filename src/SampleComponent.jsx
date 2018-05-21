import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sampleAction } from './actions';

const mapStateToProps = function (state) {
    return {
        word: state.sample.user,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        doClick: () => {
            dispatch(sampleAction());
        },
    };
};

const SampleComponent = class extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.doClick();
    }

    render() {
        return (
            <div>
                <h1 className="title">{this.props.word}</h1>
                <button onClick={this.handleClick}>Click Me</button>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleComponent);
