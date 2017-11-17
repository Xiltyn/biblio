import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCmnF1Pbw2CPIIluqj3cy2pLClWudJF5MM",
    authDomain: "testyy-55a16.firebaseapp.com",
    databaseURL: "https://testyy-55a16.firebaseio.com",
    projectId: "testyy-55a16",
    storageBucket: "testyy-55a16.appspot.com",
    messagingSenderId: "863913782460"
};

firebase.initializeApp(config);

export const database = firebase.database().ref('/library');
export const auth = firebase.auth();