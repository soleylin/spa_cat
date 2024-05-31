import { setCookie } from "./login.js";

$(function () {
  //監聽 #logout_btn
  $("#logout_btn").click(function () {
    console.log("logout_btn_ok");
    setCookie("uid","",7)
    location.href="https://soleylin.github.io/spa_cat/spa_cat.html";});
})
