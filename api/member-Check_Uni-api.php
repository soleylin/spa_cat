<?php

$data = file_get_contents("php://input", "r");
if ($data != "") {

    $mydata = array();
    $mydata = json_decode($data, true);

    if (isset($mydata["userName"]) && $mydata["userName"] != "") {

        $user = $mydata["userName"];
        
        header("Access-Control-Allow-Origin: https://soleylin.github.io");
        $servername = "localhost";
        $username = "id22010393_soley";;
        $password = "Fdio3_dine";
        $dbname = "id22010393_soleystudio";

        $conn = mysqli_connect($servername, $username, $password, $dbname);

        if (!$conn) {
            die("連線失敗" . mysqli_connect_error());
        }

        $sql = "SELECT * FROM cat_member WHERE userName = ?";
        //stmt = 資料庫與sql連接
        $stmt = $conn -> prepare($sql); 
        //比對字串
        $stmt->bind_param("s", $user); 
        //執行
        $stmt->execute();
        //得到結果
        $result = $stmt->get_result();

        //結果不為0代表有重複
        if ($result->num_rows==0) {
            echo '{"state" : true, "message":"帳號不存在，可以使用"}';
        } else {
            echo '{"state" : false, "message" :"帳號已存在，不可使用！"}';
        } 
/*
        $sql = "SELECT Username FROM member WHERE Username = '$p_Username'";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result) == 0){
            //帳號不存在, 可以使用
            echo '{"state" : true, "message" : "帳號不存在, 可以使用!"}';
        }else{
            //帳號存在, 不可以使用
            echo '{"state" : false, "message" : "帳號已存在,不可以使用!"}';
        }
*/
    } else {
        echo '{"state" : false, "message" :"傳遞參數格式錯誤！"}';
    }
} else {
    echo '{"state" : false, "message" :"未傳遞任何參數！"}';
}

mysqli_close($conn);
