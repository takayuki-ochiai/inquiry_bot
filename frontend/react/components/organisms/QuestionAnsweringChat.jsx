import React, { PropTypes } from 'react';
import Conversation from '../../containers/Conversation.jsx';
import Autosuggest from 'react-autosuggest';
import FlatButton from 'material-ui/FlatButton';
import { amber400 } from 'material-ui/styles/colors';
import style from '../../../stylesheet/questionAnsweringChat.css';
import autoSuggestStyle from '../../../stylesheet/autosuggest.css';

import kuromoji from 'kuromoji';
const builder = kuromoji.builder({
  // 辞書があるパスを指定。
  dicPath: '../../../node_modules/kuromoji/dist/dict',
});

let tokenizer = null;
builder.build((err, _tokenizer) => {
  // 辞書がない場合はエラー
  if (err) { throw err; }

  // tokenizer.tokenize に文字列を渡すと、その文を形態素解析してくれます。
  tokenizer = _tokenizer;
});

// 入力された文章を形態素解析して読みのカタカナのリストとして返します
function tokenizeToBasicFormReading(text) {
  const readings = tokenizer.tokenize(text)
    // .filter(token => ['名詞', '動詞', '形容詞', '形容動詞'].indexOf(token.pos) !== -1)
    .filter(token => ['名詞', '動詞'].indexOf(token.pos) !== -1)
    .map(token => token.basic_form)
    .map(basicForm => tokenizer.tokenize(basicForm)[0].reading);

  return readings;
}

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

  componentWillMount() {
    // レコメンドに使用する代表的な質問をサーバー側に取りに行く
    this.props.initialLoading();
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
    // TODO 入力された内容が文章だと、あんまり本筋とは関係ない質問をレコメンドしやがるのでちょっと修正が必要
    // 助詞とか主語を合わせて何語以上だったらレコメンドを切るとか。
    // レコメンドしたい質問が5個以上になっちゃったらアウトとか
    const readings = tokenizeToBasicFormReading(value);
    this.setState({
      displaySuggestions: this.getSuggestions(readings),
    });
  }

  getSuggestions(readings) {
    const suggestions = readings.length === 0 ? [] : this.props.suggestions.filter(suggestion =>
      suggestion.tags.some(tag => readings.indexOf(tag) !== -1)
    );

    // キーワードが3文字以上でサジェスチョンが5以上表示される場合はレコメンドを表示しない
    if (readings.length > 2 && suggestions.length > 4) {
      return [];
    }

    return suggestions;
  }

  getSuggestionValue(suggestion) {
    return suggestion.content;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.content}</span>
    );
  }

  render() {
    const { value, displaySuggestions } = this.state;
    const inputProps = {
      placeholder: '自由に文章で質問を入れてね！',
      value,
      onChange: this.onChange,
    };
    return (
      <div>
        <Conversation />
        <div className={style.inputForm}>
          <div className={style.autoSuggest}>
            <Autosuggest
              suggestions={displaySuggestions}
              onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
              theme={autoSuggestStyle}
            />
          </div>
          <div className={style.submitButton}>
            <FlatButton
              label="質問する"
              backgroundColor={amber400}
              primary
              onTouchTap={this.onTouchTapSubmitButton}
            />
          </div>
        </div>
      </div>
    );
  }
}

QuestionAnsweringChat.propTypes = {
  submitValue: PropTypes.func.isRequired,
  initialLoading: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
    })
  ),
};


export default QuestionAnsweringChat;
