<?php  
include('../../database.php');
session_start();
function login_check() {//check if user exit or not
    $dbhandle   = db_connect();
    $baseurl    = baseurl();
    $email      = $_GET['email'];
	$user_type=$_GET['user_type'];
    $password   = md5($_GET['password']);
    $sql        = "select * from `users` WHERE  `email` = '$email' AND `password`='$password'";
	$result     = mysql_query($sql, $dbhandle);
    $row        = mysql_num_rows($result);
	return $row;
 
}

function user_details() {//retrive user details if user exit
    $dbhandle   = db_connect();
    $baseurl    = baseurl();
    $email      = $_POST['email'];
    $password   = md5($_POST['password']);
	$user_type=$_POST['user_type'];
    $sql        = "select * from `users` WHERE  `email` = '$email' AND `password`='$password'";
    $result     = mysql_query($sql, $dbhandle);
    while($row = mysql_fetch_assoc($result)){
        $details[] = $row;
    }
    return $details[0];
}




?>
