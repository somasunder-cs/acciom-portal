import { 
	ADD_DB_DETAILS_SUCCESS,
	UPDATE_DB_DETAILS_SUCCESS,
	GET_ALL_DB_DETAILS_SUCCESS,
	GET_DB_DETAILS_BY_ID_SUCCESS,
	GET_PROJECT_LIST_BY_ORG_ID_SUCCESS,
	SWITCH_PROJECT_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
	dbDetailsList: [],
	selectedDbDetails: null, 
	refreshDBDetails: false
};

const dbDetailsData = (state = initialState, action) => {
	switch (action.type) {
	case ADD_DB_DETAILS_SUCCESS:
		return {
			...state,
		};
	case UPDATE_DB_DETAILS_SUCCESS:
		return {
			...state,
		};
	case GET_ALL_DB_DETAILS_SUCCESS:
		return {
			...state,
			dbDetailsList: action.dbDetails,
			refreshDBDetails: false
		};
	case GET_DB_DETAILS_BY_ID_SUCCESS:
		return {
			...state,
			selectedDbDetails: action.selectedDbDetails
		};
	
	case GET_PROJECT_LIST_BY_ORG_ID_SUCCESS:
	case SWITCH_PROJECT_SUCCESS:
		return {
			...state,
			refreshDBDetails: true
		};
		
	default:
		return state;
	}
};

export default dbDetailsData;

