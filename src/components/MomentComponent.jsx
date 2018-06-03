import React from 'react';
import Moment from 'react-moment';

const calendarStrings = {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L [at] LT',
};

const MomentComponent = props => (
    <Moment calendar={calendarStrings}>
        {props.timestamp}
    </Moment>
);

export default MomentComponent;
