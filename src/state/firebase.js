import firebase from 'firebase/app';
import 'firebase/auth';
import { store } from './reduxStore';
import { addUserInfo } from './actions';
import { makeFetchMethod } from './api';

const config = {
    apiKey: 'AIzaSyBHvOMKE7BJEw7ru_0vBxtweBn640F2Wf8',
    authDomain: 'getitdone-6183f.firebaseapp.com',
    databaseURL: 'https://getitdone-6183f.firebaseio.com',
    projectId: 'getitdone-6183f',
    storageBucket: 'getitdone-6183f.appspot.com',
    messagingSenderId: '487989892996',
};

firebase.initializeApp(config);

const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('user_birthday');

const { auth } = firebase;

const addUser = (uid, name) => {
    makeFetchMethod({
        apiPath: `addUser?userId=${uid}&name=${name}`,
        method: 'POST',
    }).then((resultJSON) => {
        console.log(resultJSON);
    });
};

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        const { uid } = user;
        const token = await user.getIdToken(true)
            .catch((error) => {
                console.log(error);
                throw error;
            });
        store.dispatch(addUserInfo({ token, uid }));
        addUser(uid, token);
    }
});

const loginMethod = () => auth()
    .signInWithPopup(provider)
    .then(() => {
        console.log('Success');
    })
    .catch((e) => {
        throw e;
    });

module.exports = {
    provider,
    auth,
    loginMethod,
    addUser,
};

