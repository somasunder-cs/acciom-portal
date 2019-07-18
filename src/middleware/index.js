/**
 * Mocking client-server processing
 */
import _testSuitesData from './testSuitesData.json';

import {
	loginToPortalSuccess,
	loginToPortalError,
	getAllTestSuitesSuccess,
	getAllTestSuitesError,
	executeTestBySuiteIdSuccess,
	executeTestBySuiteIdError,
	executeTestByCaseIdSuccess,
	executeTestByCaseIdError,
	getAllConnectionsSuccess, 
	getAllConnectionsError,
	selectConnectionsSuccess,
	selectConnectionsError,
	getAllDBDetailsSuccess,
	getAllDBDetailsError,
	getDBDetailsByIdSuccess,
	getDBDetailsByIdError,
	updateDBDetailsError,
	updateDBDetailsSuccess,
	getTestCaseLogByIdSuccess,
	getTestCaseLogByIdError
} from '../actions';

const headers = {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json'
};
const TIMEOUT = 100;
const BASE_URL= '/api';


export const loginToPortal = () => dispatch => {
	fetch(`${BASE_URL}/login`, {
		method: 'post',
		headers,
		body: {}
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(loginToPortalError(res.error));
			}
			dispatch(loginToPortalSuccess(res.data));
		})
		.catch(error => {
			dispatch(loginToPortalError(error));
		});
}

export const getAllTestSuites = () => dispatch => {
	setTimeout(function() {
		console.log('MW.getAllTestSuites()  inside timeout');
		dispatch(getAllTestSuitesSuccess(_testSuitesData));
	}, TIMEOUT);

	// fetch(`${this.url}/test-suite`, {
	// 	method: 'get',
	// 	headers
	// })
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		if(res.error) {
	// 			dispatch(getAllTestSuitesError(res.error));
	// 		}
	// 		dispatch(getAllTestSuitesSuccess(res.data));
	// 		// return res.data;
	// 	})
	// 	.catch(error => {
	// 		dispatch(getAllTestSuitesError(error));
	// 	});
};

export const executeTestBySuiteId = (suiteID) => dispatch => {
	fetch(`${this.url}/test-case-job/`, {
		method: 'post',
		headers,
		body: {'suite_id': suiteID}
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(executeTestBySuiteIdError(res.error));
			}
			dispatch(executeTestBySuiteIdSuccess(res.data));
		})
		.catch(error => {
			dispatch(executeTestBySuiteIdError(error));
		});
};

export const executeTestByCaseId = (caseID) => dispatch => {
	fetch(`${this.url}/test-case-job/`, {
		method: 'post',
		headers,
		body: {'case_id': caseID}
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(executeTestByCaseIdSuccess(res.error));
			}
			dispatch(executeTestByCaseIdSuccess(res.data));
		})
		.catch(error => {
			dispatch(executeTestByCaseIdError(error));
		});
};

export const getAllConnections = (suiteID) => dispatch => {
	fetch(`${this.url}/connection-detail/${suiteID}`, {
		method: 'get',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(getAllConnectionsError(res.error));
			}
			dispatch(getAllConnectionsSuccess(res.data));
		})
		.catch(error => {
			dispatch(getAllConnectionsError(error));
		});
};

export const selectConnections = (type, cases, connectionID) => dispatch => {
	fetch(`${this.url}/select-connection`, {
		method: 'post',
		headers,
		body: {
			'connection_type': type,
			'case_id': cases,
			'db_id': connectionID
		}
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(selectConnectionsError(res.error));
			}
			dispatch(selectConnectionsSuccess(res.data));
		})
		.catch(error => {
			dispatch(selectConnectionsError(error));
		});
};

export const getAllDBDetails = () => dispatch => {
	fetch(`${this.url}/db-detail`, {
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
	fetch(`${this.url}/db-detail/${dbID}`, {
		method: 'get',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(getDBDetailsByIdError(res.error));
			}
			dispatch(getDBDetailsByIdSuccess(res.data));
		})
		.catch(error => {
			dispatch(getDBDetailsByIdError(error));
		});
};

export const updateDBDetails = (dbID, formData) => dispatch => {
	fetch(`${this.url}/db-detail-update/${dbID}`, {
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

export const getTestCaseLogById = (logID) => dispatch => {
	fetch(`${this.url}/test-case-log/${logID}/`, {
		method: 'get',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(getTestCaseLogByIdError(res.error));
			}
			dispatch(getTestCaseLogByIdSuccess(res.data));
		})
		.catch(error => {
			dispatch(getTestCaseLogByIdError(error));
		});
};