import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { reducer } from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
const historyMiddleware = routerMiddleware(browserHistory);

const finalCreateStore = compose(
  applyMiddleware(logger(), thunk, historyMiddleware)
)(createStore);

import {jobs} from '../mockData';
const allJobs = [];
for (let company in jobs) {
  allJobs.push({company, data: jobs[company]});
}

const defaultState = {
  allJobs: allJobs,
  companySort: '',

  newJobsData: [],

  showCompanyForm: false,

  activeCompanies: {}
}


export function configureStore(initialState = defaultState) {
  return finalCreateStore(reducer, initialState);
}

export const store = configureStore();