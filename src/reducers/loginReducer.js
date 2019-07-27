import { 
	LOGIN_TO_PORTAL_SUCCESS,
	LOGIN_TO_PORTAL_ERROR,
} from '../constants/ActionTypes';

const initialState = {
	loginData:null
};

const storeUserData = ({access_token, user, uid, refresh_token, name }) => {
	localStorage.setItem('id_token', access_token);
	localStorage.setItem('user', JSON.stringify(user));
	localStorage.setItem('id', uid);
	localStorage.setItem('refresh_token', refresh_token);
	localStorage.setItem('name', name);
};

const loginData = (state = initialState, action) => {
	switch (action.type) {
	case LOGIN_TO_PORTAL_SUCCESS:
		storeUserData(action.data);
		return {
			...state,
			loginData:action.data
		};

	case LOGIN_TO_PORTAL_ERROR:
		return {
			...state
		};

	default:
		return state;
	}
};

export default loginData;

