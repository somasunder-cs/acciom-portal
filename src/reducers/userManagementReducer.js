import { 
	GET_ORGANIZATION_USER_LIST_SUCCESS, GET_ROLES_BY_ORG_ID_SUCCESS, GET_ROLES_BY_PROJECT_ID_SUCCESS 
} from '../constants/ActionTypes';

const initialState = {
	orgUserList: [],
	rolesList: []
};

const userManagementData = (state = initialState, action) => {
	switch (action.type) {
	case GET_ORGANIZATION_USER_LIST_SUCCESS:
		return {
			...state,
			orgUserList: action.orgUserList
		};
	
	case GET_ROLES_BY_ORG_ID_SUCCESS:
	case GET_ROLES_BY_PROJECT_ID_SUCCESS:
		return {
			...state,
			rolesList: action.roles
		};
	default:
		return state;
	}
};

export default userManagementData;

