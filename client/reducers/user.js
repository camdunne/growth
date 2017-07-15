
export default function reducer(state = {
  loggedIn: false,
  errorMessage: null,
  email: null,
}, action) {
  switch (action.type) {
    case 'GET_PROFILE_FULFILLED': {
      return {
        ...state,
        loggedIn: true,
        errorMessage: null,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        profilePic: action.payload.profilePic,
      };
    }
    case 'GET_PROFILE_REJECTED': {
      return {
        ...state,
        loggedIn: false,
        errorMessage: action.payload.message[0],
        email: null,
      };
    }

    default:
      return state;
  }
}
