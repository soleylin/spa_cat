export { drawTable };
export { showdata };
export { clear_data };
export { nowpage };
var newData = [];
var lastpage = 0;
var nowpage = 0;

$(function () {
  $.ajax({
    type: "GET",
    url: "soleystudio.000webhostapp.com/spa_cat-api/memberlist-Read-api.php",
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

  //監聽 #delete_btn
  $("body").on("click", " #mybody #delete_btn", function () {
    if ($(this).data("id") == 1) {
      Swal.fire({
        title: "此帳號無法刪除",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "確定",
      });
    } else {
      Swal.fire({
        title: "確認要刪除這筆資料嗎?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "確定刪除",
        denyButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("delete_btn_ok");
          console.log($(this).data("id"));

          var dataJSON = {};
          dataJSON["id"] = $(this).data("id");
          console.log(JSON.stringify(dataJSON));

          $.ajax({
            type: "POST",
            url: "soleystudio.000webhostapp.com/spa_cat-api/member-Delete-api.php",
            data: JSON.stringify(dataJSON),
            dataType: "json",
            success: showdata_delete,
            error: function () {
              Swal.fire(
                "error-soleystudio.000webhostapp.com/spa_cat-api/member-Delete-api.php"
              );
            },
          });
        }
      });
    }
  });

  $("body").on("click", "#pre", function () {
    if (nowpage > 0) {
      console.log("pre" + nowpage);
      drawTable(nowpage - 1);
    }
  });
  $("body").on("click", "#next", function () {
    if (nowpage + 1 < lastpage) {
      drawTable(nowpage + 1);
    }
  });

  //監聽頁碼
  $("body").on("click", ".page-item .page-link[name='page-link']", function () {
    nowpage = $(this).data("key");
    console.log("nowpage" + nowpage);
    drawTable(nowpage);
  });
});

function showdata(data) {
  //整理資料儲存為二維陣列
  //key: 陣列索引值
  data.data.forEach(function (item, key) {
    console.log(key);

    //3筆資料為1頁
    //%: 除於某數的餘數值 (key%3 == 0 : key除以3時餘數為0)
    if (key % 3 == 0) {
      //將空陣列[]放入newData
      newData.push([]);
      lastpage++;
    }
    //parseInt: 無條件捨去, 取正整數
    //page: 取得key位在第幾個一維陣列(第幾頁)
    var page = parseInt(key / 3);
    //把item放入每個對應德一維陣列
    newData[page].push(item);
  });
  //傳入參數並呼叫drawTable
  drawTable(nowpage);

  $("#pageList").empty();
  var strHTML =
    '<li class="page-item disabled" id="pre"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;Previous</span></a></li>';
  $("#pageList").append(strHTML);

  // 產生頁碼
  newData.forEach(function (item, key) {
    var thisPage = key + 1;
    var strHTML =
      '<li class="page-item"><a class="page-link" name="page-link" href="#" id="page' +
      thisPage +
      '" data-key="' +
      key +
      //有export無法使用onclick只能監聽按鈕
      // '"onclick="drawTable(' +
      // key +
      // ')">' +
      '">' +
      thisPage +
      "</a></li>";
    $("#pageList").append(strHTML);
  });

  var strHTML =
    '<li class="page-item" id="next"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">Next&raquo;</span></a></li>';
  $("#pageList").append(strHTML);
  console.log(newData);

  //第一頁active
  $("#page1").addClass("active");
}

function showdata_delete(data) {
  console.log(data);
  //data.state == true
  if (data.state) {
    Swal.fire({
      title: data.message,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "確定",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = "soleylin.github.io/spa_cat/member-Read.html";
      }
    });
  }
}

function drawTable(page) {
  //刪除樣板
  $("#mybody").empty();

  if (page == 0) {
    $("#pre").addClass("disabled");
    $("#next").removeClass("disabled");
  } else if (page + 1 == lastpage) {
    $("#pre").removeClass("disabled");
    $("#next").addClass("disabled");
  } else {
    $("#pre").removeClass("disabled");
    $("#next").removeClass("disabled");
  }

  //page active顯示當前頁面
  $(".page-link").removeClass("active");
  var pageid = "#page" + (page + 1);
  $(pageid).addClass("active");

  //forEach每次跑一列
  newData[page].forEach(function (item) {
    console.log(item.userName);
    var strHTML =
      '<tr><td data-th="會員編號" class="tdc">' +
      item.id +
      '</td><td data-th="會員帳號" class="tdc">' +
      item.userName +
      '</td><td data-th="會員信箱" class="tdc">' +
      item.email +
      '</td><td data-th="管理員" class="tdc">' +
      item.manager +
      '</td><td data-th="建檔時間" class="tdc" >' +
      item.created_at +
      '</td><td data-th="更新/刪除" class="tdc"><button class="btn btn-success me-1" data-bs-toggle="modal" data-bs-target="#UpdateModal" data-id="' +
      item.id +
      '" data-username="' +
      item.userName +
      '" data-manager="' +
      item.manager +
      '" id="update_btn"> 更新 </button><button class="btn btn-danger" data-id="' +
      item.id +
      '"id="delete_btn" >刪除</button></td></tr>';

    $("#mybody").append(strHTML);
    nowpage = page;
  });
}

function clear_data() {
  newData = [];
}
