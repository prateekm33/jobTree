import types from './types';

const jobsViewActions = {
  toggleActiveCompany(company) {
    return {
      type: types.toggleActiveCompany,
      company
    }
  }
}

export default jobsViewActions;