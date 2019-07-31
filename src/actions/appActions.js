import { authenticationExpired } from './loginActions';
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

const getOrganizationListSuccess = data => ({
	type: 'GET_ORGANIZATION_LIST_SUCCESS',
	data: data.organization_details
});

const getOrganizationListError = error =>({
	type: 'GET_ORGANIZATION_LIST_ERROR',
	error
});

export const genericErrorHandler = (dispatch, error, acionCreatorFunc) => {
	if (error) {
		if (error.statusText === 'UNAUTHORIZED' || error.message === "Unauthorised Access") {
			dispatch(authenticationExpired());
		} else {
			if (error.status && 
				(	(error.status >= 300 && error.status <= 307) || 
					(error.status >= 400 && error.status <= 417) || 
					(error.status >= 500 && error.status <= 505)  
				)) 
			{
				dispatch(acionCreatorFunc(error));
			} else {
				dispatch(acionCreatorFunc({statusText:'Unhandled Error'}));
				console.log('unhandled error in DB details');
			}
		}
	} 
};

export const getOrganizationsList = () => (dispatch, getState) => {
	let token = localStorage.getItem('auth_token') ;
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
				console.error('Fetch aborted')
			} else {
				console.error('Another error', err)
			}
		});
		
	// .then(res => genericErrorHandler(dispatch, res, getOrganizationListError))
	// .then(text => {
	// 	console.log('text==>', text);
	// 	// if(res && res.error) {
	// 	// 	// dispatch(getOrganizationListError(res.error));
	// 	// 	genericErrorHandler(dispatch, res.error, getOrganizationListError);
	// 	// } else if (res && res.data) {
	// 	// 	dispatch(getOrganizationListSuccess(res.data));
	// 	// }
	// })
	// .catch(error => {
	// 	dispatch(genericErrorHandler(dispatch, error, getOrganizationListError));
	// });

};