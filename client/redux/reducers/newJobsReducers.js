import newJobActions from '../actions/newJobActions';
import types from '../actions/types';

const newJobsReducers = {
  postedJobs(state = false, action) {
    switch (action.type) {
      case types.postedJobs: return true;
      case types.resetJobsPost: return false;
      case types.resetState: return false;
      default: return state;
    }
  },

  postedSuccessfully(state = false, action) {
    switch(action.type) {
      case types.postedJobs: return !action.err;
      case types.resetJobsPost: return false;
      case types.resetState: return false;
      default: return state;
    }
  },

  newJobsData(data = [], action) {
    switch (action.type) {
      case types.createNewJob:
        return createNewJob(data);
      case types.removeJob:
        return data.filter((job, idx) => idx !== action.idx);
      case types.resetCompanyForm:
        return [{role: '', location: '', status: '', recruiter: '', date_applied: '', company: '', reqURL: ''}];
      case types.resetState: return [];
      default: 
        return data;
    }
  },

  showCompanyForm(show = false, action) {
    switch (action.type) {
      case types.toggleCompanyForm:
        return !show;
      case types.resetState: return false;
      default: return show;
    }
  }
}

function createNewJob(data) {
  const newJob = {role: '', location: '', status: '', recruiter: '', date_applied: '', company: '', reqURL: ''};
  return data.concat([newJob])
}

export default newJobsReducers;