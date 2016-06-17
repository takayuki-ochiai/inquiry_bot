import { default as presets } from '../utils/transitionPresets';
import { ROUTER_TRANSITION_ACTIONS } from '../actions/constants';

const initialAnimation = presets.noAnimation;

const routerTransition = (state = initialAnimation, action) => {
  switch (action.type) {
    case ROUTER_TRANSITION_ACTIONS.TRANSITION_FADE:
      return presets.fade;
    case ROUTER_TRANSITION_ACTIONS.TRANSITION_POP:
      return presets.pop;
    case ROUTER_TRANSITION_ACTIONS.TRANSITION_SLIDE_LEFT:
      return presets.slideLeft;
    case ROUTER_TRANSITION_ACTIONS.TRANSITION_SLIDE_RIGHT:
      return presets.slideRight;
    case ROUTER_TRANSITION_ACTIONS.TRANSITION_NO_ANIMATION:
      return presets.noAnimation;
    default:
      return state;
  }
};

export default routerTransition;
