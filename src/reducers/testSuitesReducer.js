import { 
	GET_ALL_TEST_SUITES_SUCCESS,
	EXECUTE_TEST_BY_SUITE_ID_SUCCESS ,
	GET_ALL_CONNECTIONS_SUCCESS,
	SELECT_CONNECTIONS_SUCCESS,
	EXECUTE_TEST_BY_CASE_ID_SUCCESS,
	GET_TESTCASE_LOG_BY_ID_SUCCESS,
	MANAGE_CONNECTIONS_CASE_UPDATE,
	HIDE_MANAGE_CONNECTIONS_DIALOG,
	VIEW_TEST_CASE_LOG,
	HIDE_CASE_LOG_DIALOG,
	GET_TEST_CASE_BY_TEST_CASE_ID_SUCCESS,
	UPDATE_TEST_CASE_SUCCESS,
	HIDE_TEST_CASE_DIALOG,
	SHOW_TEST_CASE_EDIT_ENABLED,
	SAVE_MANAGE_CONNECTION_DETAILS,
	SHOW_TEST_CASE_VIEW_ENABLED,
	GET_TESTCASE_DETAIL_BY_SUITE_ID_SUCCESS,
} from '../constants/ActionTypes';

import { browserHistory } from 'react-router';

const initialState = {
	testSuiteList: [],
	connectionsList:{
	   showConnectionsDialog: false,
	   allCases:[],
	   allConnections:[]
	},
	testCaseLog: {
		showCaseLogDialog: false,
		caseLog:[],
		caseName: null
	},
	testCase: {
		showTestCaseDialog: false,
		testCaseDetails:[]
	},
	showTestCaseEditEnabled: false
}

const testSuites = (state = initialState, action) => {
	switch (action.type) {
	case GET_ALL_TEST_SUITES_SUCCESS:
		return {
			...state,
			testSuiteList: action.testSuiteList.test_suite_details_list
		};

	case EXECUTE_TEST_BY_SUITE_ID_SUCCESS:
		return {
			...state,
			testExecutionResult:{
				success: action.data.success,
			}
		};
	
	case EXECUTE_TEST_BY_CASE_ID_SUCCESS:
		return {
			...state,
			testExecutionResult:{
				success: action.data.success,
			}
		};	

	case GET_ALL_CONNECTIONS_SUCCESS:
		action.connectionsList.all_connections.map(connection => (
			connection.checked = false
		));
		return {
			...state,
			connectionsList : { 
				...state.connectionsList,
				allConnections: action.connectionsList.all_connections
			}
		};

	case GET_TESTCASE_DETAIL_BY_SUITE_ID_SUCCESS:
		return {
			...state,
			connectionsList : { 
				...state.connectionsList,
				allCases: action.allCases,
				showConnectionsDialog: true
			}
		};

	case GET_TESTCASE_LOG_BY_ID_SUCCESS:
		 action.testCaseLog.showCaseLogDialog = true;
		 action.testCaseLog.caseName  = action.testCaseName;
		return {
			...state,
			testCaseLog : action.testCaseLog
		};

	case HIDE_CASE_LOG_DIALOG:
		state.testCaseLog.showCaseLogDialog = false;
		return {
			...state
		};

	case GET_TEST_CASE_BY_TEST_CASE_ID_SUCCESS:
		action.testCase.showTestCaseDialog = true;
		return {
			...state,
			testCase : action.testCase
		};
	
	case UPDATE_TEST_CASE_SUCCESS:
		return {
			...state,
			testCase : {
				message: action.message,
				testCaseDetails: [],
				showTestCaseDialog: false
			}
		};
	
	case HIDE_TEST_CASE_DIALOG:
		return {
			...state,
			testCase: {
				...state.testCase,
				showTestCaseDialog: false
			}
		};

	case HIDE_MANAGE_CONNECTIONS_DIALOG:
		return {
			...state,
			connectionsList:{
				...state.connectionsList,
				showConnectionsDialog: false
			}
		};

	case SELECT_CONNECTIONS_SUCCESS:
		return {
			...state,
			connectionsList:{
				...state.connectionsList,
				showConnectionsDialog: false
			}
		};

	// case GET_TESTCASE_LOG_BY_ID_SUCCESS:
	// 	return {
	// 		...state,
	// 		testCaseLog: action.data
	// 	};

	case MANAGE_CONNECTIONS_CASE_UPDATE:
		return {
			...state
		};

	case SHOW_TEST_CASE_EDIT_ENABLED:;
		state.showTestCaseEditEnabled = true;
		return {
			...state
		};
	
	case SHOW_TEST_CASE_VIEW_ENABLED:
		state.showTestCaseEditEnabled = false;
		return {
			...state
		};

	default:
		return state;
	 }
};

export default testSuites;