import { 
	TEST_SUITE_FILE_UPLOAD_SUCCESS,
	TEST_SUITE_SHEET_SELECT,
	TEST_SUITE_SHEET_LOAD_SUCCESS,
	UPLOAD_TESTCASES_SUCCESS,
	TEST_CASE_SELECTION_CHANGE,
	TEST_CASE_SELECT_ALL_TOGGLE,
	RESET_TEST_SUITE_UPLOAD_DATA
} from '../constants/ActionTypes';

const initialState = {
	sheets:[],
	sheetData: null,
	selectAll: false
};

const getSheetsDataOnLoad = (sheets) => {
	return sheets.map((sheet) => {
		return { name: sheet, selected: false };
	});
};

const getUpdatedSheetsDataOnSelectionChange = (sheets, selectedSheet) => {
	return sheets.map((sheet) => {
		if (sheet === selectedSheet) {
			return { ...sheet, selected: true };
		} else {
			return { ...sheet, selected: false };
		}
	});
};

const getTestCaseDataOnSelectAllToggle = (allCases) => {
	return allCases.map(item => {
		return {
			...item,
			selected: !item.selected
		};
	});
};

const testSuiteUploadData = (state = initialState, action) => {
	let sheets = [];
	let testCases = [];
	let index = -1;
	switch (action.type) {
	
	case TEST_SUITE_FILE_UPLOAD_SUCCESS:
		sheets = getSheetsDataOnLoad(action.sheets);
		return {
			...state,
			sheets
		};
	
	case TEST_SUITE_SHEET_SELECT:
		sheets = getUpdatedSheetsDataOnSelectionChange(state.sheets, action.sheet);
		return {
			...state,
			sheets
		};
	
	case TEST_SUITE_SHEET_LOAD_SUCCESS:
		return {
			...state,
			sheetData : action.sheetData
		};
	
	case TEST_CASE_SELECTION_CHANGE:
		index = state.sheetData.allCases.indexOf(action.testCase);
		return {
			...state,
			sheetData: {
				...state.sheetData,
				allCases: [ 
					...state.sheetData.allCases.slice(0, index), 
					{ ...action.testCase, selected: !action.testCase.selected },
					...state.sheetData.allCases.slice(index + 1)
				]
			}
		};
		
	case TEST_CASE_SELECT_ALL_TOGGLE:
		testCases = getTestCaseDataOnSelectAllToggle(state.sheetData.allCases);
		return {
			...state,
			selectAll: !state.selectAll,
			sheetData: {
				...state.sheetData,
				allCases: testCases
			}
		};
	
	case UPLOAD_TESTCASES_SUCCESS:
		return {
			...state,
		};
	
	case RESET_TEST_SUITE_UPLOAD_DATA:
		return initialState;

	default:
		return state;
	}
};

export default testSuiteUploadData;