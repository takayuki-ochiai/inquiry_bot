import { ROUTER_TRANSITION_ACTIONS, MESSAGE_ACTIONS, FETCHING_ACITONS } from './constants';
import { push } from 'react-router-redux';
import request from 'superagent';

function postQuestion(question) {
  return new Promise((resolve, reject) => {
    request
      .post('http://localhost:3001/api/v1/predictor/questions')
      // CORS対策
      .withCredentials()
      .send({ question })
      .end((err, reply) => {
        if (reply.status === 201) {
          resolve(reply);
        } else {
          reject(err);
        }
      });
  });
}

export const addQuestion = value => (
  {
    type: MESSAGE_ACTIONS.ADD_QUESTION,
    payload: {
      message: value,
    },
  }
);

export const addAnswer = value => (
  {
    type: MESSAGE_ACTIONS.ADD_ANSWER,
    payload: {
      message: value,
    },
  }
);

export const fetchAnswers = () => (
  {
    type: FETCHING_ACITONS.FETCH_ANSWERS,
  }
);


export const receiveAnswer = answer => (
  {
    type: FETCHING_ACITONS.RECEIVE_ANSWER,
    payload: {
      message: answer,
    },
  }
);

export const getAnswers = value => {
  const dispatcher = dispatch => {
    dispatch(fetchAnswers());
    postQuestion(value).then(
      res => {
        dispatch(receiveAnswer(res.body.answer));
      }
    );
  };
  return dispatcher;
};

export const inquiryBot = value => {
  const dispatcher = dispatch => {
    dispatch(addQuestion(value));
    dispatch(getAnswers(value));
  };
  return dispatcher;
};

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
