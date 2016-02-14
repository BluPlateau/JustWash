<?php
	//to retrive user services from database
	function retrive_userservices($user_id) {
		
	$empty			=	array();   
	$dbhandle	=	db_connect();
	$sql				=	"SELECT *  FROM  `user_services` WHERE email='$user_id' LIMIT 0 , 10";
    $result			=	mysql_query($sql, $dbhandle);
	while($row	=	mysql_fetch_assoc($result)) {
		$details[]	=	$row;
	}
	if (!empty($details)){
		foreach($details as $key){  
			$json = array(array('email' => $key['email']),
				array('Car type' => $key['car_type']),
				array('Wash type' => $key['wash_type']),
				array('Wash area' => $key['wash_area']),
				array('Service date' => $key['service_date']),
				array('Service status' => $key['service_status']),
				array('Invoice' => $key['invoice_id']));
			echo json_encode($json);
		}
	} else {
		return $empty;
}
}
?>