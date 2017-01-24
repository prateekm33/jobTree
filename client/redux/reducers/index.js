import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import newJobsReducers from './newJobsReducers';
import jobsViewReducers from './jobsViewReducers';
import jobsReducers from './jobsReducers';

export const reducer = combineReducers(Object.assign({}, 
  { routing: routerReducer },
  newJobsReducers,
  jobsViewReducers,
  jobsReducers
));