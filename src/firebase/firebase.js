import * as firebase from 'firebase'

const config = {
	apiKey: "AIzaSyAwDT70LE3dJK5DlH05Swp3RtT_Wd81sAc",
	authDomain: "biblio-f2dc9.firebaseapp.com",
	databaseURL: "https://biblio-f2dc9.firebaseio.com",
	projectId: "biblio-f2dc9",
	storageBucket: "biblio-f2dc9.appspot.com",
	messagingSenderId: "483091640226"
};

firebase.initializeApp(config);

export const database = firebase.database().ref('/library');
export const auth = firebase.auth();