import _orgDataQuality from '../json/org-data-quality.json';
import _projectDataQuality from '../json/project-data-quality-index.json';

import {
	GET_ORG_DATA_QUALITY_SUCCESS,
	GET_ORG_DATA_QUALITY_ERROR,
} from '../constants/ActionTypes';

import { BASE_URL, headers, TIMEOUT } from './appActions';

const getOrgDataQualitySuccess = data => ({
	type: GET_ORG_DATA_QUALITY_SUCCESS,
	data
});

const getOrgDataQualityError = error => ({
	type: GET_ORG_DATA_QUALITY_ERROR,
	error
});

const getDQIprojectDetailsSuccess = data => ({
	type: 'GET_DQI_PROJECT_DETAILS_SUCCESS',
	data
});

const getDQIprojectDetailsError = error => ({
	type: 'GET_DQI_PROJECT_DETAILS_ERROR',
	error
});

export const getOrgDataQuality = () => dispatch => {
	console.log('MW.getOrgDataQuality ');
	// setTimeout(() => {
	// 	dispatch(getOrgDataQualitySuccess(_orgDataQuality.data));
	// }, 2000);

	fetch(`${BASE_URL}/organization-data-quality-index?org_id=1`, {
		method: 'get',
		headers
	})
	.then(res => res.json())
	.then(res => {
		if(res.error) {
			dispatch(getOrgDataQualityError(res.error));
		}
		dispatch(getOrgDataQualitySuccess(res.data));
	})
	.catch(error => {
		dispatch(getOrgDataQualityError(error));
	});
};

export const getDQIprojectDetails = (project_id) => dispatch => {
	// setTimeout(() => {
	// 	dispatch(getDQIprojectDetailsSuccess(_projectDataQuality));
	// }, TIMEOUT);

	fetch(`${BASE_URL}/project-data-quality-index?project_id=${project_id}`, {
		method: 'get',
		headers
	})
	.then(res => res.json())
	.then(res => {
		if(res.error) {
			dispatch(getDQIprojectDetailsError(res.error));
		}
		dispatch(getDQIprojectDetailsSuccess(res.data));
	})
	.catch(error => {
		dispatch(getDQIprojectDetailsError(error));
	});
};