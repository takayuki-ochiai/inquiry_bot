import { List as list } from 'immutable';
import Message from './entities/Message';
import { MESSAGE_ACTIONS, FETCHING_ACITONS } from '../actions/constants';

const initialStateList = list([]);
const firstMessage = {
  message: '質問をどうぞ！',
  isQuestion: false,
};

const messageEnt = Message.fromJS(firstMessage);


const messages = (state = initialStateList.push(messageEnt), action) => {
  switch (action.type) {
    case MESSAGE_ACTIONS.ADD_QUESTION: {
      const payload = Object.assign(action.payload, { isQuestion: true });
      const message = Message.fromJS(payload);
      return state.push(message);
    }
    case FETCHING_ACITONS.RECEIVE_ANSWER: {
      const payload = Object.assign(action.payload, { isQuestion: false });
      const message = Message.fromJS(payload);
      return state.push(message);
    }
    default:
      return state;
  }
};

export default messages;
