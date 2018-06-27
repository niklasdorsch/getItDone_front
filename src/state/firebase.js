import firebase from 'firebase/app';
import 'firebase/auth';
import { store } from './reduxStore';
import { addUserInfo, finishedInitializing, startInitializing } from './actions';
import { makeFetchMethod } from './api';
import { firbaseConfig } from '../../config';


firebase.initializeApp(firbaseConfig);

const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('user_birthday');

const { auth } = firebase;

const addUser = (uid, name) => {
    makeFetchMethod({
        apiPath: `addUser?userId=${uid}&name=${name}`,
        method: 'POST',
    });
};

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        const { uid, displayName } = user;
        const token = await user.getIdToken(true)
            .catch((error) => {
                console.log(error);
                throw error;
            });
        store.dispatch(addUserInfo({ token, uid }));
        addUser(uid, displayName);
    }
    store.dispatch(finishedInitializing());
});

const loginMethod = () => {
    store.dispatch(startInitializing());
    return auth()
        .signInWithPopup(provider)
        .then(() => {
            console.log('Success');
        })
        .catch((e) => {
            throw e;
        });
};

const logoutMethod = () => auth().signOut();

module.exports = {
    provider,
    auth,
    loginMethod,
    addUser,
    logoutMethod,
};

