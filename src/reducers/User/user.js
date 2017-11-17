import { GET_USER } from "../../constants/ActionTypes";

export default function user(state = {loading: true}, action) {
	switch (action.type) {
		case GET_USER:
			return { loading: false, ...action.payload }
		default:
			return state;
	}
}
