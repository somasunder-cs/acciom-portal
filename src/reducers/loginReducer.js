import { 
	LOGIN_TO_PORTAL_SUCCESS,
	LOGIN_TO_PORTAL_ERROR,
	LOGOUT_FROM_PORTAL_SUCCESS,
	LOGOUT_FROM_PORTAL_ERROR,
} from '../constants/ActionTypes';

const initialState = {
	token: null 
};

const loginData = (state = initialState, action) => {
	switch (action.type) {
	case LOGIN_TO_PORTAL_SUCCESS:
		return {
			...state,
			token : action.data.token
		};

	case LOGIN_TO_PORTAL_ERROR:
		return {
			...state
		};
	
	case LOGOUT_FROM_PORTAL_SUCCESS:
		return {
			...state,
			token: '' 
		};

	case LOGOUT_FROM_PORTAL_ERROR:
		return {
			...state
		};	

	default:
		return state;
	}
};

export default loginData;

