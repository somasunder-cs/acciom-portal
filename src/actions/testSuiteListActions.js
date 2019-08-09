/**
 * Mocking client-server processing
 */
// import _testSuitesData from '../json/test-suites-data.json';
// import _getAllConnections from '../json/getAllConnections.json';
// import _viewTestCase from '../json/viewTestCase.json';
// import _viewTestCaseLog from '../json/viewLogs.json';
// import _db_connection_detail from '../json/db-connection-detail.json';
// import test_case_detail_by_suit_id from '../json/test_case_detail_by_suit_id.json';
// import _select_connection_post from '../json/select_connection_post.json';
import { toast } from 'react-toastify';
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
	HIDE_TEST_CASE_DIALOG,
	SHOW_TEST_CASE_EDIT_ENABLED,
	SAVE_MANAGE_CONNECTION_DETAILS,
	SHOW_TEST_CASE_VIEW_ENABLED,
	GET_TEST_CASE_BY_TEST_CASE_ID_SUCCESS,
	GET_TEST_CASE_BY_TEST_CASE_ID_ERROR,
	GET_TESTCASE_DETAIL_BY_SUITE_ID_SUCCESS,
	GET_TESTCASE_DETAIL_BY_SUITE_ID_ERROR,
	UPDATE_TEST_CASE_SUCCESS,
	UPDATE_TEST_CASE_ERROR
} from "../constants/ActionTypes"; 

const getAllTestSuitesSuccess = data => ({
	type: GET_ALL_TEST_SUITES_SUCCESS,
	testSuiteList: data.suites
});

const getAllTestSuitesError = testSuiteList => ({
	type: GET_ALL_TEST_SUITES_ERROR,
	testSuiteList
});

const executeTestBySuiteIdSuccess = data => {
	toast.success("Test Suite Executed Successfully");
	return {
	    type: EXECUTE_TEST_BY_SUITE_ID_SUCCESS,
		data
	}	
};

const executeTestBySuiteIdError = error => {
	toast.error("Test Suite Execution Failed");
	return {
	    type: EXECUTE_TEST_BY_SUITE_ID_ERROR,
		error
	}		
};

const executeTestByCaseIdSuccess = data => {
	toast.success("Test Case Executed Successfully");
	return {
	  type: EXECUTE_TEST_BY_CASE_ID_SUCCESS,
	  data
	} 
};

const executeTestByCaseIdError = error => {
	toast.error("Test Case Execution Failed");
	return {
	   type: EXECUTE_TEST_BY_CASE_ID_ERROR,
	   error
	}   
};

const getAllConnectionsSuccess = connectionsList => ({
	type: GET_ALL_CONNECTIONS_SUCCESS,
	connectionsList
});

const getAllConnectionsError = error => ({
	type: GET_ALL_CONNECTIONS_ERROR,
	error
});

const getTestCaseDetailBySuiteIdSuccess = data => ({
	type: GET_TESTCASE_DETAIL_BY_SUITE_ID_SUCCESS,
	allCases: data.all_cases
});

const getTestCaseDetailBySuiteIdError = error => ({
	type: GET_TESTCASE_DETAIL_BY_SUITE_ID_ERROR,
	error
});

const selectConnectionsSuccess = () => ({
	type: SELECT_CONNECTIONS_SUCCESS
});

const selectConnectionsError = error => ({
	type: SELECT_CONNECTIONS_ERROR,
	error
});

const getTestCaseLogByIdSuccess = (data, testCaseName) => ({
	type: GET_TESTCASE_LOG_BY_ID_SUCCESS,
	testCaseLog: data.test_case_log,
	testCaseName
});

const getTestCaseLogByIdError = error => ({
	type: GET_ALL_CONNECTIONS_ERROR,
	error
});

const getTestCaseByTestCaseIdSuccess = testCase => ({
	type: GET_TEST_CASE_BY_TEST_CASE_ID_SUCCESS,
	testCase
});

const getTestCaseByTestCaseIdError = testCase => ({
	type: GET_TEST_CASE_BY_TEST_CASE_ID_ERROR,
	testCase
});

const updateTestCaseSuccess = data => ({
	type: UPDATE_TEST_CASE_SUCCESS,
	message: data.message
});

