import jobActions from '../actions/jobActions';
import types from '../actions/types';
import { store } from '../store';

import menuItems from '../../components/Home/companySortItems';

const jobsReducers = {
  allJobs(jobs = [], action) {
    switch (action.type) {
      case types.sortCompaniesBy:
        if (action.option  === store.getState().companySort) return jobs;
        return sortCompaniesBy(action.option, jobs);
      default: return jobs;
    }
  },

  companySort(option = "", action) {
    switch (action.type) {
      case types.sortCompaniesBy:
        return action.option;
      default: return option;
    }
  }
}

export default jobsReducers;


function sortCompaniesBy(option, jobs) {
  switch (option) {
    case menuItems.company:
      return jobs.map(i => i).sort((a,b) => a.company > b.company)
    case menuItems.jobApps:
      return jobs.map(i => i).sort((a,b) => a.data.jobs.length > b.data.jobs.length);
    case menuItems.numApplied:
      return jobs.map(i => i).sort((a,b) => (
        statusCount('applied', a.data.jobs) > statusCount('applied', b.data.jobs)
      ))
    case menuItems.numPS:
      return jobs.map(i => i).sort((a,b) => (
        statusCount('phone-screen', a.data.jobs) > statusCount('phone-screen', b.data.jobs)
      ))
    case menuItems.numOS:
      return jobs.map(i => i).sort((a,b) => (
        statusCount('on-site', a.data.jobs) > statusCount('on-site', b.data.jobs)
      ))
    case menuItems.numRejected:
      return jobs.map(i => i).sort((a,b) => (
        statusCount('rejected', a.data.jobs) > statusCount('rejected', b.data.jobs)
      ))
    case menuItems.numOffers:
      return jobs.map(i => i).sort((a,b) => (
        statusCount('offer', a.data.jobs) > statusCount('offer', b.data.jobs)
      ))
    default: return jobs;
  }
}

function statusCount(status, jobs) {
  return jobs.reduce((count,job) => count + (job.status.toUpperCase() === status.toUpperCase()), 0);
}