import { combineReducers } from 'redux';
import routerReducer from './router';
import routerTransition from './routerTransition';
import messages from './messages';
import suggestions from './suggestions';
import isFetching from './isFetching';

const todoApp = combineReducers({
  routing: routerReducer,
  routerTransition,
  messages,
  isFetching,
  suggestions,
});

export default todoApp;
