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
	VIEW_TEST_CASE,
	HIDE_TEST_CASE_DIALOG,
	SHOW_TEST_CASE_EDIT_ENABLED,
	SAVE_MANAGE_CONNECTION_DETAILS,
	SHOW_TEST_CASE_VIEW_ENABLED,
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
			testSuiteList: action.testSuiteList
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
		action.connectionsList.showConnectionsDialog = true;
		action.connectionsList.all_connections.map(connection => (
			connection.checked = false
		));
		return {
			...state,
			connectionsList : action.connectionsList
		};

	case GET_TESTCASE_LOG_BY_ID_SUCCESS:
		console.log("view Testcase log ========>")
		 action.testCaseLog.showCaseLogDialog = true;
		 action.testCaseLog.caseName   = action.testCaseName;
		return {
			...state,
			testCaseLog : action.testCaseLog
		};

	case HIDE_CASE_LOG_DIALOG:
		state.testCaseLog.showCaseLogDialog = false;
		return {
			...state
		};

	case VIEW_TEST_CASE:
		action.testCase.showTestCaseDialog = true;
		return {
			...state,
			testCase : action.testCase
		};

	
	case HIDE_TEST_CASE_DIALOG:
		state.testCase.showTestCaseDialog = false;
		return {
			...state
		};

	case HIDE_MANAGE_CONNECTIONS_DIALOG:
		state.connectionsList.showConnectionsDialog = false;
		return {
			...state
		};

	case SELECT_CONNECTIONS_SUCCESS:
		return {
			...state,
			connectionsSubmitted: {
				success: action.data.success,
				message: action.data.message
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

	case SHOW_TEST_CASE_EDIT_ENABLED:
		console.log('reducer SHOW_TEST_CASE_EDIT_ENABLED===>');
		state.showTestCaseEditEnabled = true;
		return {
			...state
		};
	
	case SHOW_TEST_CASE_VIEW_ENABLED:
		console.log('reducer SHOW_TEST_CASE_VIEW_ENABLED===>');
		state.showTestCaseEditEnabled = false;
		return {
			...state
		};

	default:
		return state;
	 }
};

export default testSuites;