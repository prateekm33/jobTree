import newJobActions from './newJobActions';
import jobsViewActions from './jobsViewActions';
import jobActions from './jobActions';
import authActions from './authActions';
import types from './types';

const actions = Object.assign({},
  newJobActions,
  jobsViewActions,
  jobActions,
  authActions,

  {
    asyncError(err) {
      console.warn('ERROR: ', err);
      return {
        type: types.asyncError
      }
    }
  },

  {
    requestedPath(path) {
      return {
        type: types.requestedPath,
        path
      }
    }
  }
)

export default actions;