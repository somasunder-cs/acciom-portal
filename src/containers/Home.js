import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { loadTestSuiteFile,	loadTestSuiteSheet, uploadTestCases } from '../middleware/testSuiteUpload';
import { onTestSuiteSheetSelect, testCaseSelectionChange } from '../actions';

class Home extends React.Component {

	render() {
		console.log('render()', this.props);

		const handleChange = (selectorFiles) => {
			console.log('handleChange() selectorFiles ', selectorFiles);
			if (selectorFiles) {
				this.props.loadTestSuiteFile(selectorFiles);	
			}
		};

		const handleSheetCheckChange = (page) => {
			console.log('handleSheetCheckChange() ', page);
			this.props.onSheetSelect(page);
		};

		const onContinueClick = (event) => {
			console.log('onContinueClick ==>');
			this.props.pages.forEach(page => {
				if (page.selected) {
					this.props.loadTestSuiteSheet(page.name);
				}
			});
		}

		const handleTestCaseCheckChange = (testCase) => {
			console.log('handleTestCaseCheckChange', testCase);
			// testCase.selected = !testCase.selected;
			this.props.testCaseSelectionChange(testCase);
		};

		const getSheetsList = () => {
			console.log('getSheetsList()==>', this.props.pages);
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

		const onUploadBtnClick = () => {
			console.log('onUploadBtnClick==>');
			this.props.uploadTestCases();
		}

		const getTestCasesList = () => {
			let testCasesList = [];
			if (this.props.allCases && this.props.allCases.length > 0) {
				testCasesList = this.props.allCases.map((testCase, index) => {
					return (
						<div key={index}>
							<span>{testCase.description}</span>
							<span>{testCase.name}</span>
							<input
								type="checkbox"
								value={testCase.selected}
								id={testCase.name}
								name={testCase.name}
								checked={testCase.selected}
								onChange={ (e) => handleTestCaseCheckChange(testCase)}
							/>
						</div>	
					)
				});			
				
				return (
					<div>
						<div>{testCasesList}</div>	<br />
						<div>
						<input type='button' name="Upload" value="Upload" onClick = { (e) => onUploadBtnClick()}/>
						<input type='button' name="Upload and Execute" value="Upload and Execute" onClick = { (e) => onUploadBtnClick()}/>
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

				{/* <div>
					<span>Test Case Description</span>
					<span>Test Case Name</span>
					<span></span>
				</div> */}

				{ getTestCasesList() }
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log("Home.mapStateToProps() ", state);
	return {
		pages: state.testSuites.testSuiteUploadData? state.testSuites.testSuiteUploadData.sheets : [],
		allCases: state.testSuites.testSuiteUploadData && 
		state.testSuites.testSuiteUploadData.sheetData? state.testSuites.testSuiteUploadData.sheetData.allCases : []
	}
};

const mapDispatchToProps = dispatch => ({
	loadTestSuiteFile: (data) => dispatch(loadTestSuiteFile(data)),
	onSheetSelect: (data) => dispatch(onTestSuiteSheetSelect(data)),
	loadTestSuiteSheet: (data) => dispatch(loadTestSuiteSheet(data)),
	uploadTestCases: (data) => dispatch(uploadTestCases(data)),
	testCaseSelectionChange: (data) => dispatch(testCaseSelectionChange(data))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
) (Home);