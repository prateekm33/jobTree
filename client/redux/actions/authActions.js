import types from './types';
import { replace } from 'react-router-redux';
import { store } from '../store';

const authActions = {
  submitAuthForm(user, id) {
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.authorizingUser());
      let endpoint;
      if (id.indexOf('signup') > -1) endpoint = '/accounts';
      else endpoint = '/auth/login';
      return $.ajax(endpoint, {
        method: 'post',
        data: JSON.stringify(user),
        contentType: 'application/json',
        success: (user) => {
          console.log('USER: ', user);
          dispatch(actions.logInUser(user));
          const requestedPath = getState().requestedPath;
          dispatch(replace(requestedPath));
        },
        error: (err) => {
          dispatch(actions.invalidCreds(true));
        }
      })

      // return fetch(endpoint, {
      //   method: 'POST', 
      //   body: JSON.stringify(user),
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   credentials: 'include'
      // }).then(res => {
      //   if (res.status === 201 || res.status === 200) {
      //     dispatch(actions.logInUser(user.username));
      //     const requestedPath = getState().requestedPath;
      //     dispatch(replace(requestedPath));
      //   } else dispatch(actions.invalidCreds(true));
      // }).catch(err => actions.asyncError(err));
    }
  },

  authorizingUser() {
    return {
      type: types.authorizingUser
    }
  },

  fetchingUser(fetching) {
    return {
      type: types.fetchingUser,
      fetching
    }
  },

  logInUser(user, cb?) {
    store.dispatch(this.fetchJobs(user));
    return {
      type: types.logInUser,
      user,
    }
  },

  logOutUser() {
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.loggingOutUser());
      const user = getState().user;

      return $.ajax('/auth/logout', {
        method: 'post',
        data: JSON.stringify({username: user}),
        contentType: 'application/json',
        success: () => {
          dispatch(actions.userLoggedOut());
          dispatch(actions.resetState());
          dispatch(replace('/'));
        },
        error: (err) => {
          dispatch(actions.logOutError(err));
          dispatch(actions.asyncError(err));
        }
      });

      // return fetch('/auth/logout', {
      //   method: 'POST',
      //   body: JSON.stringify({username: user}),
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   credentials: 'include'
      // }).then(r => {
      //   if (r.status === 200) {
      //     dispatch(actions.userLoggedOut());
      //     dispatch(actions.resetState());
      //     dispatch(replace('/'));
      //   } else {
      //     dispatch(actions.logOutError());
      //   }
      // }).catch(err => dispatch(actions.asyncError(err)));
    }
  },

  userLoggedOut() {
    return {
      type: types.userLoggedOut
    }
  },

  loggingOutUser() {
    return {
      type: types.loggingOutUser
    }
  },
  logOutError() {
    return {
      type: types.logOutError
    }
  },

  invalidCreds(invalid) {
    return {
      type: types.invalidCreds,
      invalid
    }
  }
}

export default authActions;