const updateTestCaseError = error => ({
	type: UPDATE_TEST_CASE_ERROR,
	error
});

export const hideManageConnectionsDialog = () => ({
	type: HIDE_MANAGE_CONNECTIONS_DIALOG
});

export const manageConnectionsCaseUpdate = data => ({
	type: MANAGE_CONNECTIONS_CASE_UPDATE,
	data
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

export const getAllTestSuites = (projectId) => (dispatch, getState)  => {
	// setTimeout(() => {
	// 	console.log('getAllTestSuites ', getState());
	// 	dispatch(getAllTestSuitesSuccess(_testSuitesData));
	// }, TIMEOUT);

	fetch(`${BASE_URL}/test-suite?project_id=${projectId}`, {
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
		// 	setTimeout(() => {
	    //      console.log('getAllTestSuites ', getState());
	    //      dispatch(getAllTestSuitesSuccess(_testSuitesData));
	    //    }, TIMEOUT);
		})
		.catch(error => {
			dispatch(executeTestBySuiteIdError(error));
		});
};

export const executeTestByCaseId = (caseID) => dispatch => {
	fetch(`${BASE_URL}/test-case-job/`, {
		method: 'post',
		headers,
		body: JSON.stringify({'case_id_list': caseID})
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

export const getAllConnections = (project_id) => dispatch => {
	// setTimeout(function() {
	// 	console.log('MW.getAllConnections()  inside timeout');
	// 	dispatch(getAllConnectionsSuccess(_db_connection_detail.data));
	// }, TIMEOUT);
	fetch(`${BASE_URL}/db-connection-detail?project_id=${project_id}`, {
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

export const getTestCaseDetailBySuiteId = (suite_id) => dispatch => {
	// setTimeout(function() {
	// 	console.log('MW.getTestCaseDetailBySuiteId()  inside timeout');
	// 	dispatch(getTestCaseDetailBySuiteIdSuccess(test_case_detail_by_suit_id.data));
	// }, TIMEOUT);
	fetch(`${BASE_URL}/test-case-detail?suite_id=${suite_id}`, {
		method: 'get',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(getTestCaseDetailBySuiteIdError(res.error));
			}
			dispatch(getTestCaseDetailBySuiteIdSuccess(res.data));
		})
		.catch(error => {
			dispatch(getTestCaseDetailBySuiteIdError(error));
		});
};

export const getTestCaseByTestCaseId = (caseID) => dispatch => {
	// setTimeout(function() {
	// 	console.log('MW.viewTestCase()  inside timeout');
	// 	dispatch(viewTestCase(_viewTestCase));
	// }, TIMEOUT);

	fetch(`${BASE_URL}/edit-test-case?test_case_id=${caseID}`, {
		method: 'get',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(getTestCaseByTestCaseIdError(res.error));
			}
			dispatch(getTestCaseByTestCaseIdSuccess(res.data));
		})
		.catch(error => {
			dispatch(getTestCaseByTestCaseIdError(error));
		});
};

export const updateTestCase = (body) => dispatch => {
	// setTimeout(function() {
	// 	dispatch(updateTestCasesSuccess());
	// }, TIMEOUT);

	fetch(`${BASE_URL}/edit-test-case/`, {
		method: 'put',
		headers,
		body: JSON.stringify(body)
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(updateTestCaseError(res.error));
			}
			dispatch(updateTestCaseSuccess(res));
		})
		.catch(error => {
			dispatch(updateTestCaseError(error));
		});
};

export const updateConnections = (body) => (dispatch) => {
	fetch(`${BASE_URL}/select-connection`, {
		method: 'post',
		headers,//: _headers,
		body:JSON.stringify(body)
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
	// setTimeout(function() {
	// 	dispatch(getTestCaseLogByIdSuccess(_viewTestCaseLog, testCaseName));
	// }, TIMEOUT);
	fetch(`${BASE_URL}/test-case-log?test_case_log_id=${logID}`, {
		method: 'get',
		headers
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(getTestCaseLogByIdError(res.error));
			}
			dispatch(getTestCaseLogByIdSuccess(res.data, testCaseName));
		})
		.catch(error => {
			dispatch(getTestCaseLogByIdError(error));
		});
};