import { 
	GET_ORGANIZATION_LIST_SUCCESS, 
	GET_ORGANIZATION_LIST_ERROR,
	GET_PROJECT_LIST_BY_ORG_ID_SUCCESS, 
	SHOW_ORG_CHANGE_PAGE,
	SWITCH_ORG_SUCCESS,
	SWITCH_PROJECT_SUCCESS,
	SHOW_PROJECT_SWITCH_PAGE
} from '../constants/ActionTypes';

const initialState = {
	organizationList: [],
	currentOrg: null,	
	projectList: [],
	currentProject: null,
	isOrgChangePageVisible: false,
	isProjectSwitchPageVisible: false,
	isOrganisationInitialised: false
};

const appData = (state = initialState, action) => {
	switch (action.type) {
	case GET_ORGANIZATION_LIST_SUCCESS:
		return {
			...state,
			organizationList: action.data,
			currentOrg: action.data[0],
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
			projectList: action.data.project_details,
			currentProject: action.data.project_details[0]
		};

	case SHOW_ORG_CHANGE_PAGE:
		return {
			...state,
			isOrgChangePageVisible: action.show
		};

	case SHOW_PROJECT_SWITCH_PAGE:
		return {
			...state,
			isProjectSwitchPageVisible: action.show
		};

	case SWITCH_ORG_SUCCESS:
		return {
			...state,
			currentOrg: action.data,
			isOrgChangePageVisible:false
		};

	case SWITCH_PROJECT_SUCCESS:
		return {
			...state,
			currentProject: action.data,
			isProjectSwitchPageVisible:false
		};
	default:
		return state;
	}
};

export default appData;