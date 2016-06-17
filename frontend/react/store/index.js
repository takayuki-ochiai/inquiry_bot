import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';


import reducer from '../reducers';

const loggerMiddleware = createLogger();

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
    routerMiddleware(hashHistory)
  )
);
