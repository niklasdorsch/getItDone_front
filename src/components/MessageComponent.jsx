import React from 'react';

const MessageComponent = props => (
    <div className="container">
        <div className="notification">
            <div className="is-size-4">{props.message}</div>
            {(props.submessage)
                ? (<div className="is-size-5">{props.submessage}</div>)
                : null}
        </div>
    </div>
);

export default MessageComponent;
