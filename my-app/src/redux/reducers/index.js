import { combineReducers } from 'redux';
import resetNumber from './resetNumber';
import arrayNumber from './arrayNumber';
// import visibilityFilter from './visibilityFilter';

export default combineReducers({
  resetNumber,
  arrayNumber
});
