import authActions from '../actions/authActions';
import types from '../actions/types';

const authReducers = {
  user(state = null, action) {
    switch (action.type) {
      case types.logInUser: return action.user;
      case types.logOutUser: return null;
      default: return state;
    }
  }
}

export default authReducers;