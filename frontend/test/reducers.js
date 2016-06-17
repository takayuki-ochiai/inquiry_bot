import chai from 'chai';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import routerTransition from '../react/reducers/routerTransition';
import routing from '../react/reducers/router';

import { ROUTER_TRANSITION_ACTIONS } from '../react/actions/constants';
import { default as presets } from '../react/utils/transitionPresets';

const expect = chai.expect;

describe('reducers', () => {
  describe('routerTransition', () => {
    const initialAnimation = presets.noAnimation;
    it('initial', () => {
      expect(routerTransition(undefined, {})).equal(initialAnimation);
    });

    it('TRANSITION_FADE', () => {
      expect(
        routerTransition(initialAnimation, { type: ROUTER_TRANSITION_ACTIONS.TRANSITION_FADE })
      ).equal(presets.fade);
    });

    it('TRANSITION_POP', () => {
      expect(
        routerTransition(initialAnimation, { type: ROUTER_TRANSITION_ACTIONS.TRANSITION_POP })
      ).equal(presets.pop);
    });

    it('TRANSITION_SLIDE_LEFT', () => {
      expect(
        routerTransition(
          initialAnimation,
          { type: ROUTER_TRANSITION_ACTIONS.TRANSITION_SLIDE_LEFT }
        )
      ).equal(presets.slideLeft);
    });

    it('TRANSITION_SLIDE_RIGHT', () => {
      expect(
        routerTransition(
          initialAnimation,
          { type: ROUTER_TRANSITION_ACTIONS.TRANSITION_SLIDE_RIGHT }
        )
      ).equal(presets.slideRight);
    });

    it('TRANSITION_NO_ANIMATION', () => {
      expect(
        routerTransition(initialAnimation,
        { type: ROUTER_TRANSITION_ACTIONS.TRANSITION_NO_ANIMATION })
      ).equal(presets.noAnimation);
    });

    it('default', () => {
      expect(
        routerTransition(
          initialAnimation,
          { type: 'mock' })
      ).equal(initialAnimation);
      expect(
        routerTransition(
          presets.slideLeft,
          { type: 'mock' }
        )
      ).equal(presets.slideLeft);
    });
  });

  describe('routing', () => {
    const initialState = fromJS({
      locationBeforeTransitions: null,
    });

    it('initial', () => {
      expect(routing(undefined, {})).deep.equal(initialState);
    });

    it('LOCATION_CHANGE', () => {
      // 参考 https://github.com/reactjs/react-router-redux/blob/master/test/reducer.spec.js
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          path: '/about',
          action: 'PUSH',
        },
      };

      const expectState = initialState.merge({
        locationBeforeTransitions: action.payload,
      });

      expect(routing(initialState, action)).deep.equal(expectState);
    });

    it('default', () => {
      expect(routing(initialState, {})).deep.equal(initialState);
    });
  });
});
