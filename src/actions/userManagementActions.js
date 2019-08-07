import _orgUserList from '../json/org_user_list.json';
import _rolesListData from '../json/roles_by_org_or_proj_id.json';
import { TIMEOUT, BASE_URL, headers, updateHeaders, genericErrorHandler } from './appActions';
import {
	GET_ORGANIZATION_USER_LIST_SUCCESS,
	GET_ORGANIZATION_USER_LIST_ERROR,
	GET_ROLES_BY_ORG_ID_SUCCESS,
	GET_ROLES_BY_ORG_ID_ERROR,
	UPDATE_USER_ROLES_SUCCESS, 
	UPDATE_USER_ROLES_ERROR,
	GET_ROLES_BY_PROJECT_ID_SUCCESS,
	GET_ROLES_BY_PROJECT_ID_ERROR,
	RETRIVE_USER_ROLE_SUCCESS,
	RETRIVE_USER_ROLE_ERROR
 } from "../constants/ActionTypes";

const getOrganizationUserListSuccess = data => ({
	type: GET_ORGANIZATION_USER_LIST_SUCCESS,
	orgUserList: data.users
});

const getOrganizationUserListError = error =>({
	type: GET_ORGANIZATION_USER_LIST_ERROR,
	error
});

const getRolesByOrgIdSuccess = (data) => {
	return {
		type: GET_ROLES_BY_ORG_ID_SUCCESS,
		roles: data.roles
	};
};

const getRolesByOrgIdError= (data) => {
	return {
		type: GET_ROLES_BY_ORG_ID_ERROR,
		data
	};
};

const getRolesByProjectIdSuccess = data => {
	return {
		type: GET_ROLES_BY_PROJECT_ID_SUCCESS,
		roles: data.roles
	};
};

const getRolesByProjectIdError= (error) => {
	return {
		type: GET_ROLES_BY_PROJECT_ID_ERROR,
		error
	};
};

const updateUserRolesSuccess = (data) => {
	return {
		type: UPDATE_USER_ROLES_SUCCESS,
		data
	};
};

const updateUserRolesError = (error) => {
	return {
		type: UPDATE_USER_ROLES_ERROR,
		error
	};
};

const retriveUserRoleByUserIdSuccess = data => {
	return {
		type: RETRIVE_USER_ROLE_SUCCESS,
		data
	};
	
};

const retriveUserRoleByUserIdError = data => {
	return {
		type: RETRIVE_USER_ROLE_ERROR,
		error
	};
	
};

export const getOrganizationUsersList = (org_id) => (dispatch, getState) => {
	// setTimeout(function() {
	// 	console.log('MW.getOrganizationUserListSuccess()  inside timeout');
	// 	dispatch(getOrganizationUserListSuccess(_orgUserList.data));
	// }, TIMEOUT);

	fetch(`${BASE_URL}/user?org_id=${org_id}`, {
		method: 'get',
		headers
	})
		.then(response => response.json())
		.then(res => { 
			if (res.status !== false && res && res.data) {
				dispatch(getOrganizationUserListSuccess(res.data));
			} else {
				genericErrorHandler(dispatch, res, getOrganizationUserListError);
			}
		})
		.catch(err => {
			if (err.name === 'AbortError') {
				console.error('Fetch aborted');
			} else {
				console.error('Another error', err);
			}
		});
};	
export const getRolesByOrgId = (org_id) => (dispatch, getState) => {
	
	setTimeout(function() {
		dispatch(getRolesByOrgIdSuccess(_rolesListData.data));
	}, TIMEOUT);

	// fetch(`${BASE_URL}/role?org_id=${org_id}`, {
	// 	method: 'get',
	// 	headers
	// })
	// 	.then(response => response.json())
	// 	.then(res => { 
	// 		if (res.status !== false && res && res.data) {
	// 			dispatch(getRolesByOrgIdSuccess(res.data));
	// 		} else {
	// 			genericErrorHandler(dispatch, res, getRolesByOrgIdError);
	// 		}
	// 	})
	// 	.catch(err => {
	// 		if (err.name === 'AbortError') {
	// 			console.error('Fetch aborted');
	// 		} else {
	// 			console.error('Another error', err);
	// 		}
	// 	});
};	

export const getRolesByProjectId = (project_id) => (dispatch, getState) => {
	
	// setTimeout(function() {
	// 	dispatch(getRolesByProjectIdSuccess(_rolesListData.data));
	// }, TIMEOUT);

	fetch(`${BASE_URL}/role?project_id=${project_id}`, {
		method: 'get',
		headers
	})
		.then(response => response.json())
		.then(res => { 
			if (res.status !== false && res && res.data) {
				dispatch(getRolesByProjectIdSuccess(res.data));
			} else {
				genericErrorHandler(dispatch, res, getRolesByProjectIdError);
			}
		})
		.catch(err => {
			if (err.name === 'AbortError') {
				console.error('Fetch aborted');
			} else {
				console.error('Another error', err);
			}
		});
};	

export const updateUserRoles = (org_id) => (dispatch, getState) => {
	const token = localStorage.getItem('auth_token') ;
	updateHeaders(token);
	fetch(`${BASE_URL}/user-managemnt?org_id=${org_id}`, {
		method: 'get',
		headers
	})
		.then(response => response.json())
		.then(res => { 
			if (res.status !== false && res && res.data) {
				dispatch(updateUserRolesSuccess(res.data));
			} else {
				genericErrorHandler(dispatch, res, updateUserRolesError);
			}
		})
		.catch(err => {
			if (err.name === 'AbortError') {
				console.error('Fetch aborted')
			} else {
				console.error('Another error', err)
			}
		});
};

export const retriveUserRoleByUserId = (org_id, user_id) => (dispatch, getState) => {
	const token = localStorage.getItem('auth_token') ;
	updateHeaders(token);
	fetch(`${BASE_URL}/user-role?org_id=${org_id}&user_id=${user_id}`, {
		method: 'get',
		headers
	})
		.then(response => response.json())
		.then(res => { 
			if (res.status !== false && res && res.data) {
				dispatch(retriveUserRoleByUserIdSuccess(res.data));
			} else {
				genericErrorHandler(dispatch, res, retriveUserRoleByUserIdError);
			}
		})
		.catch(err => {
			if (err.name === 'AbortError') {
				console.error('Fetch aborted')
			} else {
				console.error('Another error', err)
			}
		});
};
