import types from './types';

const jobActions = {
  sortCompaniesBy(option) {
    return {
      type: types.sortCompaniesBy,
      option
    }
  },

  saveUserState(user) {
    const actions = this;

    return function(dispatch, getState) {
      if (!user) return;
      dispatch(actions.savingState());
      const companies = getState().allJobs;
      return updateCompanies(companies, user, dispatch, actions);
    }
  },

  savingState() {
    return {
      type: types.savingState
    }
  },

  fetchJobs(user) {
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.fetchingJobs());
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
  },

  deleteCompany(idx) {
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.deleteCompanyAt(idx));
      const companies = getState().allJobs;
      const user = getState().user;
      return updateCompanies(companies, user, dispatch, actions);
    }
  },

  deleteCompanyAt(idx) {
    return {
      type: types.deleteCompanyAt,
      idx
    }
  },

  editJobAt(companyIdx, jobIdx, job) {
    return {
      type: types.editJobAt,
      companyIdx,
      jobIdx,
      job
    }
  }
}

export default jobActions;


function updateCompanies(companies, user, dispatch, actions) {
  return fetch('/accounts/jobs' + '/' + user, {
        method: 'put', 
        credentials: 'include',
        body: JSON.stringify({companies}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.status !== 200) {}
        else {

        }
      })
        .catch(err => dispatch(actions.asyncError(err)));
}