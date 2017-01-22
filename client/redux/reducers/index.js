import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import newJobsReducers from './newJobsReducers';

export const reducer = combineReducers(Object.assign({}, 
  { routing: routerReducer },
  newJobsReducers
));