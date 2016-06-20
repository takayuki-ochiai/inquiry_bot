import QuestionAnsweringChat from '../components/organisms/QuestionAnsweringChat.jsx';
import { connect } from 'react-redux';
import { inquiryBot, requireSuggestions, receiveAnswer } from '../actions/';

// propsでsuggestionsとsubmitValueを渡さないといけない
const mapStateToProps = state => (
  {
    suggestions: state.suggestions,
  }
);

const mapDispatchToProps = dispatch => (
  {
    submitValue: value => {
      dispatch(inquiryBot(value));
    },
    initialLoading: () => {
      dispatch(receiveAnswer('質問をどうぞ！'));
      dispatch(requireSuggestions());
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionAnsweringChat);
