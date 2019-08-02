import {
	GET_ORG_DATA_QUALITY_SUCCESS,
	GET_DQI_PROJECT_DETAILS_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
	orgDataQuality: null,
	projectDataQuality: null
};

const dashboardData = (state = initialState, action) => {
	switch (action.type) {
	case GET_ORG_DATA_QUALITY_SUCCESS:
		console.log('dashboardData() orgDataQuality ', action.data)
		return {
			...state,
			orgDataQuality: action.data
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