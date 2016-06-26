// このファイルはnode.jsのライブラリを使用する前提の構成となっています。
// ブラウザに直接読み込むのではなくbrowserifyやwebpackを使って関連ライブラリを連結させた結果を読み込む必要があります。
// 上の説明が理解できない人は、このファイルは触らないでください。

// ブラウザ側の入力文字列解析機能のセットアップ
var kuromoji = require('kuromoji');
var builder = kuromoji.builder({
  dicPath: '../node_modules/kuromoji/dist/dict'
});

var tokenizer = null;
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

// チャット欄にシステム側からのメッセージを投稿します。
function addAnswererMessage(text) {
  var message = "<div class='message__container animated messages_add'>";
  var span;
  message += '<div class="avatar__container_answerer">';
  message += '<img class="avatar__image" src="/images/elbot.gif">';
  message += '</div>';
  message += '<div class="messageContent__base">';
  span = '<span>' + text + '</span>';
  message += span;
  message += '</div>';

  $(".messages__container").append(message);
}

// TODO escape対策をどうするか考慮する
// チャット欄に質問者からのメッセージを投稿します。
function addQuestionerMessage(text) {
  var message = "<div class='message__container animated messages_add'>";
  var span;
  message += '<div class="avatar__container_questioner">';
  message += '<img class="avatar__image" src="/images/user.png">';
  message += '</div>';
  message += '<div class="messageContent__base messageContent_right">';
  span = '<span>' + text + '</span>';
  message += span;
  message += '</div>';

  $(".messages__container").append(message);
}

// サーバーに質問情報をPOSTして
function postQuestion(question) {
  addQuestionerMessage(question);
  $.post(
    'http://localhost:3001/api/v1/predictor/questions',
    { question: question },
    function(res) {
      addAnswererMessage(res.answer);
    }
  )
}


$(function(){
  var ajaxSuggestions;
  $.get(
    'http://localhost:3001/api/v1/predictor/suggestions',
    function(res) {
      ajaxSuggestions = res.suggestions;
    }
  );

  $('#autocomplete').autocomplete({
    lookup: function (query, done) {
      var readings = tokenizeToBasicFormReading(query);
      console.log(readings);
      var results ={};
      results.suggestions = ajaxSuggestions.filter(function(suggestion) {
        return suggestion.tags.some(function(tag) {
          return readings.indexOf(tag) !== -1;
        })
      }).map(function(result) {
        return {
          value: result.content,
          data: ""
        }
      })
      done(results);
    }
  });

  $('.questionForm__submit').click(function() {
    postQuestion($('#autocomplete').val());
    $('#autocomplete').val("");
  })

  setTimeout(function(){
    addAnswererMessage("質問をどうぞ！");
  }, 1000)
});
