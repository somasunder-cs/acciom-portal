import { 
	LOGIN_TO_PORTAL_SUCCESS,
	LOGIN_TO_PORTAL_ERROR,
	LOGOUT_FROM_PORTAL_SUCCESS,
	LOGOUT_FROM_PORTAL_ERROR,
	CHANGE_PASSWORD_SUCCESS,
	AUTHENTICATION_EXPIRED,
	GENERATE_TOKEN_SUCCESS,
	GENERATE_TOKEN_ERROR
} from '../constants/ActionTypes';

const initialState = {
	token: null,
	authTokenExpired: false,
	passwordChanged: false,
	accessToken:''
};

const loginData = (state = initialState, action) => {
	switch (action.type) {
	case LOGIN_TO_PORTAL_SUCCESS:
		return {
			...state,
			token : action.data.token,
			authTokenExpired: false
		};

	case LOGIN_TO_PORTAL_ERROR:
		return {
			...state
		};
	
	case AUTHENTICATION_EXPIRED:
	case LOGOUT_FROM_PORTAL_SUCCESS:
		return {
			...state,
			token: '',
			authTokenExpired: true 
		};

	case LOGOUT_FROM_PORTAL_ERROR:
		return {
			...state
		};

	case CHANGE_PASSWORD_SUCCESS:
		return {
			...state,
			passwordChanged: true
		};
	
	case GENERATE_TOKEN_SUCCESS:
		return {
			...state,
			accessToken:action.accessToken
		};
	default:
		return state;
	}
};

export default loginData;

