import newJobActions from './newJobActions';
import jobsViewActions from './jobsViewActions';
import jobActions from './jobActions';
import authActions from './authActions';

const actions = Object.assign({},
  newJobActions,
  jobsViewActions,
  jobActions,
  authActions,

  {
    asyncError(err) {
      console.log('HTTP ERROR: ', err);
      return {
        type: types.asyncError
      }
    }
  }
)

export default actions;