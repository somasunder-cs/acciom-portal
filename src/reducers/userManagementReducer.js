import { 
	GET_ORGANIZATION_USER_LIST_SUCCESS, GET_ROLES_BY_ORG_ID_SUCCESS, GET_ROLES_BY_PROJECT_ID_SUCCESS,
	RETRIVE_USER_ROLE_SUCCESS,
	ADD_NEW_USER_ROLE,
	DELETE_USER_ROLE,
	UPDATE_USER_ROLES_SUCCESS
} from '../constants/ActionTypes';

export const roleTypes = {
	ORGANIZATION:'ORGANIZATION',
	PROJECT: 'PROJECT',
	NEW: 'NEW' 
};

const initialState = {
	orgUserList: [],
	orgProjectRolesList: {},
	userOrgRoleList: [],
	userProjectRoleList: [],
	userNewRoleList: [],
	selectedUser: null,
	redirectToUserMgmtHome: false
};

const userManagementData = (state = initialState, action) => {
	switch (action.type) {
	case GET_ORGANIZATION_USER_LIST_SUCCESS:
		return {
			...state,
			orgUserList: action.orgUserList,
			userOrgRoleList: [],
			userProjectRoleList: [],
			userNewRoleList: [],
			selectedUser: null,
			redirectToUserMgmtHome: false
		};
		
	case GET_ROLES_BY_ORG_ID_SUCCESS:
	case GET_ROLES_BY_PROJECT_ID_SUCCESS:
		let orgProjectRolesList = { ...state.orgProjectRolesList };
		orgProjectRolesList[action.key] = action.roles;
		return {
			...state,
			orgProjectRolesList
		};

	case RETRIVE_USER_ROLE_SUCCESS:
		return {
			...state,
			userOrgRoleList: action.data.org_allowed_role_list ? action.data.org_allowed_role_list: [],
			userProjectRoleList: action.data.project_role_list ? action.data.project_role_list: [],
			userNewRoleList: [],
			selectedUser: action.data ? action.data: {}
		};
		
	case UPDATE_USER_ROLES_SUCCESS:
		return {
			...state,
			redirectToUserMgmtHome: true
		};
		
	default:
		return state;
	}
};

export default userManagementData;

