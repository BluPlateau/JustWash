<?php
	$car_id = $_GET['car_id'];
	include("functions.php");
	if(isset($car_id)) {
		retrive_services($car_id);
	}
?>