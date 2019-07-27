/**
 * Mocking client-server processing
 */
import _testSuitesData from '../json/test-suites-data.json';
import _getAllConnections from '../json/getAllConnections.json';
import _viewTestCase from '../json/viewTestCase.json';
import _viewTestCaseLog from '../json/viewLogs.json';

import {
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
	getTestCaseLogByIdError,
	viewTestCaseLog,
	viewTestCase
} from '../actions';

const TIMEOUT = 100;
export const BASE_URL= 'http://172.16.21.192:5000/api';
export const headers = {
	'Content-Type': 'application/json',
	'Authorization':''
};

export const updateHeaders = (authToken) => {
	headers.Authorization = `Bearer ${authToken}`;
};

export const getAllTestSuites = () => (dispatch, getState)  => {
	setTimeout(() => {
		console.log('getAllTestSuites ', getState());
		dispatch(getAllTestSuitesSuccess(_testSuitesData));
	}, TIMEOUT);

	// fetch(`${BASE_URL}/test-suite`, {
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
	fetch(`${BASE_URL}/test-case-job/`, {
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
	fetch(`${BASE_URL}/test-case-job/`, {
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
	setTimeout(function() {
		console.log('MW.getAllConnections()  inside timeout');
		dispatch(getAllConnectionsSuccess(_getAllConnections));
	}, TIMEOUT);

	// fetch(`${this.url}/connection-detail/${suiteID}`, {
	// 	method: 'get',
	// 	headers
	// })
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		if(res.error) {
	// 			dispatch(getAllConnectionsError(res.error));
	// 		}
	// 		dispatch(getAllConnectionsSuccess(_getAllConnections));
	// 	})
	// 	.catch(error => {
	// 		dispatch(getAllConnectionsError(error));
	// 	});
};

export const testCaseLogs = (caseID) => dispatch => {
	setTimeout(function() {
		console.log('MW.viewTestCaseLog()  inside timeout');
		dispatch(viewTestCaseLog(_viewTestCaseLog));
	}, TIMEOUT);
};

export const getTestCases = (caseID) => dispatch => {
	setTimeout(function() {
		console.log('MW.viewTestCase()  inside timeout');
		dispatch(viewTestCase(_viewTestCase));
	}, TIMEOUT);
};

export const selectConnections = (type, cases, connectionID) => dispatch => {
	fetch(`${BASE_URL}/select-connection`, {
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
	fetch(`${BASE_URL}/db-detail`, {
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
			dispatch(getDBDetailsByIdSuccess(res.data));
		})
		.catch(error => {
			dispatch(getDBDetailsByIdError(error));
		});
};

export const updateDBDetails = (dbID, formData) => dispatch => {
	fetch(`${BASE_URL}/db-detail-update/${dbID}`, {
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
	fetch(`${BASE_URL}/test-case-log/${logID}/`, {
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