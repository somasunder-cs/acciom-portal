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
	TEST_SUITE_FILE_UPLOAD_SUCCESS
} from '../constants/ActionTypes';

import { browserHistory } from 'react-router';

const initialState = {
	testSuiteList: [],
	loginData: {},
	orgDataQuality: {},
	projectDataQuality: {}
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
		return {
			...state,
			allCases: action.allCases,
			allConnections: action.allConnections
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
	
	case 'TEST_SUITE_SHEET_SELECT':
		sheets = [{name: action.sheet.name, selected:!action.sheet.selected}];
		return {
			...state,
			testSuiteUploadData: {
				sheets
			}
		}
	
	case 'GET_DQI_PROJECT_DETAILS_SUCCESS':
		return {
			...state,
			projectDataQuality: action.data.data
		}	

	default:
		return state;
	 }
};

export default testSuites;