export { u_id };
export { setCookie };
var u_id = 0;

$(function () {
  //判斷是否有uidCookie
  if (getCookie("uid") != "") {
    //uid存在，傳遞至後端api判斷是否正確
    var dataJSON = {};
    dataJSON["uid01"] = getCookie("uid");
    $.ajax({
      type: "POST",
      url: "https://soleystudio.000webhostapp.com/spa_cat-api/member-Check_uid-api.php",
      data: JSON.stringify(dataJSON),
      dataType: "json",
      success: showdata_loginUid,
      error: function () {
        alert("error-https://soleystudio.000webhostapp.com/spa_cat-api/member-Check_uid-api.php");
      },
    });
  }

  $("#login_ok_btn").click(function () {
    //  console.log($("#login_username").val()+$("#login_pwd").val());
    var dataJSON = {};
    dataJSON["userName"] = $("#login_username").val();
    dataJSON["password"] = $("#login_pwd").val();
    console.log(JSON.stringify(dataJSON));
    $.ajax({
      type: "POST",
      url: "https://soleystudio.000webhostapp.com/spa_cat-api/member-Login-api.php",
      data: JSON.stringify(dataJSON),
      dataType: "json",
      success: showdata_login,
      error: function () {
        alert("error-soleystudio.000webhostapp.com/spa_cat-api/member-Login-api.php");
      },
    });
  });
});

function showdata_login(data) {
  console.log(data);
  if (data.state) {
    if (data.data[0].manager == "Y") {
      alert(data.message);
      setCookie("uid", data.data[0].uid01, 7);
      $("#loginModal").modal("hide");
      $("#user_message").text(data.data[0].userName);
      $("#login_btn").addClass("d-none");
      $("#reg_btn").addClass("d-none");
      $("#logout_btn").removeClass("d-none");
      $("#logout_btn").addClass("d-block");
      $("#member_btn").removeClass("d-none");
      $("#member_btn").addClass("d-block");
      $("#memberlist_btn").removeClass("d-none");
      $("#memberlist_btn").addClass("d-block");
      // $("#product_create").removeClass("disabled");
      // $("#product_list").removeClass("disabled");
      $("#nav_hint").removeClass("d-block");
      $("#nav_hint").addClass("d-none");
      $("#nav_about").removeClass("d-none");
      $("#nav_about").addClass("d-block");
      $("#nav_Adoption").removeClass("d-none");
      $("#nav_Adoption").addClass("d-block");
      $("#nav_future").removeClass("d-none");
      $("#nav_future").addClass("d-block");
      $("#nav_info").removeClass("d-none");
      $("#nav_info").addClass("d-block");
      $("#nav_contact").removeClass("d-none");
      $("#nav_contact").addClass("d-block");
      $("#nav_news").removeClass("d-none");
      $("#nav_news").addClass("d-block");
      $("#s04").removeClass("d-none");
      $("#s04").addClass("d-block");
      $("#s05").removeClass("d-none");
      $("#s05").addClass("d-block");
      $("#s06").removeClass("d-none");
      $("#s06").addClass("d-block");
      $("#s07").removeClass("d-none");
      $("#s07").addClass("d-block");
      $("#s08").removeClass("d-none");
      $("#s08").addClass("d-block");
      $("#s09").removeClass("d-none");
      $("#s09").addClass("d-block");
      $("#s10").removeClass("d-none");
      $("#s10").addClass("d-block");
      $("#s11").removeClass("d-none");
      $("#s11").addClass("d-block");
      $("#s12").removeClass("d-none");
      $("#s12").addClass("d-block");
      $("#s13").removeClass("d-none");
      $("#s13").addClass("d-block");
      $("#s14").removeClass("d-none");
      $("#s14").addClass("d-block");
      $("#s15").removeClass("d-none");
      $("#s15").addClass("d-block");
      u_id = data.data[0].id;
    } else if (data.data[0].manager == "N") {
      alert(data.message);
      var uid01 = data.data[0].uid01;
      setCookie("uid", uid01, 7);
      $("#loginModal").modal("hide");
      $("#user_message").text(data.data[0].userName);
      $("#login_btn").addClass("d-none");
      $("#reg_btn").addClass("d-none");
      $("#logout_btn").removeClass("d-none");
      $("#logout_btn").addClass("d-block");
      $("#member_btn").removeClass("d-none");
      $("#member_btn").addClass("d-block");
      // $("#product_create").removeClass("disabled");
      // $("#product_list").removeClass("disabled");
      $("#nav_hint").removeClass("d-block");
      $("#nav_hint").addClass("d-none");
      $("#nav_about").removeClass("d-none");
      $("#nav_about").addClass("d-block");
      $("#nav_Adoption").removeClass("d-none");
      $("#nav_Adoption").addClass("d-block");
      $("#nav_future").removeClass("d-none");
      $("#nav_future").addClass("d-block");
      $("#nav_info").removeClass("d-none");
      $("#nav_info").addClass("d-block");
      $("#nav_contact").removeClass("d-none");
      $("#nav_contact").addClass("d-block");
      $("#nav_news").removeClass("d-none");
      $("#nav_news").addClass("d-block");
      $("#s04").removeClass("d-none");
      $("#s04").addClass("d-block");
      $("#s05").removeClass("d-none");
      $("#s05").addClass("d-block");
      $("#s06").removeClass("d-none");
      $("#s06").addClass("d-block");
      $("#s07").removeClass("d-none");
      $("#s07").addClass("d-block");
      $("#s08").removeClass("d-none");
      $("#s08").addClass("d-block");
      $("#s09").removeClass("d-none");
      $("#s09").addClass("d-block");
      $("#s10").removeClass("d-none");
      $("#s10").addClass("d-block");
      $("#s11").removeClass("d-none");
      $("#s11").addClass("d-block");
      $("#s12").removeClass("d-none");
      $("#s12").addClass("d-block");
      $("#s13").removeClass("d-none");
      $("#s13").addClass("d-block");
      $("#s14").removeClass("d-none");
      $("#s14").addClass("d-block");
      $("#s15").removeClass("d-none");
      $("#s15").addClass("d-block");
      u_id = data.data[0].id;
    }
  } else {
    alert(data.message);
  }
}

