import { 
} from '../constants/ActionTypes';

const initialState = {
	organizationList: []
};

const appData = (state = initialState, action) => {
	console.log('appReducer', action.type);
	switch (action.type) {

	case 'GET_ORGANIZATION_LIST_SUCCESS':
		return {
			...state,
			organizationList: action.data
		 };
	
	case 'GET_ORGANIZATION_LIST_ERROR':
		return {
			...state,
			organizationList: []
		 };	
	
	default:
		return state;
	}
};

export default appData;
