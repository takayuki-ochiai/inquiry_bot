import { FETCHING_ACITONS } from '../actions/constants';


const suggestions = (state = [], action) => {
  switch (action.type) {
    case FETCHING_ACITONS.RECEIVE_SUGGESTIONS: {
      return action.payload.suggestions;
    }
    default:
      return state;
  }
};

export default suggestions;
