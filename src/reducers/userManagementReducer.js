import { 
	GET_ORGANIZATION_USER_LIST_SUCCESS, GET_ROLES_BY_ORG_ID_SUCCESS, GET_ROLES_BY_PROJECT_ID_SUCCESS,
	RETRIVE_USER_ROLE_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
	orgUserList: [],
	rolesList: [],
	selectedUserRole: []
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
	case RETRIVE_USER_ROLE_SUCCESS:
		return {
			...state,
			selectedUserRole: action.data
		}
	default:
		return state;
	}
};

export default userManagementData;

