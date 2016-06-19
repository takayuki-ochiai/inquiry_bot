import { List as list } from 'immutable';
import Message from './entities/Message';
import { MESSAGE_ACTIONS } from '../actions/constants';

const initialStateList = list([]);
const firstMessage = {
  message: '質問をどうぞ！',
  isQuestion: false,
};

const messageEnt = Message.fromJS(firstMessage);


const messages = (state = initialStateList.push(messageEnt), action) => {
  switch (action.type) {
    case MESSAGE_ACTIONS.ADD_QUESTION: {
      const message = Message.fromJS(action.payload);
      return state.push(message);
    }
    default:
      return state;
  }
};

export default messages;
