import { 
	GET_ORGANIZATION_LIST_SUCCESS, 
	GET_ORGANIZATION_LIST_ERROR, 
	AUTHENTICATION_EXPIRED,
	GET_PROJECT_LIST_BY_ORG_ID_SUCCESS,
	GET_PROJECT_LIST_BY_ORG_ID_ERROR
} from '../constants/ActionTypes';

export const TIMEOUT = 100;
export const BASE_URL= 'http://172.16.21.192:5000/api';
// export const BASE_URL= 'http://172.16.19.156:7000/api';
export const headers = {
	'Content-Type': 'application/json',
	'Authorization':''
};

export const updateHeaders = (authToken) => {
	headers.Authorization = `Bearer ${authToken}`;
};

const hasStandardErrorStatus = (status) => {
	return ((status >= 300 && status <= 307) || 
		(status >= 400 && status <= 417) || 
		(status >= 500 && status <= 505));
};

const getOrganizationListSuccess = data => ({
	type: GET_ORGANIZATION_LIST_SUCCESS,
	data: data.organization_details
});

const getOrganizationListError = error =>({
	type: GET_ORGANIZATION_LIST_ERROR,
	error
});

const getProjectListByOrgIdSuccess = data => ({
	type: GET_PROJECT_LIST_BY_ORG_ID_SUCCESS,
	data
});

const getProjectListByOrgIdError = error => ({
	type: GET_PROJECT_LIST_BY_ORG_ID_ERROR,
	error
});

export const showOrgChangePage = show =>({
	type: 'SHOW_ORG_CHANGE_PAGE',
	show
});

export const authenticationExpired = () =>({
	type: AUTHENTICATION_EXPIRED
});

export const genericErrorHandler = (dispatch, error, acionCreatorFunc) => {
	if (error) {
		if (error.statusText === 'UNAUTHORIZED' || error.message === "Unauthorised Access") {
			dispatch(authenticationExpired());
		} else if (error.status && hasStandardErrorStatus(error.status)) {
			dispatch(acionCreatorFunc(error));
		} else {
			dispatch(acionCreatorFunc({statusText:'Unhandled Error'}));
		}
	} 
};

export const getOrganizationsList = () => (dispatch, getState) => {
	const token = localStorage.getItem('auth_token') ;
	updateHeaders(token);
	fetch(`${BASE_URL}/organization`, {
		method: 'get',
		headers
	})
		.then(response => response.json())
		.then(res => { 
			if (res.status !== false && res && res.data) {
				dispatch(getOrganizationListSuccess(res.data));
			} else {
				genericErrorHandler(dispatch, res, getOrganizationListError);
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

export const getProjectListByOrgId = (org_id) => (dispatch, getState) => {
	setTimeout(() => {
		dispatch(getProjectListByOrgIdSuccess(_projectListByOrgIdData.data));
	}, TIMEOUT);

	// fetch(`${BASE_URL}/project?org_id=${org_id}`, {
	// 	method: 'get',
	// 	headers
	// })
	// 	.then(response => response.json())
	// 	.then(res => { 
	// 		if (res.status !== false && res && res.data) {
	// 			dispatch(getProjectListByOrgIdSuccess(res.data));
	// 		} else {
	// 			genericErrorHandler(dispatch, res, getProjectListByOrgIdError);
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
