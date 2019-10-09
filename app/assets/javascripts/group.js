$(function() {
  var search_list = $("#user-search-result");
  var add_list = $(".js-add-user");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix" id="${ user.id }">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
  search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_list.append(html);
  }

  function appendMember(user_id, user_name){
    var html_add = `<div class="chat-group-user clearfix js-chat-member" id="${ user_id }">
                      <input name="group[user_ids][]" type="hidden" value="${ user_id }">
                      <p class="chat-group-user__name">${ user_name }</p>
                      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                    </div>`
    add_list.append(html_add);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on("click", `.chat-group-user__btn--add`, function(){
    console.log(this);
    var user_id = $(this).data("user-id");
    var user_name = $(this).data("user-name");
    appendMember(user_id, user_name);
    $(this).parent().remove()
  });

  $(document).on("click", `.js-remove-btn`, function(){
    $(this).parent().remove()
  });

});