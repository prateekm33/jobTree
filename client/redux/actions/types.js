const types = {
  createNewJob: 'CREATE_NEW_JOB',
  removeJob: 'REMOVE_JOB',
  toggleCompanyForm: 'TOGGLE_COMPANY_FORM',
  resetCompanyForm: 'RESET_COMPANY_FORM',
  toggleActiveCompany: 'TOGGLE_ACTIVE_COMPANY',
  sortCompaniesBy: 'SORT_COMPANIES_BY',

  addNewJobsToState: 'ADD_NEW_JOBS_TO_STATE',
  postingNewJobs: 'POSTING_NEW_JOBS',
  postedJobs: 'POSTED_JOBS',
  asyncError: 'ASYNC_ERROR',
  resetJobsPost: 'RESET_JOBS_POST',

  authorizingUser: 'AUTHORIZING_USER',
  loggingOutUser: 'LOGGING_OUT_USER',
  logInUser: 'LOGIN_USER',
  logOutUser: 'LOGOUT_USER',
  userLoggedOut: 'USER_LOGGED_OUT',
  invalidCreds: 'INVALID_CREDS',
  logOutError: 'LOGOUT_ERROR',

  requestedPath: 'REQUESTED_PATH',

  fetchingJobs: 'FETCHING_JOBS',
  errorFetchingJobs: 'ERROR_FETCHING_JOBS',
  fetchedJobs: 'FETCHED_JOBS'  

}


export default types; 