function showdata_loginUid(data) {
  if (data.state) {
    if (data.data[0].manager == "Y") {
      console.log(data.message);
      $("#loginModal").modal("hide");
      $("#user_message").text(data.data[0].userName);
      $("#login_btn").addClass("d-none");
      $("#reg_btn").addClass("d-none");
      $("#logout_btn").removeClass("d-none");
      $("#logout_btn").addClass("d-block");
      $("#member_btn").removeClass("d-none");
      $("#member_btn").addClass("d-block");
      $("#memberlist_btn").removeClass("d-none");
      $("#memberlist_btn").addClass("d-block");
      // $("#product_create").removeClass("disabled");
      // $("#product_list").removeClass("disabled");
      $("#nav_hint").removeClass("d-block");
      $("#nav_hint").addClass("d-none");
      $("#nav_about").removeClass("d-none");
      $("#nav_about").addClass("d-block");
      $("#nav_Adoption").removeClass("d-none");
      $("#nav_Adoption").addClass("d-block");
      $("#nav_future").removeClass("d-none");
      $("#nav_future").addClass("d-block");
      $("#nav_info").removeClass("d-none");
      $("#nav_info").addClass("d-block");
      $("#nav_contact").removeClass("d-none");
      $("#nav_contact").addClass("d-block");
      $("#nav_news").removeClass("d-none");
      $("#nav_news").addClass("d-block");
      $("#s04").removeClass("d-none");
      $("#s04").addClass("d-block");
      $("#s05").removeClass("d-none");
      $("#s05").addClass("d-block");
      $("#s06").removeClass("d-none");
      $("#s06").addClass("d-block");
      $("#s07").removeClass("d-none");
      $("#s07").addClass("d-block");
      $("#s08").removeClass("d-none");
      $("#s08").addClass("d-block");
      $("#s09").removeClass("d-none");
      $("#s09").addClass("d-block");
      $("#s10").removeClass("d-none");
      $("#s10").addClass("d-block");
      $("#s11").removeClass("d-none");
      $("#s11").addClass("d-block");
      $("#s12").removeClass("d-none");
      $("#s12").addClass("d-block");
      $("#s13").removeClass("d-none");
      $("#s13").addClass("d-block");
      $("#s14").removeClass("d-none");
      $("#s14").addClass("d-block");
      $("#s15").removeClass("d-none");
      $("#s15").addClass("d-block");
      u_id = data.data[0].id;
    } else if (data.data[0].manager == "N") {
      $("#loginModal").modal("hide");
      $("#user_message").text(data.data[0].userName);
      $("#login_btn").addClass("d-none");
      $("#reg_btn").addClass("d-none");
      $("#logout_btn").removeClass("d-none");
      $("#logout_btn").addClass("d-block");
      $("#member_btn").removeClass("d-none");
      $("#member_btn").addClass("d-block");
      // $("#product_create").removeClass("disabled");
      // $("#product_list").removeClass("disabled");
      $("#nav_hint").removeClass("d-block");
      $("#nav_hint").addClass("d-none");
      $("#nav_about").removeClass("d-none");
      $("#nav_about").addClass("d-block");
      $("#nav_Adoption").removeClass("d-none");
      $("#nav_Adoption").addClass("d-block");
      $("#nav_future").removeClass("d-none");
      $("#nav_future").addClass("d-block");
      $("#nav_info").removeClass("d-none");
      $("#nav_info").addClass("d-block");
      $("#nav_contact").removeClass("d-none");
      $("#nav_contact").addClass("d-block");
      $("#nav_news").removeClass("d-none");
      $("#nav_news").addClass("d-block");
      $("#s04").removeClass("d-none");
      $("#s04").addClass("d-block");
      $("#s05").removeClass("d-none");
      $("#s05").addClass("d-block");
      $("#s06").removeClass("d-none");
      $("#s06").addClass("d-block");
      $("#s07").removeClass("d-none");
      $("#s07").addClass("d-block");
      $("#s08").removeClass("d-none");
      $("#s08").addClass("d-block");
      $("#s09").removeClass("d-none");
      $("#s09").addClass("d-block");
      $("#s10").removeClass("d-none");
      $("#s10").addClass("d-block");
      $("#s11").removeClass("d-none");
      $("#s11").addClass("d-block");
      $("#s12").removeClass("d-none");
      $("#s12").addClass("d-block");
      $("#s13").removeClass("d-none");
      $("#s13").addClass("d-block");
      $("#s14").removeClass("d-none");
      $("#s14").addClass("d-block");
      $("#s15").removeClass("d-none");
      $("#s15").addClass("d-block");
      u_id = data.data[0].id;
    }
  } else {
    console.log(data.message);
  }
}

//w3s
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//w3s
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
