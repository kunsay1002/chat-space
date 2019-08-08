$(function(){


    function buildMessage(message){
      var img = ""
        if (message.image.url !== null) {
          img = `<img src = "${message.image.url}">`
      }
      var html = `<div class="message">
                  <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.created_at}
                  </div>
                  </div>
                  <div class="lower-message">
                  <p class="lower-message__content">
                    ${message.content}
                    ${img}
                  </p>
      
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
      console.log(message);
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
});
