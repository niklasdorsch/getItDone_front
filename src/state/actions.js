import { push } from 'react-router-redux';
import { makeFetchMethod } from './api';
import { getEventPageURL, EVENT_LIST } from './routes';
import { requirementsArrayToObject } from '../usefulFunctions';
import { logoutMethod } from './firebase';

export const SENDING_CURRENT_EVENT_INFO = 'SENDING_CURRENT_EVENT_INFO';
export const RECEIVING_CURRENT_EVENT_INFO = 'RECEIVING_CURRENT_EVENT_INFO';

function sendEventInformation() {
    return { type: SENDING_CURRENT_EVENT_INFO };
}

function parseEventInformation(eventInformation) {
    console.log(eventInformation);
    const {
        datetime,
        name,
        description,
        location,
        isPrivate,
        eventId = 0,
    } = eventInformation;

    const requirements = [];
    Object.entries(eventInformation.requirements).forEach(([key, {
        name: reqName,
        total,
        description: reqDescription,
    }]) => {
        requirements.push({
            requirementId: Number(key),
            name: reqName,
            description: reqDescription,
            total: Number(total),
        });
    });

    return {
        datetime: datetime.format('YYYY-MM-DD HH:mm:ss'),
        eventId,
        name,
        description,
        location,
        requirements,
        isPrivate,
    };
}

function receiveEventInformation(event) {
    const requirements = requirementsArrayToObject(event.requirements);
    const { isFollowing } = event;
    return { type: RECEIVING_CURRENT_EVENT_INFO, event, requirements, isFollowing };
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

export const SEND_REQUIREMENT_CONTRIBUTION = 'SEND_REQUIREMENT_CONTRIBUTION';
function sendRequirementContributors() {
    return { type: SEND_REQUIREMENT_CONTRIBUTION };
}

export const RECEIVE_REQUIREMENT_CONTRIBUTION = 'RECEIVE_REQUIREMENT_CONTRIBUTION';
function receiveRequirementContributors({ userContributions, requirementId }) {
    return { type: RECEIVE_REQUIREMENT_CONTRIBUTION, userContributions, requirementId };
}

export function getRequirementContributors(requirementId) {
    return function (dispatch) {
        dispatch(sendRequirementContributors());
        return makeFetchMethod({
            apiPath: `getRequirementContributors?requirementId=${requirementId}`,
            method: 'GET',
        })
            .then((resultJSON) => {
                dispatch(receiveRequirementContributors({ userContributions: resultJSON, requirementId }));
            })
            .catch(e => dispatch(receiveRequirementContributors({
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
    return function (dispatch) {
        const bodyObject = parseEventInformation(eventInformation);

        dispatch(sendCreateNewEvent());

        return makeFetchMethod({
            apiPath: 'createEvent',
            method: 'POST',
            body: bodyObject,
        }).then((resultJSON) => {
            if (resultJSON.id) {
                dispatch(push(getEventPageURL(resultJSON.id)));
            }
            dispatch(receiveCreateNewEvent(resultJSON));
        });
    };
}

export const SEND_EDIT_EVENT = 'SEND_EDIT_EVENT';
export const RECEIVE_EDIT_EVENT = 'RECEIVE_EDIT_EVENT';

function sendEditEvent() {
    return { type: SEND_EDIT_EVENT };
}
function receiveEditEvent(info) {
    return {
        type: RECEIVE_EDIT_EVENT,
        eventId: info.id,
    };
}

export function editEvent(eventInformation) {
    return function (dispatch) {
        const bodyObject = parseEventInformation(eventInformation);

        bodyObject.deletedRequirements = eventInformation.deletedRequirements;

        dispatch(sendEditEvent());
        return makeFetchMethod({
            apiPath: 'editEvent',
            method: 'PUT',
            body: bodyObject,
        }).then((resultJSON) => {
            if (resultJSON.id) {
                dispatch(push(getEventPageURL(resultJSON.id)));
            }
            dispatch(receiveEditEvent(resultJSON));
        });
    };
}


export const SEND_DELETE_EVENT = 'SEND_DELETE_EVENT';
function sendDeleteEvent() {
    return { type: SEND_DELETE_EVENT };
}

export const RECEIVE_DELETE_EVENT = 'RECEIVE_DELETE_EVENT';
function receiveDeleteEvent(...args) {
    return { type: RECEIVE_DELETE_EVENT, ...args };
}

export function deleteEvent(eventId) {
    return function (dispatch) {
        dispatch(sendDeleteEvent());
        return makeFetchMethod({
            apiPath: `deleteEvent?eventId=${eventId}`,
            method: 'DELETE',
        }).then((resultJSON) => {
            dispatch(receiveDeleteEvent({ message: resultJSON }));
            dispatch(push(EVENT_LIST));
        }).catch((e) => {
            dispatch(receiveDeleteEvent({ error: e }));
        });
    };
}


export const CLEAR_CURRENT_EVENT = 'CLEAR_CURRENT_EVENT';
export function clearCurrentEvent() {
    return { type: CLEAR_CURRENT_EVENT };
}

export const SEND_ALL_EVENTS = 'SEND_ALL_EVENTS';
function sendAllEvents() {
    return { type: SEND_ALL_EVENTS };
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
            if (!resultJSON) {
                return dispatch(receiveAllEvents({
                    error: 'Could not load events',
                }));
            }
            const { events } = resultJSON;
            return dispatch(receiveAllEvents({ events }));
        });
    };
}

export const SEND_USER_EVENTS = 'SEND_USER_EVENTS';
function sendUserEvents() {
    return { type: SEND_USER_EVENTS };
}

export const RECEIVING_USER_EVENTS = 'RECEIVING_USER_EVENTS';
function receiveUserEvents({ events }) {
    return { type: RECEIVING_USER_EVENTS, events };
}

export function getUserEvents() {
    return function (dispatch) {
        dispatch(sendUserEvents());
        return makeFetchMethod({
            apiPath: 'getUserEvents',
            method: 'GET',
        }).then((resultJSON) => {
            const { events } = resultJSON;
            return dispatch(receiveUserEvents({ events }));
        });
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
function doLogout() {
    return { type: LOGOUT_USER };
}
export function logoutUser() {
    return function (dispatch) {
        logoutMethod().then(() => {
            dispatch(doLogout());
        }).catch(() => {
            console.log('Logout unsuccessful');
        });
    };
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


export const SEND_IS_FOLLOWING_EVENT = 'SEND_SET_IS_FOLLOWING_EVENT';
function sendIsFollowingEvent() {
    return { type: SEND_IS_FOLLOWING_EVENT };
}

export const RECEIVE_IS_FOLLOWING_EVENT = 'RECEIVE_IS_FOLLOWING_EVENT';
function receiveIsFollowingEvent({ isFollowing }) {
    return { type: RECEIVE_IS_FOLLOWING_EVENT, isFollowing };
}

export function setFollowEvent({ isFollowing, eventId }) {
    return function (dispatch) {
        dispatch(sendIsFollowingEvent());
        return makeFetchMethod({
            apiPath: `setIsFollowing?isFollowing=${isFollowing}&eventId=${eventId}`,
            method: 'PUT',
        }).then((resultJSON) => {
            dispatch(receiveIsFollowingEvent(resultJSON));
        });
    };
}
