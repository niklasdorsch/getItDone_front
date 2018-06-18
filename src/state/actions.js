import { push } from 'react-router-redux';
import { makeFetchMethod } from './api';


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
        return makeFetchMethod({
            apiPath: `getEventInfo?eventID=${eventID}`,
            method: 'GET',
        }).then(resultJSON => dispatch(receiveEventInformation(resultJSON)))
            .catch(e => dispatch(receiveEventInformation({
                error: e,
            })));
    };
}


export const SENDING_CREATE_NEW_EVENT = 'SENDING_CREATE_NEW_EVENT';
export const RECEIVING_CREATE_NEW_EVENT = 'RECEIVING_CREATE_NEW_EVENT';

function sendCreateNewEvent() {
    return { type: SENDING_CREATE_NEW_EVENT };
}
function receiveCreateNewEvent(info) {
    return {
        type: RECEIVING_CREATE_NEW_EVENT,
        eventID: info.id,
    };
}

export function submitNewEvent(eventInformation) {
    return function (dispatch, getState) {
        const {
            datetime,
            name,
            description,
            location,
            isPrivate,
        } = eventInformation;

        const requirements = [];
        Object.entries(eventInformation.requirements).forEach(([key, {
            name: reqName,
            number,
            description: reqDescription,
        }]) => {
            console.log(key);
            requirements.push({
                requirementid: Number(key),
                name: reqName,
                description: reqDescription,
                total: Number(number),
            });
        });

        const bodyObject = {
            eventID: 0,
            datetime: datetime.format('YYYY-MM-DD HH:mm:ss'),
            name,
            description,
            location,
            requirements,
            isPrivate,
            userID: getState().user.uid,
        };

        dispatch(sendCreateNewEvent());

        return makeFetchMethod({
            apiPath: 'createEvent',
            method: 'POST',
            body: bodyObject,
        }).then((resultJSON) => {
            if (resultJSON.id) {
                dispatch(push(`event/${resultJSON.id}`));
            }
            dispatch(receiveCreateNewEvent(resultJSON));
        });
    };
}


export const CLEAR_CURRENT_EVENT = 'CLEAR_CURRENT_EVENT';
export function clearCurrentEvent() {
    return { type: CLEAR_CURRENT_EVENT };
}

export const SEND_ALL_EVENTS = 'SEND_ALL_EVENTS';
function sendAllEvents(info) {
    return { type: SEND_ALL_EVENTS, info };
}

export const RECEIVING_ALL_EVENTS = 'RECEIVING_ALL_EVENTS';
function receiveAllEvents(info) {
    return { type: RECEIVING_ALL_EVENTS, info };
}

export function getAllEvents() {
    return function (dispatch) {
        dispatch(sendAllEvents());
        return makeFetchMethod({
            apiPath: 'getAllEvents',
            method: 'GET',
        }).then((resultJSON) => {
            console.log(resultJSON);
            return dispatch(receiveAllEvents(resultJSON));
        });
    };
}


export function getUserEvents() {
    return function (dispatch) {
        console.log('Implement get user events');
    };
}

export const ADD_USER_INFO = 'ADD_USER_INFO';
export function addUserInfo({ uid, token }) {
    return {
        type: ADD_USER_INFO,
        uid,
        token,
    };
}

export const LOGOUT_USER = 'LOGOUT_USER';
export function logoutUser() {
    return { type: LOGOUT_USER };
}

export function submitNewContribution() {
    return function (dispatch, getState) {
        console.log(getState().user.userInfo.user.uid);
        console.log('Implement submit new contribution');
    };
}
