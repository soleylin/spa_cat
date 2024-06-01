<?php

$data = file_get_contents("php://input", "r");
if ($data != "") {   

    $mydata = array();
    $mydata = json_decode($data, true);

    if (isset($mydata["userName"]) && isset($mydata["password"]) && isset($mydata["email"]) && isset($mydata["manager"]) && isset($mydata["uid01"]) && $mydata["userName"] != "" && $mydata["password"] != "" && $mydata["email"] != "" && $mydata["manager"] != "" && $mydata["uid01"] != "") {

        $user = $mydata["userName"];
        $pwd = password_hash($mydata["password"], PASSWORD_DEFAULT);
        $email = $mydata["email"];
        $manager = $mydata["manager"];
        $uid01 = substr(hash("sha256", uniqid(time())), 0, 8);

        header("Access-Control-Allow-Origin: https://soleylin.github.io");
        $servername = "localhost";
        $username = "id22010393_soley";;
        $password = "Fdio3_dine";
        $dbname = "id22010393_soleystudio";

        $conn = mysqli_connect($servername, $username, $password, $dbname);

        if (!$conn) {
            die("連線失敗" . mysqli_connect_error());
        }

        $sql = "INSERT INTO cat_member (userName, password, email, manager, uid01) VALUES ('$user','$pwd','$email','$manager','$uid01')";

        if (mysqli_query($conn, $sql)) {
            $mydata = array();
            $mydata[] = $uid;
            echo '{"state" : true, "data": ' . json_encode($mydata) . ', "message":"註冊成功！"}';
        } else {
            echo '{"state" : false, "message" :"註冊失敗！"}';
        }
    } else {
        echo '{"state" : false, "message" :"傳遞參數格式錯誤！"}';
    }
} else {
    echo '{"state" : false, "message" :"未傳遞任何參數！"}';
}

mysqli_close($conn);
