var flag_username = false;
var flag_pwd = false;
var flag_re_pwd = false;
var flag_email = false;
var flag_agree = false; //會員條款同意
var uid01;

$(function () {
  //監聽reg_btn
  $("#reg_btn").click(function () {
    $("#reg_username").val("");
    $("#reg_pwd").val("");
    $("#reg_re_pwd").val("");
    $("#reg_email").val("");
    $("#reg_username").removeClass("is-valid");
    $("#reg_username").removeClass("is-invalid");
    $("#reg_pwd").removeClass("is-valid");
    $("#reg_pwd").removeClass("is-invalid");
    $("#reg_re_pwd").removeClass("is-valid");
    $("#reg_re_pwd").removeClass("is-invalid");
    $("#reg_email").removeClass("is-valid");
    $("#reg_email").removeClass("is-invalid");
    $("#reg_agree_chk").prop("checked", false);
    $("#reg_agree_text").html("");
  });

  //監聽 #reg_username
  $("#reg_username").bind("input propertychange", function () {
    //輸入字數
    if ($(this).val().length > 2 && $(this).val().length < 11) {
      //符合規定
      var dataJSON = {};
      dataJSON["userName"] = $("#reg_username").val();
      flag_username = true;

      $.ajax({
        type: "POST",
        url: "https://soleystudio.000webhostapp.com/spa_cat-api/member-Check_Uni-api.php",
        data: JSON.stringify(dataJSON),
        dataType: "json",
        success: showdata_check_uni,
        error: function () {
          Swal.fire(
            "error-soleystudio.000webhostapp.com/spa_cat-api/member-Check_Uni-api.php"
          );
        },
      });
    } else {
      //不符合規定
      $(this).addClass("is-invalid");
      $(this).removeClass("is-valid");
      $("#reg_username_text02").html("字數不符合規定");
      flag_username = false;
    }
  });

  //監聽 #reg_pwd
  $("#reg_pwd").bind("input propertychange", function () {
    //輸入字數
    if ($(this).val().length > 1 && $(this).val().length < 11) {
      //符合規定
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      flag_pwd = true;
    } else {
      //不符合規定
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      flag_pwd = false;
    }
    if (
      $(this).val() == $("#reg_re_pwd").val() &&
      $("#reg_re_pwd").val() !== ""
    ) {
      //與確認密碼相同
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      $("#reg_re_pwd").removeClass("is-invalid");
      $("#reg_re_pwd").addClass("is-valid");
      flag_pwd = true;
    } else if (
      $(this).val() !== $("#reg_re_pwd").val() &&
      $("#reg_re_pwd").val() !== ""
    ) {
      //與確認密碼不同
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      $("#in_psd").text("與確認密碼不一致");
      flag_pwd = false;
    }
  });

  //監聽 #reg_re_pwd
  $("#reg_re_pwd").bind("input propertychange", function () {
    //輸入字數
    if ($(this).val() == $("#reg_pwd").val()) {
      //與密碼相同
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      $("#reg_pwd").removeClass("is-invalid");
      $("#reg_pwd").addClass("is-valid");
      flag_re_pwd = true;
    } else {
      //與密碼不同
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      flag_re_pwd = false;
    }
  });

  //監聽 #reg_email
  $("#reg_email").bind("input propertychange", function () {
    //輸入字數
    if ($(this).val().length > 9 && $(this).val().length < 20) {
      //符合規定
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      flag_email = true;
    } else {
      //不符合規定
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      flag_email = false;
    }
  });

  //監聽 #reg_agree_chk
  $("#reg_agree_chk").change(function () {
    if ($(this).is(":checked")) {
      flag_agree = true;
    } else {
      flag_agree = false;
    }
  });

  //監聽確認鈕
  $("#reg_ok_btn").click(function () {
    if (flag_username && flag_pwd && flag_re_pwd && flag_email && flag_agree) {
      var dataJSON = {};
      dataJSON["userName"] = $("#reg_username").val();
      dataJSON["password"] = $("#reg_pwd").val();
      dataJSON["email"] = $("#reg_email").val();
      dataJSON["manager"] = "N";
      dataJSON["uid01"] = uid;

      $.ajax({
        type: "POST",
        url: "https://soleystudio.000webhostapp.com/spa_cat-api/member-Create-api.php",
        data: JSON.stringify(dataJSON),
        dataType: "json",
        success: showdata,
        error: function () {
          Swal.fire(
            "error-soleystudio.000webhostapp.com/spa_cat-api/member-Create-api.php"
          );
        },
      });
    } else {
      Swal.fire("欄位有誤，請修正!");
    }

    //未勾選會員守則同意時出現字樣
    if (flag_agree == false) {
      $("#reg_agree_text").html("此處請勾選同意");
    } else {
      $("#reg_agree_text").html("");
    }

    //註冊密碼輸入格式錯誤時
    if (flag_pwd == false || flag_re_pwd == false) {
      $("#reg_pwd").val("");
      $("#reg_re_pwd").val("");
      $("#reg_re_pwd").removeClass("is-valid");
      $("#reg_re_pwd").removeClass("is-invalid");
      $("#reg_pwd").removeClass("is-valid");
      $("#reg_pwd").removeClass("is-invalid");
    }
  });
});

function showdata(data) {
  if (data.state) {
    //顯示成功訊息
    Swal.fire({
      title: data.message,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "確定",
    }).then((result) => {
      if (result.isConfirmed) {
        setCookie("uid", data.data[0].uid01, 7);
        location.href = "https://soleylin.github.io/spa_cat";
      }
    });
  } else {
    //顯示錯誤訊息
    Swal.fire(data.message);
  }
}

function showdata_check_uni(data) {
  if (data.state) {
    //顯示帳號不存在，可以使用
    $("#reg_username_text01").html(data.message);
    $("#reg_username").addClass("is-valid");
    $("#reg_username").removeClass("is-invalid");
    flag_username = true;
  } else {
    //顯示帳號已存在，不可使用
    $("#reg_username_text02").html(
      "<font color='red'>" + data.message + "</font>"
    );
    $("#reg_username").addClass("is-invalid");
    $("#reg_username").removeClass("is-valid");
    flag_username = false;
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}