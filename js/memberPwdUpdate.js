import { u_id } from "./login.js";
var flag_oldpwd = false;
var flag_pwd = false;
var flag_repwd = false;

$(function () {
  //監聽 #memberPwd_pwd
  $("#memberPwd_pwd").bind("input propertychange", function () {
    console.log($(this).val().length);
    //輸入字數
    if ($(this).val().length > 1 && $(this).val().length < 11) {
      //符合規定
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      flag_pwd = true;
      //輸入字數
      if (
        $("#memberPwd_repwd").val().length > 0 &&
        $(this).val() == $("#memberPwd_repwd").val()
      ) {
        //與密碼相同
        $("#memberPwd_repwd").removeClass("is-invalid");
        $("#memberPwd_repwd").addClass("is-valid");
        flag_repwd = true;
      } else if (
        $("#memberPwd_repwd").val().length > 0 &&
        $(this).val() !== $("#memberPwd_repwd").val()
      ) {
        //與密碼不同
        $("#memberPwd_repwd").removeClass("is-valid");
        $("#memberPwd_repwd").addClass("is-invalid");
        flag_repwd = false;
      }
    } else {
      //不符合規定
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      flag_pwd = false;
    }
  });

  //監聽 #memberPwd_repwd
  $("#memberPwd_repwd").bind("input propertychange", function () {
    //輸入字數
    if ($(this).val() == $("#memberPwd_pwd").val()) {
      //與密碼相同
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      flag_repwd = true;
    } else {
      //與密碼不同
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      flag_repwd = false;
    }
    if ($(this).val().length > 0) {
      $("#memberPwd_repwd_text").html("");
    } else {
      $("#memberPwd_repwd_text").html("請確認密碼");
    }
  });

  //監聽 #memberPwd_update_btn
  $("#memberPwd_update_btn").click(function () {
    console.log("memberPwd_update_btn_ok");
    if ($("#memberPwd_oldpwd").val().length > 0) {
      flag_oldpwd = true;
    } else {
      flag_oldpwd = false;
    }

    if (flag_oldpwd && flag_pwd && flag_repwd) {
      var dataJSON = {};
      dataJSON["id"] = u_id;
      dataJSON["password"] = $("#memberPwd_pwd").val();
      dataJSON["oldpassword"] = $("#memberPwd_oldpwd").val();
      console.log(JSON.stringify(dataJSON));

      $.ajax({
        type: "POST",
        url: "https://soleystudio.000webhostapp.com/spa_cat-api/memberPwd-Update-api.php",
        data: JSON.stringify(dataJSON),
        dataType: "json",
        success: showdata_memberPwd_update,
        error: function () {
          Swal.fire(
            "error-soleystudio.000webhostapp.com/spa_cat-api/memberPwd-Update-api.php"
          );
        },
      });
    } else {
      Swal.fire("欄位有誤，請修正!");
      if ($("#memberPwd_repwd").val().length > 0) {
        $("#memberPwd_repwd_text").html("");
      } else {
        $("#memberPwd_repwd_text").html("請確認密碼");
      }
    }
  });
});

function showdata_memberPwd_update(data) {
  if (data.state) {
    Swal.fire({
      title: data.message,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "確定",
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = "https://soleylin.github.io/spa_cat";
      }
    });
  } else {
    Swal.fire({
      title: data.message,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "確定",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("密碼錯誤");
      }
    });
  }
}
