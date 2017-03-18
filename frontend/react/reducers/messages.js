import { List as list } from 'immutable';
import Message from './entities/Message';
import { MESSAGE_ACTIONS, FETCHING_ACITONS } from '../actions/constants';

const initialStateList = list([]);

const messages = (state = initialStateList, action) => {
  switch (action.type) {
    case MESSAGE_ACTIONS.ADD_QUESTION:
      {
        const payload = Object.assign(action.payload, { isQuestion: true });
        const message = Message.fromJS(payload);
        return state.push(message);
      }
    case FETCHING_ACITONS.RECEIVE_ANSWER:
      {
        const payload = Object.assign(action.payload, { isQuestion: false });
        const message = Message.fromJS(payload);
        return state.push(message);
      }
    default:
      return state;
  }
};

export default messages;
