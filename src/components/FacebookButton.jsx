import React, { Component } from 'react';


const buttonStyle = {
    MozUserSelect: 'none',
    background: '#2A49A5',
    border: '1px solid #082783',
    boxShadow: '0 1px #4C6BC7 inset',
    color: 'white',
    padding: '6px 10px',
    textDecoration: 'none',
    textShadow: '0 -1px 0 #082783',
    font: '24px Verdana, sans-serif',
    cursor: 'crosshair',
};

const FacebookButton = class extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }
    async login() {
        await this.props.method();
    }
    render() {
        return (
            <button onClick={this.login} style={buttonStyle}>
                Login with Facebook
            </button>
        );
    }
};

export default FacebookButton;
