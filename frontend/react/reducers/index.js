import { combineReducers } from 'redux';
import routerReducer from './router';
import routerTransition from './routerTransition';

const todoApp = combineReducers({
  routing: routerReducer,
  routerTransition,
});

export default todoApp;
