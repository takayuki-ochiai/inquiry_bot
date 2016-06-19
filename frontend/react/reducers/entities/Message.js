import { Record as record } from 'immutable';
import { lightGreen300, grey100 } from 'material-ui/styles/colors';


const MessageBase = record({
  message: '',
  textColor: '',
  backColor: '',
  avatar: '',
  duration: 100000000,
  inbound: false,
});

export default class Message extends MessageBase {
  static fromJS(payload = {}) {
    return (new this).merge({
      message: payload.message,
      backColor: payload.isQuestion ? lightGreen300 : grey100,
      textColor: payload.isQuestion ? grey100 : 'black',
      avatar: payload.isQuestion ? '' : '/images/elbot.gif',
      inbound: !payload.isQuestion,
    });
  }
}
