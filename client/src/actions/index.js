import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER } from './types';
import authReducer from '../reducers/auth_reducer';

export const CREATE_POSTS = 'CREATE_POSTS';
// const ROOT_URL = 'http://rest.learncode.academy/api/lindsay';
const ROOT_URL = 'http://localhost:3000';

// export const CREATE_POSTS = 'CREATE_POSTS';


export function signinUser({ email, password }) {
	return function(dispatch){
		axios.post(`${ROOT_URL}/signin`, {email, password})
		.then(response => {
			//this only kickstarts if the request was good...
			//we now update the state to indicate authenticated user
			dispatch({ type: AUTH_USER });
			//this will put the token in localStorage. it's safe!

			localStorage.setItem('token', response.data.token);
			//this sends us off to the /newitem view
			browserHistory.push('/newitem');
		})
			.catch(() => {

		});
	}
}
export function createPost(props) {
	const request = axios.post(`${ROOT_URL}/posts`, props);
	return {
		type: CREATE_POSTS,
		payload: request
	};
}