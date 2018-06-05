export const ACTION = 'ACTION';

export function sampleAction() {
    return { type: ACTION };
}

export const SENDING_CURRENT_EVENT_INFO = 'SENDING_CURRENT_EVENT_INFO';
export const RECEIVING_CURRENT_EVENT_INFO = 'RECEIVING_CURRENT_EVENT_INFO';

function sendEventInformation() {
    return { type: SENDING_CURRENT_EVENT_INFO };
}

function receiveEventInformation(info) {
    return { type: RECEIVING_CURRENT_EVENT_INFO, info };
}

export function getEventInformation(eventID) {
    return function (dispatch) {
        dispatch(sendEventInformation(eventID));
        return fetch(`http://127.0.0.1:10010/getEventInfo?eventID=${eventID}`, {
            mode: 'cors',
            method: 'GET',
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error),
            ).then(resultJSON => dispatch(receiveEventInformation(JSON.parse(resultJSON))));
    };
}

export const RECEIVING_ALL_EVENTS = 'RECEIVING_ALL_EVENTS';
function receiveAllEvents(info) {
    return { type: RECEIVING_ALL_EVENTS, info };
}

export function getAllEvents() {
    return function (dispatch) {
        dispatch(sendEventInformation());
        return fetch('https://getitdone-api.herokuapp.com/getAllevents', {
            mode: 'cors',
            method: 'GET',
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error),
            ).then(resultJSON => {
                console.log(resultJSON);
                console.log(typeof resultJSON);
                return dispatch(receiveAllEvents(resultJSON.events.map(e => JSON.parse(e))));
            });
    };
}

export const ADD_USER_INFO = 'ADD_USER_INFO';
export function addUserInfo(info) {
    return {
        type: ADD_USER_INFO,
        info,
    };
}

export const LOGOUT_USER = 'LOGOUT_USER';
export function logoutUser() {
    return {
        type: LOGOUT_USER,
    };
}


function sendNewContribution() {
    return { type: ACTION };
}

function receiveNewContribution(resultJSON) {
    console.log(resultJSON);
    return { type: ACTION };
}

export function submitNewContribution(name, username) {
    return function (dispatch) {
        dispatch(sendNewContribution(username));
        return fetch('http://127.0.0.1:10010/getEventInfo?eventID=Scott', {
            mode: 'cors',
            method: 'GET',
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error),
            ).then(resultJSON => dispatch(receiveNewContribution(JSON.parse(resultJSON))));
    };
}