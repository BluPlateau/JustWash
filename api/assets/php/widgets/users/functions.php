<?php 
session_start();
include('../../database.php');

//for adding user from admin side
function add_washarea(){

	$dbhandle   = db_connect();
    $baseurl    = baseurl();
	$washarea         = $_POST['wash_area']; 
	$sql        = "INSERT INTO `wash_area`(`wash_area_id`, `wash_area`, `status`) 
	VALUES ('','$washarea','active')";
	$result     = mysql_query($sql, $dbhandle);
	if($result){
		return true;
	}else{
		return false;
	}
		
}
//update cars
function update_washarea(){

	$dbhandle   = db_connect();
    $baseurl    = baseurl();
	$wash_area         = $_POST['wash_area']; 
	$id = $_POST['id'];
     $sql        = "UPDATE wash_area SET wash_area='$wash_area' WHERE wash_area_id ='$id'";
   
	$result     = mysql_query($sql, $dbhandle);
	if($result){
		return true;
	}else{
		return false;
	}
		
}
//retrive cars
function retrieve_wash_areas(){

	$dbhandle   = db_connect();
    $baseurl    = baseurl();
	
	 $sql        = "SELECT * from wash_area WHERE status='active'";
	$result     = mysql_query($sql, $dbhandle);
	while($row	=	mysql_fetch_assoc($result)) {
		$details[]	=	$row;
	}
	return $details;
		
}

//retrive cars from database
function retrive_wash_id($id){

	$dbhandle   = db_connect();
    $baseurl    = baseurl();
	$sql        = "SELECT * from wash_area WHERE wash_area_id='$id' ";
	$result     = mysql_query($sql, $dbhandle);
	while($row	=	mysql_fetch_assoc($result)) {
		$details[]	=	$row;
	}
	return $details;
		
}

//delete cars from database
function delete_wash_area($id){

	$dbhandle   = db_connect();
    $baseurl    = baseurl();
	$sql        = "DELETE from wash_area WHERE wash_area_id='$id' ";
	$result     = mysql_query($sql, $dbhandle);
	if($result){
		return true;
	}else{
		return false;
	}
		
}

?>