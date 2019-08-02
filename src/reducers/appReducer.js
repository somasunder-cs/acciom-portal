import { 
	GET_ORGANIZATION_LIST_SUCCESS, 
	GET_ORGANIZATION_LIST_ERROR,
	GET_PROJECT_LIST_BY_ORG_ID_SUCCESS 
} from '../constants/ActionTypes';

const initialState = {
	organizationList: [],
	projectList: [],
	isOrgChangePageVisible: false,
	isOrganisationInitialised: false
};

const appData = (state = initialState, action) => {
	switch (action.type) {
	case GET_ORGANIZATION_LIST_SUCCESS:
		return {
			...state,
			organizationList: action.data,
			isOrganisationInitialised: true
		 };
	
	case GET_ORGANIZATION_LIST_ERROR:
		return {
			...state,
			organizationList: []
		 };	
	
	case GET_PROJECT_LIST_BY_ORG_ID_SUCCESS:
		return {
			...state,
			projectList: action.project_details
		};

	default:
		return state;
	}
};

export default appData;