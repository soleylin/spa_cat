import { u_id } from "./login.js";
var flag_email = true;

$(function () {
  //監聽 #member_email
  $("#member_email").bind("input propertychange", function () {
    console.log($(this).val().length);
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

  //監聽 #member_update_btn
  $("#member_update_btn").click(function () {
    console.log("member_update_btn_ok");
    if (flag_email) {
      var dataJSON = {};
      dataJSON["id"] = u_id;
      dataJSON["email"] = $("#member_email").val();
      console.log(JSON.stringify(dataJSON));

      $.ajax({
        type: "POST",
        url: "https://soleystudio.000webhostapp.com/spa_cat-api/member-Update-api.php",
        data: JSON.stringify(dataJSON),
        dataType: "json",
        success: showdata_member_update,
        error: function () {
          Swal.fire(
            "error-soleystudio.000webhostapp.com/spa_cat-api/member-Update-api.php"
          );
        },
      });
    } else {
      Swal.fire("欄位有誤，請修正!");
    }
  });
});

function showdata_member_update(data) {
  if (data.state) {
    Swal.fire({
      title: data.message,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "確定",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("memberUpdate_ok");
        location.href = "soleylin.github.io/spa_cat/spa_cat.html";
      }
    });
  } else {
    alert(data.message);
  }
}
