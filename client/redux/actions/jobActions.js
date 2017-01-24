import types from './types';

const jobActions = {
  sortCompaniesBy(option) {
    return {
      type: types.sortCompaniesBy,
      option
    }
  }
}

export default jobActions;