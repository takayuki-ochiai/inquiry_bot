import { ROUTER_TRANSITION_ACTIONS } from './constants';
import { push } from 'react-router-redux';


export const setRouterTransition = type => ({ type });

// 画面遷移用のアクションを発行します
// どんなアニメーションで遷移するかと、どのURLに遷移するかを指示する２つのアクションを発行する関数です。
export const transition = (transitionType, path) => {
  const func = dispatch => {
    // どのアニメーションで遷移するかを決定するアクションを発行
    dispatch(setRouterTransition(transitionType));
    // どの画面に遷移するかを指示するアクションを発行
    dispatch(push(path));
  };
  return func;
};

// popアニメーションで画面遷移するアクションを発行します
export const transitionPop = path => {
  transition(ROUTER_TRANSITION_ACTIONS.TRANSITION_POP, path);
};

// fadeアニメーションで画面遷移するアクションを発行します
export const transitionFade = path => {
  transition(ROUTER_TRANSITION_ACTIONS.TRANSITION_FADE, path);
};

// slideLeftアニメーションで画面遷移するアクションを発行します
export const transitionSlideLeft = path => {
  transition(ROUTER_TRANSITION_ACTIONS.TRANSITION_SLIDE_LEFT, path);
};

// slideRightアニメーションで画面遷移するアクションを発行します
export const transitionSlideRight = path => {
  transition(ROUTER_TRANSITION_ACTIONS.TRANSITION_SLIDE_RIGHT, path);
};

// アニメーションなしで画面遷移するアクションを発行します
export const transitionNoAnimation = path => {
  transition(ROUTER_TRANSITION_ACTIONS.TRANSITION_NO_ANIMATION, path);
};
