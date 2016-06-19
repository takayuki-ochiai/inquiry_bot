import { combineReducers } from 'redux';
import routerReducer from './router';
import routerTransition from './routerTransition';
import messages from './messages';

const todoApp = combineReducers({
  routing: routerReducer,
  routerTransition,
  messages,
});

export default todoApp;
