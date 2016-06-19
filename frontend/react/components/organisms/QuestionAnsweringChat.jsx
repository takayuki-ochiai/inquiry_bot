import React, { PropTypes } from 'react';
import Conversation from '../../containers/Conversation.jsx';
import Autosuggest from 'react-autosuggest';
import FlatButton from 'material-ui/FlatButton';

class QuestionAnsweringChat extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      displaySuggestions: this.getSuggestions(''),
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.onTouchTapSubmitButton = this.onTouchTapSubmitButton.bind(this);
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue,
    });
  }

  onTouchTapSubmitButton() {
    this.props.submitValue(this.state.value);
    this.setState({
      value: '',
    });
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      displaySuggestions: this.getSuggestions(value),
    });
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.suggestions.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }

  render() {
    const { value, displaySuggestions } = this.state;
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange,
    };
    return (
      <div>
        <Conversation />
        <Autosuggest
          suggestions={displaySuggestions}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        <FlatButton label="質問する" onTouchTap={this.onTouchTapSubmitButton} />
      </div>
    );
  }
}

QuestionAnsweringChat.propTypes = {
  submitValue: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
    })
  ),
};


export default QuestionAnsweringChat;
