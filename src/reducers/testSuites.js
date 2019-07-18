import { 
	GET_ALL_TEST_SUITES_SUCCESS,
	EXECUTE_TEST_BY_SUITE_ID_SUCCESS ,
	GET_ALL_CONNECTIONS_SUCCESS,
	SELECT_CONNECTIONS_SUCCESS,
	EXECUTE_TEST_BY_CASE_ID_SUCCESS,
	GET_TESTCASE_LOG_BY_ID_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
	testSuiteList: []
}

const testSuites = (state = initialState, action) => {
	switch (action.type) {
	case GET_ALL_TEST_SUITES_SUCCESS:
		// console.log('reducer: testSuites.LOAD_TEST_SUITES ==>', action);
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

	default:
		// console.log('reducer: testSuites.default ==>');
		return state;
	 }
};

export default testSuites;