<?php
	$user_id = $_GET['user_id'];
	include("functions.php");
	if(isset($user_id)) {
		retrive_userservices($user_id);
	}
?>