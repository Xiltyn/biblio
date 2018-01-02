import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyC4ESKIEGb0_vLlm8qfYhtdaVzt-WCu6MU",
    authDomain: "biblioteka-60cda.firebaseapp.com",
    databaseURL: "https://biblioteka-60cda.firebaseio.com",
    projectId: "biblioteka-60cda",
    storageBucket: "biblioteka-60cda.appspot.com",
    messagingSenderId: "130836662737"
};

firebase.initializeApp(config);

export const database = firebase.database().ref('/library');
export const auth = firebase.auth();