import { FETCHING_ACITONS } from '../actions/constants';
import { Map as map } from 'immutable';

const initialStateMap = map({
  isAnswerFetching: false,
  isSuggestionFetching: false,
});

const isFetching = (state = initialStateMap, action) => {
  switch (action.type) {
    case FETCHING_ACITONS.FETCH_ANSWER: {
      return state.set('isAnswerFetching', true);
    }
    case FETCHING_ACITONS.RECEIVE_ANSWER: {
      return state.set('isAnswerFetching', false);
    }
    case FETCHING_ACITONS.FETCH_SUGGESTIONS: {
      return state.set('isSuggestionFetching', true);
    }
    case FETCHING_ACITONS.RECEIVE_SUGGESTIONS: {
      return state.set('isSuggestionFetching', false);
    }
    default:
      return state;
  }
};

export default isFetching;
