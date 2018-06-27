import { store } from './reduxStore';
import { apiUrl } from '../../config';


async function makeFetchMethod({
    apiPath,
    method,
    body,
    rejectionEvent = error => console.log('An error occurred.', error),
}) {
    const { uid, token } = store.getState().user;

    const tokenUserString = `${token}/${uid}`;

    const myHeaders = new Headers();
    myHeaders.append('Authentication', tokenUserString);
    myHeaders.append('Content-Type', 'application/json');


    return fetch(`${apiUrl}${apiPath}`, {
        mode: 'cors',
        method,
        headers: myHeaders,
        body: (body) ? JSON.stringify(body) : null,
    }).then(
        (response) => {
            if (Math.floor(response.status / 100) !== 2) {
                throw Error(`Request failed: ${response.status} ${response.statusText}`);
            }
            return response.json();
        },
        rejectionEvent,
    );
}

module.exports = {
    makeFetchMethod,
};
