import newJobActions from './newJobActions';
import jobsViewActions from './jobsViewActions';
import jobActions from './jobActions';

const actions = Object.assign({},
  newJobActions,
  jobsViewActions,
  jobActions
)

export default actions;