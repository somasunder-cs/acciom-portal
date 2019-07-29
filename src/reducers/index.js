import { combineReducers } from 'redux';
import testSuites from './testSuites';
import testSuiteUploadData from './testSuiteUploadReducer';
import loginData from './loginReducer';
import dashboardData from './dashboardReducer';
import dbDetailsData from './dbDetailsReducer';

const rootReducer = combineReducers({
	loginData,
	dashboardData,
	testSuites,
	testSuiteUploadData,
	dbDetailsData
});

export default rootReducer;
