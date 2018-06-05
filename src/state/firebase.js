import firebase from 'firebase/app';
import 'firebase/auth';

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


const getToken = () => {
    firebase.auth().currentUser.getIdToken(true).then((idToken) => {
        // Send token to backend here to verify.
        console.log(idToken);
    }).catch((error) => {
        console.log(error);
    });
};

module.exports = {
    provider,
    auth,
    getToken,
};
