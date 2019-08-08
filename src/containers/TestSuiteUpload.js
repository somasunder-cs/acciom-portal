import React from 'react';
import { connect } from 'react-redux';
import { Panel, Button, Table, Tabs, Tab } from 'react-bootstrap';
import { showProjectSwitchPage } from '../actions/appActions';
import { 
	onTestSuiteSheetSelect, 
	testCaseSelectionChange, 
	testCaseSelectAllToggle,
	loadTestSuiteFile,
	loadTestSuiteSheet,
	uploadTestCases,
	resetTestSuiteUploadData, 
	onSheetNameChange
} from '../actions/testSuiteUploadActions';

const TAB_UPLOAD_FILE = 1;
const TAB_UPLOAD_SHEET = 2;
const TAB_UPLOAD_CASES = 3;

class TestSuiteUpload extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			key: TAB_UPLOAD_FILE,
			sheets:[]
		};
	}

	componentDidMount() {
		this.props.resetTestSuiteUploadData();
	}

	static getDerivedStateFromProps = (nextProps, prevState) => {
		let newState = prevState;
		if (prevState.key === TAB_UPLOAD_FILE && nextProps.pages.length > 0 ) {
			newState = { ...prevState, key: TAB_UPLOAD_SHEET };
		} else if (prevState.key === TAB_UPLOAD_SHEET && nextProps.allCases.length > 0 ) {
			newState = {...prevState, key: TAB_UPLOAD_CASES };
		}
		return newState;
	}

	render() {
		const MODE_UPLOAD = 0;
		const MODE_UPLOAD_AND_EXECUTE = 1;

		const handleTestSuiteUploadClick = () => {
			document.getElementById("testSuiteUploadFile").click();
		};

		const handleChange = (event) => {
			const selectedFiles = event.target.files;
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

		const handleInputChange = (e, index) => {
			// let sheets = [...this.state.sheets];
			// console.log('handleInputChange ', e.target);
			// sheets[index] = e.target.value;
			// this.setState({
			// 	sheets
			// });
			this.props.onSheetNameChange({sheetIndex:index,  displayName: e.target.value});
		}

		const getSheetsList = () => {
			let element;
			let sheets = this.state.sheets;
			if (this.props.pages.length > 0) {
				const sheetList = this.props.pages.map((page, index) => {
					sheets[index] = {
						name: page.name
					};
					return (
						<div key={index} className='sheetListItem'>
							<label className="form-check-label">
								<input
									type="radio"
									value={page.name}
									checked={page.selected}
									onChange={ (e) => handleSheetCheckChange(page)}
								/>
							</label>
							<input type="textbox" className="form-sheet-input" onChange={e => handleInputChange(e, index)} value={page.displayName} />
						</div>
					);
				});

				element = (
					<div>
						<h5 className="margin-title">Please select the sheet to be loaded</h5>
						<div>{ sheetList } </div>
						<div className="margin-button">
							<Button bsStyle="primary" onClick={ (e) => onContinueClick()}>Load Test Cases</Button> 
						</div>
					</div>
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

		const handleSelect = (key) => {
			this.setState({ key });
		};

		const handleSwitchProject = () => {
			this.props.showProjectSwitchPage(true);
		};

		return (
			<div id="suite-upload">
				<div>
					<h4 className='pageTitle'>Update Data Profiling</h4>
					<div className='project-switch'><Button bsStyle="primary" onClick={ (e) => handleSwitchProject()}>Switch Project</Button> </div>
				</div>
				<Tabs activeKey={this.state.key} onSelect={handleSelect} id="controlled-tab-example" >
					<Tab eventKey={TAB_UPLOAD_FILE} title="Upload Data Profiling">
						<div className='testSuiteUploadOptions'>
							<div className="hideElement">
								<input  id="testSuiteUploadFile" type="file" className="file" placeholder="Upload file" accept=".xlsx" 
									onChange={ (e) => handleChange(e)}/>
							</div>
						</div>
						<input className="browse-button" type="textbox" placeholder="example.xlsx" value={this.props.file} disabled/>
						<Button className="browse-button" bsStyle="primary" onClick={ (e) => handleTestSuiteUploadClick()}>Browse Test Suite File (.xslx)</Button>
					</Tab>
			
					<Tab eventKey={TAB_UPLOAD_SHEET} title="Select Sheet">
						{ getSheetsList() }
					</Tab>

					<Tab eventKey={TAB_UPLOAD_CASES} title="Select Test Cases">
						{ getTestCasesList() }
					</Tab>
				</Tabs>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		pages: state.testSuiteUploadData? state.testSuiteUploadData.sheets : [],
		file: state.testSuiteUploadData.file,
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
	resetTestSuiteUploadData: () => dispatch(resetTestSuiteUploadData()),
	showProjectSwitchPage: (data) => dispatch(showProjectSwitchPage(data)),
	onSheetNameChange: (data) => dispatch(onSheetNameChange(data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
) (TestSuiteUpload);