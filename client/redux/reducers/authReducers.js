import authActions from '../actions/authActions';
import types from '../actions/types';

const authReducers = {
  user(state = null, action) {
    switch (action.type) {
      case types.logInUser:
        action.cb && action.cb();
        return action.user;
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
  },

  fetchingUser(state = false, action) {
    switch (action.type) {
      case types.fetchingUser: return action.fetching;
      default: return state;
    }
  }
}

export default authReducers;