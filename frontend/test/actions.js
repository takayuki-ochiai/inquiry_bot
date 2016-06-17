import chai from 'chai';
import * as Immutable from 'immutable';
import { push } from 'react-router-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setRouterTransition, transition } from '../react/actions';
import { ROUTER_TRANSITION_ACTIONS } from '../react/actions/constants';
import { default as presets } from '../react/utils/transitionPresets';

const expect = chai.expect;

describe('actions', () => {
  it('setRouterTransition', () => {
    const resultAction = setRouterTransition(ROUTER_TRANSITION_ACTIONS.TRANSITION_SLIDE_LEFT);
    expect(resultAction.type).equal(ROUTER_TRANSITION_ACTIONS.TRANSITION_SLIDE_LEFT);
  });


  it('transition', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    const routing = Immutable.fromJS({
      locationBeforeTransitions: null,
    });

    const routerTransition = presets.noAnimation;

    const initialState = {
      routing,
      routerTransition,
    };

    const expectedActions = [
      { type: ROUTER_TRANSITION_ACTIONS.TRANSITION_SLIDE_LEFT },
      push('/'),
    ];

    const store = mockStore(initialState, expectedActions);
    store.dispatch(transition(ROUTER_TRANSITION_ACTIONS.TRANSITION_SLIDE_LEFT, '/'));

    expect(store.getActions()).deep.equal(expectedActions);
  });
});
