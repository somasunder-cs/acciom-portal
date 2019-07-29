export const TIMEOUT = 100;
export const BASE_URL= 'http://172.16.21.192:5000/api';
export const headers = {
	'Content-Type': 'application/json',
	'Authorization':''
};

export const updateHeaders = (authToken) => {
	headers.Authorization = `Bearer ${authToken}`;
};