import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as formReducer } from 'redux-form';
// Import reducers below

export default combineReducers({
  // Add reducers below
  reduxAsyncConnect,
  form: formReducer,
  routing: routerReducer
});
