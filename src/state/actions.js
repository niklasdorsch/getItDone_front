import { push } from 'react-router-redux';
import { makeFetchMethod } from './api';


export const SENDING_CURRENT_EVENT_INFO = 'SENDING_CURRENT_EVENT_INFO';
export const RECEIVING_CURRENT_EVENT_INFO = 'RECEIVING_CURRENT_EVENT_INFO';

function sendEventInformation() {
    return { type: SENDING_CURRENT_EVENT_INFO };
}

function receiveEventInformation(event) {
    console.log(event);
    const requirements = event.requirements.reduce((current, item) => {
        const newObject = Object.assign(current);
        newObject[item.requirementid] = item;
        return newObject;
    }, {});
    return { type: RECEIVING_CURRENT_EVENT_INFO, event, requirements };
}

export function getEventInformation(eventId) {
    return function (dispatch) {
        dispatch(sendEventInformation(eventId));
        return makeFetchMethod({
            apiPath: `getEventInfo?eventId=${eventId}`,
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
        eventId: info.id,
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
            eventId: 0,
            datetime: datetime.format('YYYY-MM-DD HH:mm:ss'),
            name,
            description,
            location,
            requirements,
            isPrivate,
            userId: getState().user.uid,
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
function receiveAllEvents({ events }) {
    return { type: RECEIVING_ALL_EVENTS, events };
}

export function getAllEvents() {
    return function (dispatch) {
        dispatch(sendAllEvents());
        return makeFetchMethod({
            apiPath: 'getAllEvents',
            method: 'GET',
        }).then((resultJSON) => {
            const { events } = resultJSON;
            return dispatch(receiveAllEvents({ events }));
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

export const SENDING_REQUIREMENT_CONTRIBUTION = 'SENDING_REQUIREMENT_CONTRIBUTION';
function sendRequirementContribution(info) {
    return { type: SENDING_REQUIREMENT_CONTRIBUTION, info };
}

export const RECEIVING_REQUIREMENT_CONTRIBUTION = 'RECEIVING_REQUIREMENT_CONTRIBUTION';
function receiveRequirementContribution({ requirementId, amount }) {
    return { type: RECEIVING_REQUIREMENT_CONTRIBUTION, requirementId, amount };
}

export function submitNewContribution({ requirementId, amount }) {
    return function (dispatch, getState) {
        dispatch(sendRequirementContribution());
        const bodyObject = {
            requirementId,
            amount,
            userId: getState().user.uid,
        };
        return makeFetchMethod({
            apiPath: 'editRequirement',
            method: 'PUT',
            body: bodyObject,
        }).then((resultJSON) => {
            dispatch(receiveRequirementContribution(resultJSON));
        });
    };
}
