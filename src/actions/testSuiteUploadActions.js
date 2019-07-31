import XLSX from 'xlsx';
import { TEST_SUITE_FILE_UPLOAD_SUCCESS } from '../constants/ActionTypes';
import { BASE_URL, headers } from './appActions';

let pages = [];
let workbook = {};
let testSuiteFile = null;
let selectedSheet = null;
let suiteName = '';
// let selectedTestCases = [];

const show=false;
const show1=true;

let temp_db_detailarr = []
let temp_table_detail = [];
let temp_column_detail = [];
let all_cases = [];

// const headers = {
// 	'Accept': 'application/json, text/plain, */*',
// 	'Content-Type': 'application/json',
// 	'Authorization':''
// };

const testSuiteFileUploadSuccess = sheets => ({
	type: TEST_SUITE_FILE_UPLOAD_SUCCESS,
	sheets
});

const testSuiteSheetloadSuccess = sheetData => ({
	type: 'TEST_SUITE_SHEET_LOAD_SUCCESS',
	sheetData
});

const uploadTestCasesSuccess = data => ({
	type: 'UPLOAD_TESTCASES_SUCCESS',
	data
});

const uploadTestCasesError = data => ({
	type: 'UPLOAD_TESTCASES_ERROR',
	data
});
export const resetTestSuiteUploadData = (sheet) => ({
	type: 'RESET_TEST_SUITE_UPLOAD_DATA',
	sheet
});
export const onTestSuiteSheetSelect = (sheet) => ({
	type: 'TEST_SUITE_SHEET_SELECT',
	sheet
});

export const testCaseSelectionChange = (testCase) => ({
	type: 'TEST_CASE_SELECTION_CHANGE',
	testCase
});

export const testCaseSelectAllToggle = () => ({
	type: 'TEST_CASE_SELECT_ALL_TOGGLE'
});	

const getPostFilePayloadData = (fileToUpload, selectedSheet, selectedCase, suiteName, executeValue) => {
	// const payload = {
	// 	'inputFile': fileToUpload,
	// 	'sheet_name':selectedSheet,
	// 	'selected_case': selectedCase,
	// 	'suite_name': suiteName,
	// 	'execute': executeValue,
	// 	'project_id':'2',// to be passed 
	// };
	const payload = new FormData();
	payload.append('inputFile',fileToUpload);
	payload.append('sheet_name',selectedSheet);
	payload.append('selected_case',selectedCase);
	payload.append('suite_name',suiteName);
	payload.append('execute',executeValue);
	payload.append('project_id', 2);
	// return JSON.stringify(payload);
	return payload;
};

export const loadTestSuiteFile = (selectedFiles) => dispatch => {
	console.log('loadTestSuiteFile ', selectedFiles);
	// handleChange(sheets);
	const file = selectedFiles[0];
	const fileReader = new FileReader();

	fileReader.onload = (evt) => {
		const arrayBuffer = fileReader.result;
		const data = new Uint8Array(arrayBuffer);
		const arr = [];

		for (let i = 0; i !== data.length; ++i) {
			arr[i] = String.fromCharCode(data[i]);
		}
		
		const bstr = arr.join("");
		workbook = XLSX.read(bstr, {type:"binary"});

		if (typeof pages !== 'undefined' && pages.length > 0) {
			pages = [];
		}

		for ( let x=0; x!==data.length; x++) {
			if (!workbook.SheetNames[x]) {
				break;
			} else {
				pages.push(workbook.SheetNames[x]);
			}
		}
		console.log('pages===>', pages);

		dispatch(testSuiteFileUploadSuccess(pages));
	};

	testSuiteFile = file;
	fileReader.readAsArrayBuffer(file);
	// console.log('loadTestSuiteFile temp_db_detailarr==', temp_db_detailarr);
	// console.log('loadTestSuiteFile all_cases==', all_cases);
};

