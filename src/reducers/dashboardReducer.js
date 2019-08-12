import {
	GET_ORG_DATA_QUALITY_SUCCESS,
	GET_DQI_PROJECT_DETAILS_SUCCESS,
	GET_ORGANIZATION_LIST_SUCCESS,
	GET_PROJECT_LIST_BY_ORG_ID_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
	orgDataQuality: null,
	projectDataQuality: null,
	refreshDashBoard: false
};

const dashboardData = (state = initialState, action) => {
	switch (action.type) {
	// case GET_ORGANIZATION_LIST_SUCCESS:
	case GET_PROJECT_LIST_BY_ORG_ID_SUCCESS:
		return {
			...state,
			refreshDashBoard: true
		};

	case GET_ORG_DATA_QUALITY_SUCCESS:
		return {
			...state,
			orgDataQuality: action.data,
			refreshDashBoard: false
		};

	case GET_DQI_PROJECT_DETAILS_SUCCESS:
		return {
			...state,
			projectDataQuality: action.data
		};
	
	default:
		return state;
	}
};

export default dashboardData;