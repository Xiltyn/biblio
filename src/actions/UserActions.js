import {auth} from "../firebase/firebase";
import {GET_USER, SET_LOADING_STATUS} from "../constants/ActionTypes";

export const getUser = () => (dispatch) => {
	auth.onAuthStateChanged(user => {
		dispatch({
			type: GET_USER,
			payload: user
		})
	})
};

export const login = (email, password) => (dispatch) => {
	dispatch(setLoadingStatus('loading'));
	auth.signInWithEmailAndPassword(email, password).catch(err => {
		dispatch(setLoadingStatus(err.code));
		console.warn(err)
	});
};

export const logout = () => (dispatch) => {
	auth.signOut().catch(err => {
		dispatch(setLoadingStatus(err.code));
		console.warn(err)
	});
};

const setLoadingStatus = (status) => {
	return {
		type: SET_LOADING_STATUS,
		status: status
	}
};