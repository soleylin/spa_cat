import { setCookie } from "./login.js";

$(function () {
  //監聽 #logout_btn
  $("#logout_btn").click(function () {
    setCookie("uid","",7)
    location.href="https://soleylin.github.io/spa_cat";});
})