export const loadTestSuiteSheet = (page) => dispatch => {
	console.log('loadTestSuiteSheet ', page);
	selectedSheet = page;
	const index = pages.findIndex(page_p=>page_p===page);
	const sheetName = workbook.SheetNames[index];
	const sheet = workbook.Sheets[sheetName];
	const resfinal = (XLSX.utils.sheet_to_json(sheet, {raw:true}));
	
	temp_db_detailarr = []
	temp_table_detail = [];
	temp_column_detail = [];
	all_cases = [];

	for (let i=0; i<resfinal.length; i++)
	{
		temp_db_detailarr.push(resfinal[i]['DB Details']); //TO DO:HARD CODED.['Test Class']
		all_cases.push({'id':i,'name':resfinal[i]['Test Class'],'selected':false, 'description':resfinal[i]['Description']});
		temp_table_detail.push(resfinal[i]['Source Table:Target Table']);
		temp_column_detail.push(resfinal[i]['Columns']);
	}

	dispatch(testSuiteSheetloadSuccess({dbDetailsList: temp_db_detailarr, allCases: all_cases }));

	// below func validate the 1st column all row
	// console.log('temp_db_detailarr==', temp_db_detailarr);
	// console.log('all_cases==', all_cases);

	//    if(!this.validate_case_name(this.all_cases)){
	// 	 console.log("2")
	// 	 this.clearAll("Filecannot be Uploaded, Case name is not Valid")
	// 	 return;
	//    }
	//    //below func validate db details
	//    if(!this.validate_db_detail(this.temp_db_detailarr)){
	// 	   this.clearAll("filecannot be uploaded, db details are not valid")
	// 	   return;
	//    }
	//    // below func to validate table name
	//   if(!this.validate_table_names(this.temp_table_detail)){
	// 	   this.clearAll("filecannot be uploaded, Table Names are not valid")
	// 	   return;
	//   }
	//  prog=75; 

	//  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {   
	//    width: '250px',
	//    data : {suitename :this.suitename}
	   
	//  });
	//  dialogRef.afterClosed().subscribe(result => {
	//   this.suitename = result
	//  });
};

export const uploadTestCases = (executeValue) => (dispatch, getState) => {
	console.log('uploadTestCases ==', getState().testSuiteUploadData.sheetData.allCases);

	const selectedTestCases = [] 
	getState().testSuiteUploadData.sheetData.allCases.map((item) => {
		if (item.selected) {
			selectedTestCases.push(item.id);
		}
	});
	console.log('selectedTestCases', selectedTestCases );

	// this.spinnerService.show();
	// this.MyModel=null;
	// this.show=false;
	// this.show1=false;

	 // v value specifies to upload or upload+execute
	//  if (mode == 0) {
	// 	 // upload only
	//    this.executevalue = 0
	//  }else{
	// 	 // upload and execute
	//    this.executevalue = 1
	//  }

	// this.changessaved=true;

	 // tmp Code. Will change after sheet rename file popup dialog
	suiteName = selectedSheet;
	 
	// this.fileUploadService.postFile(testSuiteFile, selectedSheet, selectedTestCases, suitename, executevalue).subscribe(data => {
		// this.name=data['message']
		// this.filevalue=null;
		// this.disable=true;
		// this.disable2=true;
		// Swal("Success","Succesfully Uploaded Quality Suite","success")
		// this.all_cases=[];
		// this.initialisecases();
		// this.response=this.name;
		// this.router.navigate(['/startup'])
		// this.selectedValue=[]
		// this.spinnerService.hide();
	//   }, error => {
		// this.spinnerService.hide();
  		// Swal("error"," filecannot be uploaded","error")
		// this.filevalue=null;
		// this.all_cases=[];    
		// this.initialisecases();
	//   });

	const body = getPostFilePayloadData(testSuiteFile, selectedSheet, selectedTestCases, suiteName, executeValue);
	// const _headers = {...headers};
	const _headers = new Headers({'Authorization': headers.Authorization});
	// delete(_headers['Content-Type']);
	// _headers['Content-Type'] = 'text/plain;charset=UTF-8';
	// _headers['Content-Type'] = 'multipart/form-data';
	// _headers['Content-Type'] = 'application/x-www-form-urlencoded';
	// _headers['content-disposition'] = 'form-data;name="textfield"';
	// _headers['Content-Type'] = "Content-Disposition: form-data"; 
	// Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

	fetch(`${BASE_URL}/test-suite`, {
		method: 'post',
		headers: _headers,
		body
	})
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				dispatch(uploadTestCasesError(res.error));
			}
			dispatch(uploadTestCasesSuccess(res.data));
		})
		.catch(error => {
			dispatch(uploadTestCasesError(error));
		});
}

// postFile(fileToUpload: File,selectedsheet:any,selectedCase:any,suitename:any,executevalue:any):Observable<any>{
//     console.log("came in service")
//     const upload=new FormData()
//     upload.append('inputFile',fileToUpload)
//     upload.append('sheet',selectedsheet)
//     upload.append('selectedcase',selectedCase)
//     upload.append('suitename',suitename)
//     upload.append('exvalue',executevalue)
//     this.loadToken()
//     this.newtoken='Bearer'+" "+this.authToken
//     let headers = new HttpHeaders().set('Authorization',this.newtoken)
//     return this.http.post<any>(`${this.url}/test-suite`,upload,{headers: headers}); 
//   }
