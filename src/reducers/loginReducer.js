import { 
	LOGIN_TO_PORTAL_SUCCESS,
	LOGIN_TO_PORTAL_ERROR,
	LOGOUT_FROM_PORTAL_SUCCESS,
	LOGOUT_FROM_PORTAL_ERROR,
	CHANGE_PASSWORD_SUCCESS,
} from '../constants/ActionTypes';

const initialState = {
	token: null,
	passwordChanged: false 
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
	case CHANGE_PASSWORD_SUCCESS:
		return {
			...state,
			passwordChanged: true
		}
	default:
		return state;
	}
};

export default loginData;

