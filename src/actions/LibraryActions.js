import {FETCH_DATA} from "../constants/ActionTypes";
import {database} from "../firebase/firebase";

export const fetchLibraryData = () => (dispatch) => {
		database.on('value', data => {
			dispatch({
				type: FETCH_DATA,
				payload: data.val()
			})
		})
	};

export const addNewRecord = (record) => (dispatch) => {
	database.child(record.ID).set(record)
};



export const updateRecord = (ID, payload) => (dispatch) => {
	database.child(ID).update(payload)
}

export const removeRecord = (ID) => (dispatch) => {
	console.log(ID)

	database.child(ID).remove()
}
