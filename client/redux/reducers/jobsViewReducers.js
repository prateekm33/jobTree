import jobsViewActions from '../actions/jobsViewActions';
import types from '../actions/types';

const jobsViewReducers = {
  activeCompanies(list = {}, action) {
    switch (action.type) {
      case types.toggleActiveCompany:
        if (list[action.company]) {
          const obj = Object.assign({}, list);
          delete obj[action.company];
          return obj
        } else return Object.assign({}, list, {[action.company]: action.company});
      default: return list;
    }
  }
}

export default jobsViewReducers;