import newJobActions from '../actions/newJobActions';
import types from '../actions/types';

const newJobsReducers = {
  newJobsData(data = [], action) {
    switch (action.type) {
      case types.createNewJob:
        return createNewJob(data);
      case types.removeJob:
        return data.filter((job, idx) => idx !== action.idx);
      default: 
        return data;
    }
  }
}

function createNewJob(data) {
  const newJob = {role: '', location: '', status: '', recruiter: '', date_applied: '', company: '', reqURL: ''};
  return data.concat([newJob])
}


export default newJobsReducers;