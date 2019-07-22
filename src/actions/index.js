import { 
	LOGIN_TO_PORTAL_SUCCESS,
	LOGIN_TO_PORTAL_ERROR,
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
	GET_ALL_DB_DETAILS_SUCCESS,
	GET_ALL_DB_DETAILS_ERROR,
	GET_DB_DETAILS_BY_ID_SUCCESS,
	GET_DB_DETAILS_BY_ID_ERROR,
	UPDATE_DB_DETAILS_SUCCESS,
	UPDATE_DB_DETAILS_ERROR,
	GET_TESTCASE_LOG_BY_ID_SUCCESS,
	GET_ORG_DATA_QUALITY_ERROR,
	GET_ORG_DATA_QUALITY_SUCCESS
} from "../constants/ActionTypes"; 

export const loginToPortalSuccess = data =>({
	type: LOGIN_TO_PORTAL_SUCCESS,
	data
})

export const loginToPortalError = data =>({
	type: LOGIN_TO_PORTAL_ERROR,
	data
})

export const getAllTestSuitesSuccess = testSuiteList => ({
	type: GET_ALL_TEST_SUITES_SUCCESS,
	testSuiteList
});

export const getAllTestSuitesError = testSuiteList => ({
	type: GET_ALL_TEST_SUITES_ERROR,
	testSuiteList
});

export const executeTestBySuiteIdSuccess = data => ({
	type: EXECUTE_TEST_BY_SUITE_ID_SUCCESS,
	data
});

export const executeTestBySuiteIdError = error => ({
	type: EXECUTE_TEST_BY_SUITE_ID_ERROR,
	error
});

export const executeTestByCaseIdSuccess = data => ({
	type: EXECUTE_TEST_BY_CASE_ID_SUCCESS,
	data
});

export const executeTestByCaseIdError = error => ({
	type: EXECUTE_TEST_BY_CASE_ID_ERROR,
	error
});

export const getAllConnectionsSuccess = connectionsList => ({
	type: GET_ALL_CONNECTIONS_SUCCESS,
	connectionsList
});

export const getAllConnectionsError = error => ({
	type: GET_ALL_CONNECTIONS_ERROR,
	error
});

export const selectConnectionsSuccess = data => ({
	type: SELECT_CONNECTIONS_SUCCESS,
	data
});

export const selectConnectionsError = error => ({
	type: SELECT_CONNECTIONS_ERROR,
	error
});

export const getAllDBDetailsSuccess = data => ({
	type: GET_ALL_DB_DETAILS_SUCCESS,
	data
});

export const getAllDBDetailsError = error => ({
	type: GET_ALL_DB_DETAILS_ERROR,
	error
});

export const getDBDetailsByIdSuccess = data => ({
	type: GET_DB_DETAILS_BY_ID_SUCCESS,
	data
});

export const getDBDetailsByIdError = error => ({
	type: GET_DB_DETAILS_BY_ID_ERROR,
	error
});

export const updateDBDetailsSuccess = data => ({
	type: UPDATE_DB_DETAILS_SUCCESS,
	data
});

export const updateDBDetailsError = error => ({
	type: UPDATE_DB_DETAILS_ERROR,
	error
});

export const getTestCaseLogByIdSuccess = data => ({
	type: GET_TESTCASE_LOG_BY_ID_SUCCESS,
	data
});

export const getTestCaseLogByIdError = error => ({
	type: GET_ALL_CONNECTIONS_ERROR,
	error
});

export const getOrgDataQualitySuccess = response => ({
	type: GET_ORG_DATA_QUALITY_SUCCESS,
	data: response.data
});

export const getOrgDataQualityError = error => ({
	type: GET_ORG_DATA_QUALITY_ERROR,
	error
});