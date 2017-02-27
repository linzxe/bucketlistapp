import axios from 'axios';
import { browserHistory } from 'react-router';

// export const CREATE_POSTS = 'CREATE_POSTS';

// const ROOT_URL = 'http://rest.learncode.academy/api/lindsay';
const ROOT_URL = 'http://localhost:3000';
export const CREATE_POSTS = 'CREATE_POSTS';

// export function createPost(props) {
// 	const request = axios.post(`${ROOT_URL}/posts`, props);
// 	return {
// 		type: CREATE_POSTS,
// 		payload: request
// 	};
// }
export function signinUser({ email, password }) {
	return function(dispatch){
		axios.post(`${ROOT_URL}/signin`, {email, password})
		.then(response => {
			browserHistory.push('/newitem');
		})
			.catch(() => {

			});
	}
}