import { u_id } from "./login.js";

$(function () {
  $("#member_btn").click(function () {
    var dataJSON = {};
    dataJSON["id"] = u_id;

    $.ajax({
      type: "POST",
      url: "https://soleystudio.000webhostapp.com/spa_cat-api/member-Read-api.php",
      data: JSON.stringify(dataJSON),
      dataType: "json",
      //關閉非同步 (先串接資料才監聽 / 同步->串接資料與監聽同時進行, 只會監聽到第一筆讀取的資料)
      async: false,
      success: showdata,
      error: function () {
        Swal.fire(
          "系統串接錯誤！-soleystudio.000webhostapp.com/spa_cat-api/member-Read-api.php"
        );
      },
    });

    //監聽 #update_btn
    $("#mybody #update_btn").click(function () {
      $("#member_userName").val($(this).data("username"));
      $("#member_email").val($(this).data("email"));
      $("#member_email").removeClass("is-invalid");
      $("#member_email").removeClass("is-valid");
    });

    //監聽 #updatePwd_btn
    $("#mybody #updatePwd_btn").click(function () {
      $("#memberPwd_userName").val($(this).data("username"));
      $("#memberPwd_oldpwd").val("");
      $("#memberPwd_oldpwd").removeClass("is-invalid");
      $("#memberPwd_oldpwd").removeClass("is-valid");
      $("#memberPwd_pwd").val("");
      $("#memberPwd_pwd").removeClass("is-invalid");
      $("#memberPwd_pwd").removeClass("is-valid");
      $("#memberPwd_repwd").val("");
      $("#memberPwd_repwd_text").html("");
      $("#memberPwd_repwd").removeClass("is-invalid");
      $("#memberPwd_repwd").removeClass("is-valid");
    });

    $("#member_ok_btn").click(function () {
      $("#memberModal").modal("hide");
    });

    $("#memberPwd_ok_btn").click(function () {
      $("#memberPwdModal").modal("hide");
    });
  });

  function showdata(data) {
    //刪除樣板
    $("#mybody").empty();
    //forEach每次跑一列
    data.data.forEach(function (item) {
      var strHTML =
        '<tr><td data-th="帳號" class="tdc">' +
        item.userName +
        '</td><td data-th="Email" class="tdc">' +
        item.email +
        '</td><td data-th="更新" class="tdc"><button class="btn btn-dark me-1" data-bs-toggle="modal" data-bs-target="#member_updateModal" data-id="' +
        item.id +
        '" data-username="' +
        item.userName +
        '" data-email="' +
        item.email +
        '" id="update_btn"> 更新基本資料 </button><button class="btn btn-dark me-1" data-bs-toggle="modal" data-bs-target="#memberPwd_updateModal" data-id="' +
        item.id +
        '" data-username="' +
        item.userName +
        '" data-password="' +
        item.password +
        '" id="updatePwd_btn"> 變更密碼 </button>';

      $("#mybody").append(strHTML);
    });
  }
});
