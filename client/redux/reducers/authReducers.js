import authActions from '../actions/authActions';
import types from '../actions/types';

const authReducers = {
  user(state = null, action) {
    switch (action.type) {
      case types.logInUser: return action.user;
      case types.userLoggedOut: return null;
      default: return state;
    }
  },

  invalidCreds(state = false, action) {
    switch (action.type) {
      case types.invalidCreds: return action.invalid;
      case types.resetState: return false;
      default: return state;
    }
  }
}

export default authReducers;