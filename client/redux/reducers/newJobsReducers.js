import newJobActions from '../actions/newJobActions';
import types from '../actions/types';

const newJobsReducers = {
  newJobsData(data = [], action) {
    switch (action.type) {
      case types.createNewJob:
        return createNewJob(data);
      case types.removeJob:
        return data.filter((job, idx) => idx !== action.idx);
      case types.resetCompanyForm:
        return [{role: '', location: '', status: '', recruiter: '', date_applied: '', company: '', reqURL: ''}];
      default: 
        return data;
    }
  },

  showCompanyForm(show = false, action) {
    switch (action.type) {
      case types.toggleCompanyForm:
        return !show;
      default: return show;
    }
  }
}

function createNewJob(data) {
  const newJob = {role: '', location: '', status: '', recruiter: '', date_applied: '', company: '', reqURL: ''};
  return data.concat([newJob])
}

export default newJobsReducers;