import types from './types';

const newJobActions = {
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