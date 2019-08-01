import { 
} from '../constants/ActionTypes';

const initialState = {
	organizationList: [],
	isOrgChangePageVisible: false
};

const appData = (state = initialState, action) => {
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
	
	case 'SHOW_ORG_CHANGE_PAGE':
		return {
			...state,
			isOrgChangePageVisible: action.show
		}
	
	default:
		return state;
	}
};

export default appData;

