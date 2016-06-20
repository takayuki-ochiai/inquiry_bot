import Conversation from '../components/chat/Conversation';
import { connect } from 'react-redux';

const mapStateToProps = state => (
  {
    messages: state.messages.toArray(),
    height: '600px',
  }
);

export default connect(
  mapStateToProps
)(Conversation);
