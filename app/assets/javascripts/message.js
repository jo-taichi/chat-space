$(function() {
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox">
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
      `<div class="MessageBox">
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

  $(".Form").on("submit", function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data);
      $(".Main__message").append(html);
      $(".Main__message").animate({ scrollTop: $(".Main__message")[0].scrollHeight});
      $(".Form")[0].reset();
      $(".Send").prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});