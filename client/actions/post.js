import axios from 'axios';

export function createPost(params) {
  return dispatch => axios.post('/api/posts/create', params)
    .then(response => dispatch({ type: 'CREATE_POST_FULFILLED', payload: response.data }))
    .catch(err => dispatch({ type: 'CREATE_POST_REJECTED', payload: err }));
}

export const resetPost = () => ({ type: 'RESET_POST', payload: true });

export function getPosts() {
  return dispatch => axios.get('/api/posts/getAll')
    .then(response => dispatch({ type: 'GET_POSTS_FULFILLED', payload: response.data }))
    .catch(err => dispatch({ type: 'GET_POSTS_REJECTED', payload: err }));
}

export function fetchPost(id) {
  return dispatch => axios.get(`/api/posts/${id}`)
  .then(response => dispatch({ type: 'FETCH_POSTS_FULFILLED', payload: response.data }))
  .catch(err => dispatch({ type: 'FETCH_POSTS_REJECTED', payload: err }));
}
