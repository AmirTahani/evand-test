import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as formReducer } from 'redux-form';
// Import reducers below
import events from './Modules/events';
import provinces from './Modules/provinces';
import categories from './Modules/categories';

export default combineReducers({
  // Add reducers below
  reduxAsyncConnect,
  events,
  provinces,
  categories,
  form: formReducer,
  routing: routerReducer
});
