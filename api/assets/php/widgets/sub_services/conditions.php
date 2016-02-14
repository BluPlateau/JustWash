<?php
	$wash_type = $_GET['wash_type'];
	$service_id = $_GET['service_id'];
	include("functions.php");
	if(isset($wash_type)) {
		retrive_types($service_id, $wash_type);
	}
?>