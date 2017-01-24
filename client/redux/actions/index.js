import newJobActions from './newJobActions';
import jobsViewActions from './jobsViewActions';
import jobActions from './jobActions';

const actions = Object.assign({},
  newJobActions,
  jobsViewActions,
  jobActions,

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