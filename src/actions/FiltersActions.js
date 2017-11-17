import {SET_ACTIVE_FILTER, TOGGLE_CATEGORY, TOGGLE_FILTERS} from "../constants/ActionTypes";

export function toggleFilters() {
	return {
		type: TOGGLE_FILTERS
	};
}

export function dispatchActiveFilter(name, value) {
	return {
		type: SET_ACTIVE_FILTER,
		name: name,
		value: value
	}
}

export function toggleCategory(catID) {
	return {
		type: TOGGLE_CATEGORY,
		id: catID
	}
}

