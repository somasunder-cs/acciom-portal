import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Panel, Button, Table } from 'react-bootstrap';

import { 
	onTestSuiteSheetSelect, 
	testCaseSelectionChange, 
	testCaseSelectAllToggle,
	loadTestSuiteFile,
	loadTestSuiteSheet,
	uploadTestCases,
	resetTestSuiteUploadData 
} from '../actions/testSuiteUploadActions';

class Home extends React.Component {

	componentDidMount() {
		console.log('Home.componentDidMount() ===>', this.props);
		this.props.resetTestSuiteUploadData();
	}

	render() {
		const MODE_UPLOAD = 0;
		const MODE_UPLOAD_AND_EXECUTE = 1;

		const handleTestSuiteUploadClick = () => {
			document.getElementById("testSuiteUploadFile").click();
		};

		const handleChange = (event) => {
			const selectedFiles = event.target.files;
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
			let element;
			if (this.props.pages.length > 0) {
				const sheetList = this.props.pages.map((page, index) => {
					return (
						<div key={index} className='sheetListItem'>
							<label className="form-check-label">
								<input
									type="radio"
									value={page.name}
									checked={page.selected}
									onChange={ (e) => handleSheetCheckChange(page)}
								/>
								{page.name}
							</label>
						</div>
					);
				});

				element = (
					<Panel className='testSuiteSheetListPanel'>
						<Panel.Heading>Please select the sheet to be loaded</Panel.Heading>
						<Panel.Body>
							<div>{ sheetList } </div>
							<div>
								<Button bsStyle="primary" onClick={ (e) => onContinueClick()}>Load Test Cases</Button> 
							</div>
						</Panel.Body>
					</Panel>
				);
			}

			return element;
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
					<div className='testCaseListContainer'>
						<Panel className='testCaseListPanel'>
							<Panel.Body>
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
									<Button bsStyle="primary" onClick={ (e) => onUploadBtnClick(MODE_UPLOAD_AND_EXECUTE)}>Upload and Execute</Button>								
									<Button bsStyle="primary" onClick={ (e) => onUploadBtnClick(MODE_UPLOAD)}>Upload</Button> 
								</div>
							</Panel.Body>
						</Panel>
					</div>
				)
			}
		};

		return (
			<div id="testSuiteUploadContainer">
				<div className='testSuiteUploadOptions'>
					<Panel className='testSuiteUploadPanel'>
						<Panel.Heading>Upload Test Suite</Panel.Heading>
						<Panel.Body>
							<div className="hideElement">
								<input  id="testSuiteUploadFile" type="file" className="file" placeholder="Upload file" accept=".xlsx" 
									onChange={ (e) => handleChange(e)}/>
							</div>
							<Button bsStyle="primary" onClick={ (e) => handleTestSuiteUploadClick()}>Browse Test Suite File (.xslx)</Button> 
						</Panel.Body>
					</Panel>

					{ getSheetsList() }
				</div>

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
	testCaseSelectAllToggle: () => dispatch(testCaseSelectAllToggle()),
	resetTestSuiteUploadData: () => dispatch(resetTestSuiteUploadData())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
) (Home);