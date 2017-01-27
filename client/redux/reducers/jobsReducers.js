import jobActions from '../actions/jobActions';
import types from '../actions/types';
import { store } from '../store';

import menuItems from '../../components/Home/companySortItems';

const jobsReducers = {
  allJobs(jobs = [], action) {
    switch (action.type) {
      case types.addNewJobsToState:
        action.jobs.data = {jobs: action.jobs.jobs, recruiter: action.jobs.recruiter};
        delete action.jobs.jobs;
        delete action.jobs.recruiter;
        return sort(jobs.concat([action.jobs]), store.getState().companySort);
      case types.sortCompaniesBy:
        if (action.option  === store.getState().companySort) return jobs.map(i=>i).reverse();
        return sort(jobs.map(i => i), action.option);
      case types.fetchedJobs: 
        return action.jobs;
      case types.deleteCompanyAt:
        return jobs.filter((job, idx) => idx !== action.idx);
      case types.editJobAt:
        return jobs.map((company, cIdx) => {
          return Object.assign({}, company, 
            {
              data: {
                jobs: company.data.jobs.map(
                  (job, jIdx) => (jIdx === action.jobIdx && cIdx === action.companyIdx) ? action.job : Object.assign({}, job)
                ),
                recruiter: company.recruiter
              }
            }
          )
        });
      case types.resetState: return [];
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

function sort(arr, option?) {
  if (arr.length > 30) return quickSort(arr, option);
  else return insertionSort(arr, option);
}

function statusCount(status, jobs) {
  return jobs.reduce((count,job) => count + (job.status.toUpperCase() === status.toUpperCase()), 0);
}

function getCompareFn(option) {
  switch (option) {
    case menuItems.company:
      return (a,b) => a.company > b.company;
    case menuItems.jobApps:
      return (a,b) => {
        if (a.data.jobs.length === b.data.jobs.length) return a.company > b.company;
       return a.data.jobs.length > b.data.jobs.length;
      }
    case menuItems.numApplied:
      return (a,b) => {
        if (statusCount('applied', a.data.jobs) === statusCount('applied', b.data.jobs)) return a.company > b.company; 
        return statusCount('applied', a.data.jobs) > statusCount('applied', b.data.jobs);
      }
    case menuItems.numPS:
      return (a,b) => {
        if (statusCount('phone-screen', a.data.jobs) === statusCount('phone-screen', b.data.jobs)) return a.company > b.company; 
        return statusCount('phone-screen', a.data.jobs) > statusCount('phone-screen', b.data.jobs);
      }
    case menuItems.numOS:
      return (a,b) => {
        if (statusCount('on-site', a.data.jobs) === statusCount('on-site', b.data.jobs)) return a.company > b.company; 
        return statusCount('on-site', a.data.jobs) > statusCount('on-site', b.data.jobs);
      }
    case menuItems.numRejected:
      return (a,b) => {
        if (statusCount('rejected', a.data.jobs) === statusCount('rejected', b.data.jobs)) return a.company > b.company; 
        return statusCount('rejected', a.data.jobs) > statusCount('rejected', b.data.jobs);
      }
    case menuItems.numOffers:
      return (a,b) => {
        if (statusCount('offer', a.data.jobs) === statusCount('offer', b.data.jobs)) return a.company > b.company; 
        return statusCount('offer', a.data.jobs) > statusCount('offer', b.data.jobs);
      }
    default: 
      return (a,b) => a > b;
  }
}

function insertionSort(arr, option) {
  const sorted = [];
  const compareFn = getCompareFn(option);
  arr.forEach(val => {
    for (let i = 0; i < sorted.length; i++) {
      if (compareFn(sorted[i], val)) {
        return sorted.splice(i, 0, val);
      }
    }
    return sorted.push(val);
  });

  return sorted;
}

function quickSort(arr, option = null, left = 0, right = arr.length - 1) {
  if (left >= right) return;
  const end = right;
  const start = left;
  const pivot = Math.floor((end + start) / 2);
  
  const val = arr[pivot];
  const compareFn = getCompareFn(option);
  while (left < right) {
    while (compareFn(val, arr[left])) left++;
    while (compareFn(arr[right],val)) right--;
    let temp = arr[left];
    arr[left] = arr[right]
    arr[right] = temp;
    left++;
    right--;
  }
  quickSort(arr, option, start, left - 1);
  quickSort(arr, option, left, end);
  return arr;
}