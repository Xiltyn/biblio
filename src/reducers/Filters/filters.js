import { initialState } from './initialState';
import {SET_ACTIVE_FILTER, TOGGLE_CATEGORY, TOGGLE_FILTERS} from "../../constants/ActionTypes";

export default function filters(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_FILTERS:
			return state = {
				showFilters: !state.showFilters,
				keys: state.keys,
				categories: state.categories
			};
		case SET_ACTIVE_FILTER:
			state.keys.filter(key => key.name === action.name)[0].isActive = action.value;
			return state;
		case TOGGLE_CATEGORY:
			state.categories.filter(category => category.id === action.id)[0].active = !state.categories.filter(category => category.id === action.id)[0].active;
			return state;
		default:
			return state;
	}
}
