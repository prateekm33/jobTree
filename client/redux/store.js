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


const defaultState = {
  newJobsData: [],

  showCompanyForm: false
}


export function configureStore(initialState = defaultState) {
  return finalCreateStore(reducer, initialState);
}

export const store = configureStore();