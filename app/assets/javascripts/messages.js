$(function(){
  function buildHTML(message){
   var content = message.content ? `${message.content}` : "";
    var img = message.image ? `<img src="${message.image}">` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="message__text">
                    <p class="lower-message__content">
                    ${content}
                    </p>
                    ${img}
                  </p>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      $('#new_message')[0].reset();
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({
        scrollTop: $('.messages')[0].scrollHeight
      }, 300, "swing");
    })
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  })
  var reloadMessages = function() {
    last_message_id = $(".message:last").data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({
      scrollTop: $('.messages')[0].scrollHeight
      }, 300, "swing");
    })
  })
    .fail(function() {
      alert('エラーが発生したためメッセージは更新できませんでした。');;
    });
  };
  $(window).on("load", function(){
    if(document.URL.match("messages")){
      setInterval(reloadMessages, 5000);
    }
  });
});