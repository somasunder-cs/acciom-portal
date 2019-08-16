import { 
	GET_ORGANIZATION_USER_LIST_SUCCESS, GET_ROLES_BY_ORG_ID_SUCCESS, GET_ROLES_BY_PROJECT_ID_SUCCESS,
	RETRIVE_USER_ROLE_SUCCESS,
	ADD_NEW_USER_ROLE,
	DELETE_USER_ROLE
} from '../constants/ActionTypes';

export const roleTypes = {
	ORGANIZATION:'ORGANIZATION',
	PROJECT: 'PROJECT',
	NEW: 'NEW' 
};

const initialState = {
	orgUserList: [],
	orgRolesList: {},
	projectRolesList: {},
	userOrgRoleList: [],
	userProjectRoleList: [],
	userNewRoleList: [],
	selectedUser: {}
};

const addNewRolesToList = (rolesList) => {
	const list = [...rolesList];
	list.push({ project_id:null, allowed_role_list: [] });
	return list;
};

const deleteRolesFromList = (state, roleType, index) => {
	let currentState = { ...state };
	let roleList = null; 
	if (roleType === roleTypes.ORGANIZATION) {
		roleList = [ ...state.userOrgRoleList ];
		roleList.splice(index, 1);
		currentState = { ...state, userOrgRoleList: roleList };
	} else if (roleType === roleTypes.PROJECT) {
		roleList = [ ...state.userProjectRoleList ];
		roleList.splice(index, 1);
		currentState = { ...state, userProjectRoleList: roleList };
	} else if (roleType === roleTypes.NEW) {
		roleList = [...state.userNewRoleList ];
		roleList.splice(index, 1);
		currentState = { ...state, userNewRoleList: roleList };
	} 
	return currentState;
};

const userManagementData = (state = initialState, action) => {
	switch (action.type) {
	case GET_ORGANIZATION_USER_LIST_SUCCESS:
		return {
			...state,
			orgUserList: action.orgUserList
		};
		
	case ADD_NEW_USER_ROLE:
		return {
			...state,
			userNewRoleList: addNewRolesToList(state.userNewRoleList)
		};

	case DELETE_USER_ROLE:
		return deleteRolesFromList(state, action.roleType, action.index);

	case GET_ROLES_BY_ORG_ID_SUCCESS:
		let orgRolesList = { ...state.orgRolesList };
		orgRolesList[action.orgId] = action.roles;
		return {
			...state,
			orgRolesList 
		};

	case GET_ROLES_BY_PROJECT_ID_SUCCESS:
		let projectRolesList = { ...state.projectRolesList };
		projectRolesList[action.projectId] = action.roles;
		return {
			...state,
			projectRolesList
		};

	case RETRIVE_USER_ROLE_SUCCESS:
		return {
			...state,
			userOrgRoleList: action.data.org_allowed_role_list ? action.data.org_allowed_role_list: [],
			userProjectRoleList: action.data.project_role_list ? action.data.project_role_list: [],
			userNewRoleList: [],
			selectedUser: action.data ? action.data: {}
		};
	
	default:
		return state;
	}
};

export default userManagementData;

