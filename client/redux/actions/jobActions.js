import types from './types';

const jobActions = {
  sortCompaniesBy(option) {
    return {
      type: types.sortCompaniesBy,
      option
    }
  },

  fetchJobs(user) {
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.fetchingJobs());
      const user = getState().user;
      return fetch('/accounts/jobs/' + user, {
        method: 'get',
        credentials: 'include',
      }).then(r => {
        if (r.status !== 200) dispatch(actions.errorFetchingJobs(r));
        else return r.json();
      }).then(jobs => {
        if (jobs) dispatch(actions.fetchedJobs(jobs));
      })
      .catch(err => dispatch(actions.asyncError(err)));
    }
  },

  fetchingJobs() {
    return {
      type: types.fetchingJobs
    }
  },

  errorFetchingJobs(res) {
    return {
      type: types.errorFetchingJobs
    }
  },

  fetchedJobs(jobs) {
    return {
      type: types.fetchedJobs,
      jobs
    }
  }
}

export default jobActions;