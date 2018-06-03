import firebase from 'firebase';

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

module.exports = {
    provider,
    auth,
};
