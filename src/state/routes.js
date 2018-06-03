export const LANDING = '/';
export const DASHBOARD = '/dashboard';
export const PROFILE = '/profile';
export const EVENT_PAGE = '/eventpage/:eventid';
export const EVENT_LIST = '/eventlist';

export const getEventPageURL = id => `/eventpage/${id}`;
export const getUserPageURL = id => `/profile/${id}`;
