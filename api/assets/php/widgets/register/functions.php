<?php 
session_start();
include('../../database.php');

//check if user enter add one time only
function check_user($user_id) {
    $dbhandle   = db_connect();
    $baseurl    = baseurl();
    $sql        = "select * from `advertisements` WHERE  `user_id` = '$user_id'  ";
	 $result     = mysql_query($sql, $dbhandle);
    $row        = mysql_num_rows($result);
	return $row;
 
}



//check if user exists or not
function adduser_check($emial) {
    $dbhandle   = db_connect();
    $baseurl    = baseurl();
    $category     = $_POST['user_name'];
	 $sql        = "select * from `users` WHERE  `email` = '$emial'  ";
	 $result     = mysql_query($sql, $dbhandle);
    $row        = mysql_num_rows($result);
	return $row;
 
}

//for adding user from admin side
function add_user(){

	$dbhandle   = db_connect();
    $baseurl    = baseurl();
	$full_name         = $_GET['full_name'];
	$email  = $_GET['email'];
	$password  = md5($_GET['password']);
	$phone  = $_GET['phone'];
	$address  = $_GET['address'];
	$sql        = "INSERT INTO `users`(`id`, `full_name`, `email`, `password`, `phone`,`address`) 
	VALUES ('','$full_name','$email','$password','$phone','$address')";
	$result     = mysql_query($sql, $dbhandle);
	if($result){
		return true;
	}else{
		return false;
	}
		
}

?>