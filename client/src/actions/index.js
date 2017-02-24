import axios from 'axios';

export const CREATE_POSTS = 'CREATE_POSTS';

const ROOT_URL = 'http://rest.learncode.academy/api/lindsay';

export function createPost(props) {
	const request = axios.post(`${ROOT_URL}/posts`, props);
	return {
		type: CREATE_POSTS,
		payload: request
	};
}