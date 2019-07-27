import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';

// import { loadTestSuiteFile,	loadTestSuiteSheet, uploadTestCases } from '../middleware/testSuiteUpload';
import { 
	onTestSuiteSheetSelect, 
	testCaseSelectionChange, 
	testCaseSelectAllToggle,
	loadTestSuiteFile,
	loadTestSuiteSheet,
	uploadTestCases 
} from '../actions/testSuiteUploadActions';

class Home extends React.Component {

	componentDidMount() {
		console.log('Home.componentDidMount() ===>', this.props);
	}

	render() {
		const MODE_UPLOAD = 0;
		const MODE_UPLOAD_AND_EXECUTE = 1;

		const handleChange = (selectedFiles) => {
			console.log('handleChange ', selectedFiles);
			if (selectedFiles) {
				this.props.loadTestSuiteFile(selectedFiles);	
			}
		};

		const handleSheetCheckChange = (page) => {
			this.props.onSheetSelect(page);
		};

		const onContinueClick = (event) => {
			this.props.pages.forEach(page => {
				if (page.selected) {
					this.props.loadTestSuiteSheet(page.name);
				}
			});
		}

		const handleTestCaseCheckChange = (testCase) => {
			this.props.testCaseSelectionChange(testCase);
		};

		const handleSelectAllChange = () => {
			this.props.testCaseSelectAllToggle();
		};

		const getSheetsList = () => {
			let sheetList = [];
			if (this.props.pages.length > 0) {
				sheetList = this.props.pages.map((page, index) => {
					return (
						<div key={index}>
							<div>
								<span>Please select sheet to be loaded</span> <br /> 
								<input
									type="checkbox"
									value={page.name}
									id={page.name}
									name={page.name}
									checked={page.selected}
									onChange={ (e) => handleSheetCheckChange(page)}
								/>
								<label className="form-check-label">{page.name}</label>
							</div>
							<br />
							<div>
								<input type='button' name="Continue" value="Continue" onClick = { (e) => onContinueClick(page)}/>
							</div>
						</div>
					);
				});
			}
			return sheetList;
		}

		const onUploadBtnClick = (mode) => {
			this.props.uploadTestCases(mode);
		};

		const getTestCasesList = () => {
			let testCasesList = [];
			if (this.props.allCases && this.props.allCases.length > 0) {

				testCasesList = this.props.allCases.map((testCase, index) => {
					return (
						<tr key={index}>
							<td>{testCase.description}</td>
							<td>{testCase.name}</td>
							<td>
								<input
									type="checkbox"
									value={testCase.selected}
									id={testCase.name}
									name={testCase.name}
									checked={testCase.selected}
									onChange={ (e) => handleTestCaseCheckChange(testCase)}
								/>
							</td>
						</tr>	
					)
				});			
				
				return (
					<div>
						<Table responsive>
							<thead>
								<tr>
									<th>Test Case Description</th>
									<th>Test Class</th>
									<th>
										<input
											type="checkbox"
											value="Select All"
											id="Select All"
											name="Select All"
											checked= {this.props.selectAll}
											onChange={ (e) => handleSelectAllChange()}
										/> Select All
									</th>
								</tr>
							</thead>
							<tbody>
								{testCasesList}
							</tbody>
						</Table>
						<div>
							<input type='button' name="Upload" value="Upload" onClick = { (e) => onUploadBtnClick(MODE_UPLOAD)}/>
							<input type='button' name="Upload and Execute" value="Upload and Execute" onClick = { (e) => onUploadBtnClick(MODE_UPLOAD_AND_EXECUTE)}/>
						</div>
					</div>
				)
			}
		};

		return (
			<div>
				<h1>Upload Test Suite</h1>

				<div>
					<input type="file" className="file" placeholder="Upload file" accept=".xlsx" onChange={ (e) => handleChange(e.target.files)} />
				</div>

				<br />
				<br />
				
				{ getSheetsList() }

				<br />
				<br />

				{ getTestCasesList() }
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log('Home mapStateToProps ', state);
	return {
		pages: state.testSuiteUploadData? state.testSuiteUploadData.sheets : [],
		allCases: state.testSuiteUploadData && 
			state.testSuiteUploadData.sheetData ? state.testSuiteUploadData.sheetData.allCases : [],
		selectAll: state.testSuiteUploadData ? state.testSuiteUploadData.selectAll : false
	};
};

const mapDispatchToProps = dispatch => ({
	loadTestSuiteFile: (data) => dispatch(loadTestSuiteFile(data)),
	onSheetSelect: (data) => dispatch(onTestSuiteSheetSelect(data)),
	loadTestSuiteSheet: (data) => dispatch(loadTestSuiteSheet(data)),
	uploadTestCases: (data) => dispatch(uploadTestCases(data)),
	testCaseSelectionChange: (data) => dispatch(testCaseSelectionChange(data)),
	testCaseSelectAllToggle: () => dispatch(testCaseSelectAllToggle())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
) (Home);