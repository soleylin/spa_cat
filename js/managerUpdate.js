import { drawTable } from "./memberlist.js";
import { showdata } from "./memberlist.js";
import { clear_data } from "./memberlist.js";
import { nowpage } from "./memberlist.js";
var u_id; //update id
var manager; //紀錄管理員狀態

$(function () {
  //監聽 #update_btn
  $("body").on("click", " #mybody #update_btn", function () {
    console.log($(this).data("manager"));
    u_id = $(this).data("id");
    $("#modal_username").val($(this).data("username"));
    $("#manager").val($(this).data("manager"));

    //manager顯示checked
    if ($(this).data("manager") == "Y") {
      $("input[id=manager]").prop("checked", true);
      $("#manager").next().text("管理者");
      manager = "Y";
    } else if ($(this).data("manager") == "N") {
      $("input[id=manager]").prop("checked", false);
      $("#manager").next().text("非管理者");
      manager = "N";
    }
  });

  //監聽 #modal_update_btn
  $("#modal_update_btn").click(function () {
    var dataJSON = {};
    dataJSON["id"] = u_id;
    dataJSON["userName"] = $("#modal_username").val();
    dataJSON["manager"] = manager;
    console.log(JSON.stringify(dataJSON));

    $.ajax({
      type: "POST",
      url: "https://soleystudio.000webhostapp.com/spa_cat-api/manager-Update-api.php",
      data: JSON.stringify(dataJSON),
      dataType: "json",
      success: showdata_manager_update,
      error: function () {
        Swal.fire(
          "error-soleystudio.000webhostapp.com/spa_cat-api/manager-Update-api.php"
        );
      },
    });
  });

  $("#manager").change(function () {
    //is(':checked'): 判斷是否為checked, 結果為布林值
    console.log($(this).is(":checked"));
    if ($(this).is(":checked")) {
      //next():下一個標籤.以text型態
      $(this).next().text("管理者");
      manager = "Y";
    } else {
      $(this).next().text("非管理者");
      manager = "N";
    }
  });
});

function showdata_manager_update(data) {
  if (data.state) {
    Swal.fire({
      title: data.message,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "確定",
    }).then((result) => {
      if (result.isConfirmed) {
        update_data();
        drawTable(nowpage);
        $("#UpdateModal").modal("hide");
      }
    });
  } else {
    alert(data.message);
  }
}
function update_data() {
  clear_data();
  $.ajax({
    type: "GET",
    url: "https://soleystudio.000webhostapp.com/spa_cat-api/memberlist-Read-api.php",
    dataType: "json",
    //關閉非同步 (先串接資料才監聽 / 同步->串接資料與監聽同時進行, 只會監聽到第一筆讀取的資料)
    async: false,
    success: showdata,
    error: function () {
      Swal.fire(
        "系統串接錯誤！-soleystudio.000webhostapp.com/spa_cat-api/memberlist-Read-api.php"
      );
    },
  });
}
