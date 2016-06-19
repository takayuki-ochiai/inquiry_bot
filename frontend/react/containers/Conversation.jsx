import Conversation from '../components/chat/Conversation';
import { connect } from 'react-redux';

const mapStateToProps = state => (
  {
    messages: state.messages.toArray(),
    height: '300px',
  }
);

export default connect(
  mapStateToProps
)(Conversation);
