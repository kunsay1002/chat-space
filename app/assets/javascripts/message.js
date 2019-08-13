$(document).on('turbolinks:load', function() { 


    function buildMessage(message){
      var img =  (message.image.url !== null)? 
                 (`<img src = "${message.image.url}">`): ("")

      var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.created_at}
                  </div>
                  </div>
                  <div class="lower-message">
                  <div class="lower-message__content">
                    ${message.content}
                  </div>
                  <div>
                    ${img}
                  <div>     
                  </div>
                  </div>`
      return html;
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType : 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.messages').append(html)
      $("form")[0].reset();
      $('.form__submit').attr('disabled', false); 
    })
    .fail(function(){
      alert('エラー');
      $('.form__submit').attr('disabled', false); 
    })
  })


  var reloadMessages = function() {
    if (location.pathname.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message').last().data("message-id");
    var group_id = $(".main-header__left-box__current-group__name").data("group-id");
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
      insertHTML = buildMessage(message);
      $('.messages').append(insertHTML);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    });
    })
    .fail(function() {
      alert('自動更新できませんでした。')
    });
   }
  };
  setInterval(reloadMessages, 5000);
});

