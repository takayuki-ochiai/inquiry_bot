// Immutable.jsとreact-router-reduxの併用時は必要

import * as Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null,
});

export default (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload,
    });
  }

  return state;
};
