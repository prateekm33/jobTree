import types from './types';

const newJobActions = {
  toggleCompanyForm() {
    return {
      type: types.toggleCompanyForm
    }
  },

  createNewJob() {
    return {
      type: types.createNewJob
    }
  },

  removeJobAt(idx) {
    return {
      type: types.removeJob,
      idx
    }
  }
}

export default newJobActions;