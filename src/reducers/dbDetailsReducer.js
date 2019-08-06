import { 
	ADD_DB_DETAILS_SUCCESS,
	UPDATE_DB_DETAILS_SUCCESS,
	GET_ALL_DB_DETAILS_SUCCESS,
	GET_DB_DETAILS_BY_ID_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
	dbDetailsList: [],
	selectedDbDetails: null, 
	updatedDbDetails: false
};

const dbDetailsData = (state = initialState, action) => {
	switch (action.type) {
	case ADD_DB_DETAILS_SUCCESS:
		return {
			...state,
			updatedDbDetails: true
		};
	case UPDATE_DB_DETAILS_SUCCESS:
		return {
			...state,
			updatedDbDetails: true
		};
	case GET_ALL_DB_DETAILS_SUCCESS:
		return {
			...state,
			dbDetailsList: action.dbDetails,
			updatedDbDetails: false
		};
	case GET_DB_DETAILS_BY_ID_SUCCESS:
		return {
			...state,
			selectedDbDetails: action.selectedDbDetails
		};
		
	default:
		return state;
	}
};

export default dbDetailsData;

