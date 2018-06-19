const eventPageDomain = '/event';
const editEventPageDomain = '/edit_event';

export const LANDING = '/';
export const DASHBOARD = '/dashboard';
export const PROFILE = '/profile';
export const EVENT_PAGE = `${eventPageDomain}/:eventid`;
export const EVENT_LIST = '/event_list';
export const USER_EVENT_LIST = '/user_event_list';
export const CREATE_EVENT = '/create_event';
export const EDIT_EVENT = `${editEventPageDomain}/:eventid`;

export const getEventPageURL = id => `${eventPageDomain}/${id}`;
export const getEditEventPageURL = id => `${editEventPageDomain}/${id}`;
export const getUserPageURL = id => `/profile/${id}`;
