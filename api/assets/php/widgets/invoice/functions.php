<?php
	//to retrive services from database
	function retrive_invoice($user_id, $invoice_id) {
		
		$empty			=	array();
		$dbhandle	=	db_connect(); 
		//$user_id    =$_SESSION['user']['user_id'];
		// echo $sql        = "SELECT * FROM washes,wash_types,wash_area WHERE `washes`.`car_type`='$service_id'AND `washes`.`wash_types` = `wash_types`.`wash_types_id` AND `washes`.`wash_area`=`wash_area`.`wash_area_id` GROUP BY `washes`.`wash_types`";
		//$sql =  'SELECT * FROM  `washes` ,`cars` ,`wash_types` WHERE  `washes`.`car_type` =  '$service_id' AND  `washes`.`wash_types` =  '$wash_type' AND  `washes`.`car_type` =  `cars`.`car_id` AND  `washes`.`wash_types` =  `wash_types`.`wash_types_id` ';

		  $sql	=	"SELECT * FROM  `invoice` WHERE  `user_email` =  '$user_id'
			AND  `invoice_id` =  '$invoice_id' LIMIT 0 , 30";
		$result = mysql_query($sql, $dbhandle);
		while($row  = mysql_fetch_assoc($result)){
			$details[] = $row;
		}

		if (!empty($details))
			foreach($details as $key){  //for display JSON format
				$json	=	array(
									array('car type' => $key['car_type']),
									array('price' => $key['invoice_id']),
									array('status' => $key['status'])
								);
				echo json_encode($json);
			}
		else
			return $empty;   
	}
?>