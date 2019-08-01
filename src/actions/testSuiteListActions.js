/**
 * Mocking client-server processing
 */
import _testSuitesData from '../json/test-suites-data.json';
import _getAllConnections from '../json/getAllConnections.json';
import _viewTestCase from '../json/viewTestCase.json';
import _viewTestCaseLog from '../json/viewLogs.json';
import { BASE_URL, headers, TIMEOUT } from './appActions';
import { 
	GET_ALL_TEST_SUITES_SUCCESS,
	GET_ALL_TEST_SUITES_ERROR,
	EXECUTE_TEST_BY_SUITE_ID_SUCCESS,
	EXECUTE_TEST_BY_SUITE_ID_ERROR,
	EXECUTE_TEST_BY_CASE_ID_SUCCESS,
	EXECUTE_TEST_BY_CASE_ID_ERROR,
	GET_ALL_CONNECTIONS_SUCCESS, 
	GET_ALL_CONNECTIONS_ERROR,
	SELECT_CONNECTIONS_SUCCESS,
	SELECT_CONNECTIONS_ERROR,
	GET_TESTCASE_LOG_BY_ID_SUCCESS,
	MANAGE_CONNECTIONS_CASE_UPDATE,
	HIDE_MANAGE_CONNECTIONS_DIALOG,
	HIDE_CASE_LOG_DIALOG,
	VIEW_TEST_CASE,
	HIDE_TEST_CASE_DIALOG,
	SHOW_TEST_CASE_EDIT_ENABLED,
	SAVE_MANAGE_CONNECTION_DETAILS,
	SHOW_TEST_CASE_VIEW_ENABLED
} from "../constants/ActionTypes"; 

const getAllTestSuitesSuccess = data => ({
	type: GET_ALL_TEST_SUITES_SUCCESS,
	testSuiteList: data.suites
});

const getAllTestSuitesError = testSuiteList => ({
	type: GET_ALL_TEST_SUITES_ERROR,
	testSuiteList
});

const executeTestBySuiteIdSuccess = data => ({
	type: EXECUTE_TEST_BY_SUITE_ID_SUCCESS,
	data
});

const executeTestBySuiteIdError = error => ({
	type: EXECUTE_TEST_BY_SUITE_ID_ERROR,
	error
});

const executeTestByCaseIdSuccess = data => ({
	type: EXECUTE_TEST_BY_CASE_ID_SUCCESS,
	data
});

const executeTestByCaseIdError = error => ({
	type: EXECUTE_TEST_BY_CASE_ID_ERROR,
	error
});

const getAllConnectionsSuccess = connectionsList => ({
	type: GET_ALL_CONNECTIONS_SUCCESS,
	connectionsList
});

const getAllConnectionsError = error => ({
	type: GET_ALL_CONNECTIONS_ERROR,
	error
});

const selectConnectionsSuccess = data => ({
	type: SELECT_CONNECTIONS_SUCCESS,
	data
});

const selectConnectionsError = error => ({
	type: SELECT_CONNECTIONS_ERROR,
	error
});

const getTestCaseLogByIdSuccess = (testCaseLog, testCaseName) => ({
	type: GET_TESTCASE_LOG_BY_ID_SUCCESS,
	testCaseLog, testCaseName
});

const getTestCaseLogByIdError = error => ({
	type: GET_ALL_CONNECTIONS_ERROR,
	error
});

export const hideManageConnectionsDialog = () => ({
	type: HIDE_MANAGE_CONNECTIONS_DIALOG
});

export const manageConnectionsCaseUpdate = data => ({
	type: MANAGE_CONNECTIONS_CASE_UPDATE,
	data
});

export const getTestCasesSuccess = testCase => ({
	type: GET_TEST_CASES_SUCCESS,
	testCase
});

export const getTestCasesError = testCase => ({
	type: GET_TEST_CASES_ERROR,
	testCase
});

export const hideCaseLogDialog = () => ({
	type: HIDE_CASE_LOG_DIALOG
});

export const hideTestCaseDialog = () => ({
	type: HIDE_TEST_CASE_DIALOG
});

export const showTestCaseEditEnabled = () => ({
	type: SHOW_TEST_CASE_EDIT_ENABLED
});

export const showTestCaseViewEnabled = () => ({		
	type: SHOW_TEST_CASE_VIEW_ENABLED		
});

export const saveManageConnectionDetails = data => ({
	type: SAVE_MANAGE_CONNECTION_DETAILS,
	data
});

export const getAllTestSuites = () => (dispatch, getState)  => {
	// setTimeout(() => {
	// 	console.log('getAllTestSuites ', getState());
	// 	dispatch(getAllTestSuitesSuccess(_testSuitesData));
	// }, TIMEOUT);

	fetch(`${BASE_URL}/test-suite?project_id=1`, {
		method: 'get',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(getAllTestSuitesError(res.error));
			}
			dispatch(getAllTestSuitesSuccess(res.data));
			// return res.data;
		})
		.catch(error => {
			dispatch(getAllTestSuitesError(error));
		});
};

export const executeTestBySuiteId = (suiteID) => dispatch => {
	fetch(`${BASE_URL}/test-case-job/`, {
		method: 'post',
		headers,
		body: JSON.stringify({'suite_id': suiteID})
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
		body: JSON.stringify({'case_id': caseID})
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
	// setTimeout(function() {
	// 	console.log('MW.getAllConnections()  inside timeout');
	// 	dispatch(getAllConnectionsSuccess(_getAllConnections));
	// }, TIMEOUT);

	fetch(`${BASE_URL}/connection-detail/${suiteID}`, {
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

export const getTestCases = (caseID) => dispatch => {
	// setTimeout(function() {
	// 	console.log('MW.viewTestCase()  inside timeout');
	// 	dispatch(viewTestCase(_viewTestCase));
	// }, TIMEOUT);

	fetch(`${BASE_URL}/edit-test-case/${caseID}`, {
		method: 'get',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(getTestCasesError(res.error));
			}
			dispatch(getTestCasesSuccess(res.data));
		})
		.catch(error => {
			dispatch(getTestCasesError(error));
		});
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

export const getTestCaseLogById = (logID, testCaseName) => dispatch => {
	setTimeout(function() {
		dispatch(getTestCaseLogByIdSuccess(_viewTestCaseLog, testCaseName));
	}, TIMEOUT);
	// fetch(`${BASE_URL}/test-case-log/${logID}/`, {
	// 	method: 'get',
	// 	headers
	// })
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		if(res.error) {
	// 			dispatch(getTestCaseLogByIdError(res.error));
	// 		}
	// 		dispatch(getTestCaseLogByIdSuccess(res.data, testCaseName));
	// 	})
	// 	.catch(error => {
	// 		dispatch(getTestCaseLogByIdError(error));
	// 	});
};