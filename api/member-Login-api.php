<?php

$data = file_get_contents("php://input", "r");
if ($data != "") {

    $mydata = array();
    $mydata = json_decode($data, true);

    if (isset($mydata["userName"]) && isset($mydata["password"]) && $mydata["userName"] != "" && $mydata["password"] != "") {
        
        $user = $mydata["userName"];
        $pwd = $mydata["password"];

        header("Access-Control-Allow-Origin: https://soleylin.github.io");
        $servername = "localhost";
        $username = "id22010393_soley";;
        $password = "Fdio3_dine";
        $dbname = "id22010393_soleystudio";

        $conn = mysqli_connect($servername, $username, $password, $dbname);

        if (!$conn) {
            die("連線失敗" . mysqli_connect_error());
        }

        $sql = "SELECT userName, password FROM cat_member WHERE userName = '$user'";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) == 1) {
            //確認有此帳號，密碼未比對
            //撈取一筆資料
            $row = mysqli_fetch_assoc($result);
            if (password_verify($pwd, $row["password"])) {
                //密碼比對正確，撈取不包含密碼的使用者資料
                //並產生uid(cookie)
                $uid = substr(hash("sha256", uniqid(time())), 0, 8);
                //更新uid(01)至資料庫
                $sql = "UPDATE cat_member SET uid01 = '$uid' WHERE userName = '$user'";
                //假如uid更新成功
                if (mysqli_query($conn, $sql)) {
                    $sql = "SELECT id, userName, email, manager, uid01 FROM cat_member WHERE userName = '$user'";
                    //一團撈取的資料
                    $result = mysqli_query($conn, $sql);
                    //撈取最上面的一筆
                    $row = mysqli_fetch_assoc($result);
                    //因為一開始就只有搜尋一筆, 所以不使用while迴圈
                    //將資料丟進陣列裡,以便轉為JSON格式
                    $mydata = array();
                    $mydata[] = $row;

                    echo '{"state" :true, "data": ' . json_encode($mydata) . ', "message": "登入成功！"}';
                } else {
                //uid更新錯誤
                    echo '{"state" :false, "message": "登入失敗！"}';
                }
            } else {
                //密碼比對錯誤
                echo '{"state" :false, "message": "登入失敗！"}';
            }
        } else {
            //帳號不符合，登入失敗
            echo '{"state" :false, "message": "登入失敗！"}';
        }
    } else {
        echo '{"state" :false, "message": "傳遞參數格式錯誤！"}';
    }
} else {
    echo '{"state" :false, "message": "未傳遞任何參數！"}';
}

mysqli_close($conn);
