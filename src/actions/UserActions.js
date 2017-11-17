import {auth} from "../firebase/firebase";
import {GET_USER} from "../constants/ActionTypes";

export const getUser = () => (dispatch) => {
	auth.onAuthStateChanged(user => {
		dispatch({
			type: GET_USER,
			payload: user
		})
	})
};

export const login = (email, password) => (dispatch) => {
	auth.signInWithEmailAndPassword(email, password).catch(err => console.log(err));
};

export const logout = () => (dispatch) => {
	auth.signOut().catch(err => console.log(err));
};