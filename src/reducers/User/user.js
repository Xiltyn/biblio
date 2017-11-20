import {GET_USER, SET_LOADING_STATUS} from "../../constants/ActionTypes";

export default function user(state = {loading: true}, action) {
	switch (action.type) {
		case GET_USER:
			return { loading: false, ...action.payload };
		case SET_LOADING_STATUS:
			return { ...state, loadingStatus: action.status };
		default:
			return state;
	}
}
