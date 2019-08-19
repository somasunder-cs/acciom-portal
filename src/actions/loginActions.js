import { toast } from 'react-toastify';
import { BASE_URL, headers, updateHeaders } from './appActions';
import {
	LOGIN_TO_PORTAL_SUCCESS,
	LOGIN_TO_PORTAL_ERROR,
	LOGOUT_FROM_PORTAL_SUCCESS,
	LOGOUT_FROM_PORTAL_ERROR,
	CHANGE_PASSWORD_SUCCESS,
	CHANGE_PASSWORD_ERROR,
	FORGET_PASSWORD_SUCCESS,
	FORGET_PASSWORD_ERROR
} from '../constants/ActionTypes'; 

const base64Encode = (email, password) => {
	return btoa(`${email}:${password}`);
};

const loginToPortalSuccess = data =>({
	type: LOGIN_TO_PORTAL_SUCCESS,
	data
});

const loginToPortalError = data =>({
	type: LOGIN_TO_PORTAL_ERROR,
	data
});

const logoutFromPortalError = data =>({
	type: LOGOUT_FROM_PORTAL_ERROR,
	data
});

const changePasswordSuccess = data =>{
	toast.success("Password was successfully changed");
	return {
		type: CHANGE_PASSWORD_SUCCESS,
		data
	}
};

const changePasswordError = data =>({
	type: CHANGE_PASSWORD_ERROR,
	data
});

const forgetPasswordSuccess = data => {
	toast.success("Link has been send successfully");
	return {
		type: FORGET_PASSWORD_SUCCESS,
		data
	}
};

const forgetPasswordError = data =>({
	type: FORGET_PASSWORD_ERROR,
	data
});

const storeUserData = ({token}) => {
	localStorage.setItem('auth_token', token);
	updateHeaders(token);
};

export const logoutFromPortalSuccess = () =>({
	type: LOGOUT_FROM_PORTAL_SUCCESS
});

export const clearUserData = () => {
	localStorage.removeItem('auth_token');
	updateHeaders('');
};

export const checkAuthentication = () => (dispatch) => {
	let token = localStorage.getItem('auth_token') ;
	token = (token === 'undefined' || token === 'null') ? '' : token;
	storeUserData({token});
	dispatch(loginToPortalSuccess({token}));
};

export const loginToPortal = ({email, password}) => (dispatch) => {
	headers.Authorization = `Basic ` + base64Encode(email, password);
	fetch(`${BASE_URL}/login`, {
		method: 'post',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(loginToPortalError(res.error));
			}
			storeUserData(res.data);
			dispatch(loginToPortalSuccess(res.data));
		})
		.catch(error => {
			console.log('login error ', error);
			dispatch(loginToPortalError(error));
		});
};

export const logoutFromPortal = () => dispatch => {

	fetch(`${BASE_URL}/logout`, {
		method: 'post',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(logoutFromPortalError(res.error));
			}
			clearUserData();
			dispatch(logoutFromPortalSuccess(res.data));
		})
		.catch(error => {
			console.log('logoutFromPortal error ', error);
			dispatch(logoutFromPortalError(error));
		});
};

export const changePassword = (body) => dispatch => {
	fetch(`${BASE_URL}/change-password`, {
		method: 'post',
		headers,
		body
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(changePasswordError(res.error));
			}
			dispatch(changePasswordSuccess(res.data));
		})
		.catch(error => {
			dispatch(changePasswordError(error));
		});
};

export const forgetPassword = (body) => dispatch => {
	fetch(`${BASE_URL}/forgot-password`, {
		method: 'post',
		headers,
		body
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(forgetPasswordError(res.error));
			}
			dispatch(forgetPasswordSuccess(res.data));
		})
		.catch(error => {
			dispatch(forgetPasswordError(error));
		});
};