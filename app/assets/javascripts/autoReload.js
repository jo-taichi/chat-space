$(function() {
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="MessageInfo">
            <div class="Name">
              ${message.user_name}
            </div>
            <div class="Date">
              ${message.created_at}
            </div>
          </div>
          <div class="MessageContent">
            <p class="MessageContent__detail">
              ${message.content}
            </p>
            <img class="MessageContent__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="MessageInfo">
          <div class="Name">
            ${message.user_name}
          </div>
          <div class="Date">
            ${message.created_at}
          </div>
        </div>
        <div class="MessageContent">
          <p class="MessageContent__detail">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.MessageBox:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Main__message').append(insertHTML);
        $('.Main__message').animate({ scrollTop: $('.Main__message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});