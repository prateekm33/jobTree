import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { reducer } from './reducers';
import thunk from 'redux-thunk';
const historyMiddleware = routerMiddleware(browserHistory);
// import logger from 'redux-logger';
// const middleWares = [logger(), thunk, historyMiddleware];
const middleWares = [thunk, historyMiddleware]
const finalCreateStore = compose(
  applyMiddleware(...middleWares)
)(createStore);

const defaultState = {
  allJobs: [],
  companySort: '',

  user: null,
  invalidCreds: false,

  newJobsData: [],
  postedSuccessfully: false,
  postedJobs: false,

  showCompanyForm: false,

  activeCompanies: {},

  requestedPath: '/home',

  showSaveBtn: false

}


export function configureStore(initialState = defaultState) {
  return finalCreateStore(reducer, initialState);
}

export const store = configureStore();