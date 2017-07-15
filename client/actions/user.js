import axios from 'axios';

export function getProfile(params) {
  return dispatch => axios.get('/api/users/profile')
    .then(response => dispatch({ type: 'GET_PROFILE_FULFILLED', payload: response.data }))
    .catch(err => dispatch({ type: 'GET_PROFILE_REJECTED', payload: err }));
}
