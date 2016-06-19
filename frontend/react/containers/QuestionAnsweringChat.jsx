import QuestionAnsweringChat from '../components/organisms/QuestionAnsweringChat.jsx';
import { connect } from 'react-redux';
import { inquiryBot } from '../actions/';


const suggestions = [
  {
    name: 'C',
    year: 1972,
  },
  {
    name: 'Elm',
    year: 2012,
  },
];

// propsでsuggestionsとsubmitValueを渡さないといけない
const mapStateToProps = state => (
  {
    suggestions,
  }
);

const mapDispatchToProps = dispatch => (
  {
    submitValue: value => {
      dispatch(inquiryBot(value));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionAnsweringChat);
