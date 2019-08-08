import { toast } from 'react-toastify';
import { BASE_URL, headers, TIMEOUT, genericErrorHandler} from './appActions';

import _add_db_details_success from '../json/add_db_details.json';
import _db_details_list_success from '../json/db_details_list.json';

import {
	ADD_DB_DETAILS_SUCCESS,
	ADD_DB_DETAILS_ERROR,
	UPDATE_DB_DETAILS_SUCCESS,
	UPDATE_DB_DETAILS_ERROR,
	GET_ALL_DB_DETAILS_SUCCESS,
	GET_ALL_DB_DETAILS_ERROR,
	GET_DB_DETAILS_BY_ID_SUCCESS,
	GET_DB_DETAILS_BY_ID_ERROR,
	CHECK_DB_CONNECTION_SUCCESS,
	CHECK_DB_CONNECTION_ERROR
} from '../constants/ActionTypes'; 

const addDatabaseDetailsSuccess = data =>{
	toast.success("Added DB Details Successfully");
	return {
		type: ADD_DB_DETAILS_SUCCESS,
		data
	};
};

const addDatabaseDetailsError = data =>({
	type: ADD_DB_DETAILS_ERROR,
	data
});

const updateDBDetailsSuccess = data => {
	toast.success("Updated DB Details Successfully");
	return {
		type: UPDATE_DB_DETAILS_SUCCESS,
		data
	};
};

const updateDBDetailsError = error => ({
	type: UPDATE_DB_DETAILS_ERROR,
	error
});

const getAllDBDetailsSuccess = ({db_details}) => ({
	type: GET_ALL_DB_DETAILS_SUCCESS,
	dbDetails: db_details
});

const getAllDBDetailsError = error => ({
	type: GET_ALL_DB_DETAILS_ERROR,
	error
});

const getDBDetailsByIdSuccess = selectedDbDetails => ({
	type: GET_DB_DETAILS_BY_ID_SUCCESS,
	selectedDbDetails
});

const getDBDetailsByIdError = error => ({
	type: GET_DB_DETAILS_BY_ID_ERROR,
	error
});

const checkDbConnectionSuccess = data => {
	toast.success('Database connection is successfull');
	return {
		type: CHECK_DB_CONNECTION_SUCCESS,
		data
	}
};

const checkDbConnectionError = error => {
	toast.error('Database connection is unsuccessfull!!');
	return {
		type: CHECK_DB_CONNECTION_ERROR,
		error
	}
};

export const addDatabaseDetails = (formData) => (dispatch) => {
	// setTimeout(() => {
	// 	dispatch(addDatabaseDetailsSuccess(_add_db_details_success.data));
	// }, TIMEOUT);

	fetch(`${BASE_URL}/db-detail`, {
		method: 'post',
		headers,
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(addDatabaseDetailsError(res.error));
			}
			dispatch(addDatabaseDetailsSuccess(res.data));
		})
		.catch(error => {
			dispatch(addDatabaseDetailsError(error));
		});
};

export const updateDBDetails = (formData) => dispatch => {
	fetch(`${BASE_URL}/db-detail`, {
		method: 'put',
		headers,
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(updateDBDetailsError(res.error));
			}
			dispatch(updateDBDetailsSuccess(res.data));
		})
		.catch(error => {
			dispatch(updateDBDetailsError(error));
		});
};

export const getAllDBDetails = (projectId) => dispatch => {
	// setTimeout(() => {
	// 	dispatch(getAllDBDetailsSuccess(_db_details_list_success.data));
	// }, TIMEOUT);

	fetch(`${BASE_URL}/db-detail?project_id=${projectId}`, {
		method: 'get',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if (res && res.data) {
				dispatch(getAllDBDetailsSuccess(res.data));
			} else {
				genericErrorHandler(dispatch, res, getAllDBDetailsError);
			}
		})
		.catch(error => {
			dispatch(getAllDBDetailsError(error));
		});
};

export const getDBDetailsById = (dbID) => dispatch => {
	fetch(`${BASE_URL}/db-detail?db_connection_id=${dbID}`, {
		method: 'get',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if (res && res.data) {
				dispatch(getDBDetailsByIdSuccess(res.data));
			} else {
				genericErrorHandler(dispatch, res, getDBDetailsByIdError);
			}
		})
		.catch(error => {
			dispatch(getDBDetailsByIdError(error));
		});
};

export const checkDbConnection = (body) => dispatch => {
	fetch(`${BASE_URL}/check-connection`, {
		method: 'post',
		headers,
		body
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(checkDbConnectionError(res.error));
			}
			dispatch(checkDbConnectionSuccess(res.data));
		})
		.catch(error => {
			dispatch(checkDbConnectionError(error));
		});
};