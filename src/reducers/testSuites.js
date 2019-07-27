import { 
	GET_ALL_TEST_SUITES_SUCCESS,
	EXECUTE_TEST_BY_SUITE_ID_SUCCESS ,
	GET_ALL_CONNECTIONS_SUCCESS,
	SELECT_CONNECTIONS_SUCCESS,
	EXECUTE_TEST_BY_CASE_ID_SUCCESS,
	GET_TESTCASE_LOG_BY_ID_SUCCESS,
	LOGIN_TO_PORTAL_SUCCESS,
	LOGIN_TO_PORTAL_ERROR,
	GET_ORG_DATA_QUALITY_SUCCESS,
	MANAGE_CONNECTIONS_CASE_UPDATE,
	HIDE_MANAGE_CONNECTIONS_DIALOG,
	VIEW_TEST_CASE_LOG,
	HIDE_CASE_LOG_DIALOG,
	VIEW_TEST_CASE,
	HIDE_TEST_CASE_DIALOG,
	SHOW_TEST_CASE_EDIT_ENABLED,
	TEST_SUITE_FILE_UPLOAD_SUCCESS,
	SAVE_MANAGE_CONNECTION_DETAILS,
	SHOW_TEST_CASE_VIEW_ENABLED
} from '../constants/ActionTypes';

import { browserHistory } from 'react-router';

const initialState = {
	testSuiteList: [],
	loginData: {},
	orgDataQuality: {},
	projectDataQuality: {},
    connectionsList:{
	   showConnectionsDialog: false,
	   allCases:[],
	   allConnections:[]
	},
	testCaseLog: {
		showCaseLogDialog: false,
		caseLog:[]
	},
	testCase: {
		showTestCaseDialog: false,
		testCaseDetails:[]
	},
	showTestCaseEditEnabled: false
}

const storeUserData = ({access_token, user, uid, refresh_token, name }) => {
	localStorage.setItem('id_token', access_token);
	localStorage.setItem('user', JSON.stringify(user));
	localStorage.setItem('id', uid);
	localStorage.setItem('refresh_token', refresh_token);
	localStorage.setItem('name', name);
};

const testSuites = (state = initialState, action) => {
	let sheets = [];
	switch (action.type) {
	case LOGIN_TO_PORTAL_SUCCESS:
		storeUserData(action.data);
		return {
			...state,
			loginData:action.data
		};

	case LOGIN_TO_PORTAL_ERROR:
		// navigate to verify user page here
		return {
			...state
		};	
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
		console.log('reducer GET_ALL_CONNECTIONS_SUCCESS===>');
		action.connectionsList.showConnectionsDialog = true;
		action.connectionsList.all_connections.map(connection => (
			connection.checked = false
		));
		return {
			...state,
			connectionsList : action.connectionsList		
		};

	case VIEW_TEST_CASE_LOG:
		console.log('reducer VIEW_TEST_CASE_LOG===>');
		 action.testCaseLog.showCaseLogDialog = true;
		return {
			...state,
			testCaseLog : action.testCaseLog		
	};

	case HIDE_CASE_LOG_DIALOG:
		console.log('reducer HIDE_CASE_LOG_DIALOG===>');
		state.testCaseLog.showCaseLogDialog = false;
	return {
		...state
	};

	case VIEW_TEST_CASE:
		console.log('reducer VIEW_TEST_CASE===>');
		 action.testCase.showTestCaseDialog = true;
		return {
			...state,
			testCase : action.testCase		
	};

	case SHOW_TEST_CASE_EDIT_ENABLED:
		console.log('reducer SHOW_TEST_CASE_EDIT_ENABLED===>');
		 action.showTestCaseEditEnabled = true;
		return {
			...state		
	};

	case HIDE_TEST_CASE_DIALOG:
		console.log('reducer HIDE_TEST_CASE_DIALOG===>');
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

	case GET_TESTCASE_LOG_BY_ID_SUCCESS:
		return {
			...state,
			testCaseLog: action.data
		};

	case GET_ORG_DATA_QUALITY_SUCCESS:
		return {
			...state,
			orgDataQuality: action.data
		};


    case MANAGE_CONNECTIONS_CASE_UPDATE:
		return {
			...state
		};

	case TEST_SUITE_FILE_UPLOAD_SUCCESS:
		sheets = action.sheets.map((sheet) => {
			return { name: sheet, selected: false };
		});
		return {
			...state,
			testSuiteUploadData: {
				sheets
			}
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
	
	case 'TEST_SUITE_SHEET_SELECT':
		sheets = [{name: action.sheet.name, selected:!action.sheet.selected}];
		return {
			...state,
			testSuiteUploadData: {
				sheets
			}
		};
	
	case 'GET_DQI_PROJECT_DETAILS_SUCCESS':
		return {
			...state,
			projectDataQuality: action.data.data
		}	
	case 'TEST_SUITE_SHEET_LOAD_SUCCESS':
		state.testSuiteUploadData.sheetData = action.sheetData;
		return {
			...state,
		};
	
	case 'UPLOAD_TESTCASES_SUCCESS':
		return {
			...state,
		};
	
	case 'TEST_CASE_SELECTION_CHANGE':
		console.log('reducer.TEST_CASE_SELECTION_CHANGE==', action.testCase);
		
		const testCases = state.testSuiteUploadData.sheetData.allCases;
		const idx = testCases.indexOf(action.testCase);
		
		return {
			...state,
			testSuiteUploadData: {
				...state.testSuiteUploadData,
				sheetData: {
					...state.testSuiteUploadData.sheetData,
					allCases: [ 
						...state.testSuiteUploadData.sheetData.allCases.slice(0, idx), 
						{ ...action.testCase, selected: !action.testCase.selected },
						...state.testSuiteUploadData.sheetData.allCases.slice(idx + 1)
					]
				}
			}
		};
	default:
		return state;
	 }
};

export default testSuites;