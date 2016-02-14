<?php
	//to retrive categories when status active
	function retrive_cars(){
		//to retrive categories when status active
		$empty			=	array();
		$dbhandle	=	db_connect();
		$sql				=	"SELECT * FROM cars WHERE car_status='active'";
		$result			=	mysql_query($sql, $dbhandle);

		while($row	=	mysql_fetch_assoc($result)) {
			$details[]	=	$row;
		}

		if (!empty($details))
			foreach($details as $key){  
				$json = array(array('car_name' => $key['car_name']));
				echo json_encode($json);
			}
		else
			return $empty;
	}
?>