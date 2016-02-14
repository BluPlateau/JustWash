<?php
	//to retrive services from database
	function retrive_types($service_id, $wash_type) {
		$empty			=	array();
		$dbhandle	=	db_connect();
		$sql	=	"SELECT * 
		FROM `washes` , `cars` , `wash_types`, `wash_area`
		WHERE `washes`.`car_type` = '$service_id'
		AND `washes`.`wash_types` = '$wash_type'
		AND `washes`.`car_type` = `cars`.`car_id` 
		AND `washes`.`wash_types` = `wash_types`.`wash_types_id`
		AND `washes`.`wash_area` = `wash_area`.`wash_area_id` 
		LIMIT 0 , 30";

		$result = mysql_query($sql, $dbhandle);
		while($row  = mysql_fetch_assoc($result)){
			$details[] = $row;
		}

		if (!empty($details))
			foreach($details as $key){  //for display JSON format
				$json	=	array(
									array('wash area' => $key['wash_area']),
									array('price' => $key['pricing'])
								);
				echo json_encode($json);
			}
		else
			return $empty;   
	}
?>