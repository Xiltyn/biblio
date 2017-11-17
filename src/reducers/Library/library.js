import { initialState } from './initialState';
import {FETCH_DATA} from "../../constants/ActionTypes";

export default function library(state = initialState, action) {
	switch (action.type) {
		case FETCH_DATA:
			return action.payload;
		default:
			return state;
	}
}
