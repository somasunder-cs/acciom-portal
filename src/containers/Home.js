import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { loadTestSuiteFile,	loadTestSuiteSheet } from '../middleware/testSuiteUpload';
import { onTestSuiteSheetSelect } from '../actions';

class Home extends React.Component {
	constructor(props) 
	{ 
		super(props); 
	} 
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

		const getSheetsList = () => {
			console.log('getSheetsList()==>', this.props.pages);
			let sheetList = [];
			if (this.props.pages) {
				sheetList = this.props.pages.map((page, index) => {
					return (
						<div key={index}>
							<div>
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
							<div>
								<input type='button' name="Continue" value="Continue" onClick = { (e) => onContinueClick(page)}/>
							</div>
						</div>
					);
				});
			}
			return sheetList;
		}

		return (
			<div>
				<h1>Upload Test Suite</h1>

				<div>
					<input type="file" className="file" placeholder="Upload file" accept=".xlsx" onChange={ (e) => handleChange(e.target.files)} />
				</div>

				{ getSheetsList() }
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log("Home.mapStateToProps() ", state);
	return {
		pages: state.testSuites.testSuiteUploadData? state.testSuites.testSuiteUploadData.sheets : [] 
	}
};

const mapDispatchToProps = dispatch => ({
	loadTestSuiteFile: (data) => dispatch(loadTestSuiteFile(data)),
	onSheetSelect: (data) => dispatch(onTestSuiteSheetSelect(data)),
	loadTestSuiteSheet: (data) => dispatch(loadTestSuiteSheet(data))	
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
) (Home);