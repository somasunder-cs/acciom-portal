import { combineReducers } from 'redux';
import testSuites from './testSuites';
import testSuiteUploadData from './testSuiteUploadReducer';
import loginData from './loginReducer';
import dashboardData from './dashboardReducer';

const rootReducer = combineReducers({
	loginData,
	dashboardData,
	testSuites,
	testSuiteUploadData
});

export default rootReducer;
