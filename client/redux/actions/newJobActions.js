import types from './types';

const newJobActions = {
  addNewJobsToState(jobs) {
    return {
      type: types.addNewJobsToState,
      jobs
    }
  },

  postNewJobs(data) {
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.postingNewJobs());
      const user = getState().user;
      return $.ajax('/accounts/jobs/' + user, {
        method: 'post', 
        contentType: 'application/json',
        data: JSON.stringify({data}),
        success: () => {
          dispatch(actions.postedJobs(true));
        },
        error: (err) => {
          dispatch(actions.postedJobs(false));
          dispatch(actions.asyncError(err));
        }
      });

      // fetch('/accounts/jobs/' + user, {
      //   method: 'POST',
      //   credentials: 'include',
      //   body: JSON.stringify({data: data}),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }).then(response => {
      //     dispatch(actions.postedJobs(response.status !== 201));
      //   })
      //   .catch(err => { dispatch(actions.asyncError(err)); });
    }
  },

  postedJobs(err) {
    return {
      type: types.postedJobs,
      err
    }
  },

  postingNewJobs() {
    return {
      type: types.postingNewJobs
    }
  },

  resetJobsPost() {
    return {
      type: types.resetJobsPost
    }
  },

  toggleCompanyForm() {
    return {
      type: types.toggleCompanyForm
    }
  },

  resetCompanyForm() {
    return {
      type: types.resetCompanyForm
    }
  },

  createNewJob() {
    return {
      type: types.createNewJob
    }
  },

  removeJobAt(idx) {
    return {
      type: types.removeJob,
      idx
    }
  }
}

export default newJobActions;