import { BASE_URL, headers, TIMEOUT } from '.';

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
} from '../constants/ActionTypes'; 

const addDatabaseDetailsSuccess = data =>({
	type: ADD_DB_DETAILS_SUCCESS,
	data
});

const addDatabaseDetailsError = data =>({
	type: ADD_DB_DETAILS_ERROR,
	data
});

const updateDBDetailsSuccess = data => ({
	type: UPDATE_DB_DETAILS_SUCCESS,
	data
});

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

const getDBDetailsByIdSuccess = dbDetails => ({
	type: GET_DB_DETAILS_BY_ID_SUCCESS,
	dbDetails
});

const getDBDetailsByIdError = error => ({
	type: GET_DB_DETAILS_BY_ID_ERROR,
	error
});

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

export const updateDBDetails = (dbID, formData) => dispatch => {
	fetch(`${BASE_URL}/db-detail/${dbID}`, {
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

export const getAllDBDetails = () => dispatch => {
	// setTimeout(() => {
	// 	dispatch(getAllDBDetailsSuccess(_db_details_list_success.data));
	// }, TIMEOUT);

	fetch(`${BASE_URL}/db-detail?project_id=2`, {
		method: 'get',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(getAllDBDetailsError(res.error));
			}
			dispatch(getAllDBDetailsSuccess(res.data));
		})
		.catch(error => {
			dispatch(getAllDBDetailsError(error));
		});
};

export const getDBDetailsById = (dbID) => dispatch => {
	fetch(`${BASE_URL}/db-detail/${dbID}`, {
		method: 'get',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(getDBDetailsByIdError(res.error));
			}
			dispatch(getDBDetailsByIdSuccess(res.data.db_details));
		})
		.catch(error => {
			dispatch(getDBDetailsByIdError(error));
		});
};
