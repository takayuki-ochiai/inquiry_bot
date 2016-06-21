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
  setTimeout(function(){
    addAnswererMessage("質問をどうぞ！");
  }, 1000)
  setTimeout(function(){
    postQuestion("ログインできなくなってしまいました");
  }, 3000)
});
