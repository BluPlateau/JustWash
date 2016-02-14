<?php
	//to retrive services from database
	function retrive_services($car_id) {
	$empty			=	array();
	$dbhandle	=	db_connect();
	// $user_id	=	$_SESSION['user']['user_id'];
	$sql				=	"SELECT * FROM washes,wash_types WHERE `washes`.`car_type`='$car_id' AND `washes`.`wash_types` = `wash_types`.`wash_types_id` GROUP BY `washes`.`wash_types`";
	$result			=	mysql_query($sql, $dbhandle);
	while($row	=	mysql_fetch_assoc($result)) {
		$details[]	=	$row;
	}

	if (!empty($details))
		foreach($details as $key){  
			$json = array(array('Wash type' => $key['wash_type']));
			echo json_encode($json);
		}
	else
		return $empty;
}
?>