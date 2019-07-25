import XLSX from 'xlsx';
import { testSuiteFileUploadSuccess, testSuiteSheetloadSuccess } from '../actions';

const pages = [];
let workbook = {};

const show=false;
const show1=true;

let temp_db_detailarr = []
let temp_table_detail = [];
let temp_column_detail = [];
let all_cases = [];

export const loadTestSuiteSheet = (page) => dispatch => {
	console.log('loadTestSuiteSheet ', page);
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

	dispatch(testSuiteSheetloadSuccess(pages));

	// below func validate the 1st column all row
	console.log('temp_db_detailarr==', temp_db_detailarr);
	console.log('all_cases==', all_cases);
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
			pages=[];
		}

		for ( let x=0; x!==data.length; x++) {
			if (!workbook.SheetNames[x]) {
				break;
			} else {
				pages.push(workbook.SheetNames[x]);
			}
		}
		console.log('pages===>', pages);
		
		// Next(pages[0]);
		dispatch(testSuiteFileUploadSuccess(pages));
	};

	fileReader.readAsArrayBuffer(file);
	// console.log('loadTestSuiteFile temp_db_detailarr==', temp_db_detailarr);
	// console.log('loadTestSuiteFile all_cases==', all_cases);
};
