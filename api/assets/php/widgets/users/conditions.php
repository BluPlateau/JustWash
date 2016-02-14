<?php

include('functions.php');
//session_destroy();
 $baseurl = baseurl();
$array = $_POST;

//adding cars in database
if(isset($_POST['submit']))	{
	if (empty($array['wash_area'])) {
     $_SESSION['error']   = "Please enter wash area";
 
    header('location:'.$baseurl.'/add_washarea.php');
    exit;
}
if(!isset($_SESSION['error'])){
	
 $add_washarea     = add_washarea();
 if($add_washarea){
 	  $_SESSION['error']   = "added succesfully";
 
    header('location:'.$baseurl.'/add_washarea.php');
    exit;
}else{
	  $_SESSION['error']   = "Please try after some time";
 
    header('location:'.$baseurl);
    exit;
}	
}
}


//update cars in database

if(isset($_POST['update']))	{
	$id = $_POST['id'];
if (empty($array['wash_area'])) {
     $_SESSION['error']   = "Please enter wash area";
 
    header('location:'.$baseurl.'/edit_washarea.php?wash_area_id='.$id);
    exit;
}
if(!isset($_SESSION['error'])){
	
 $update_washarea     = update_washarea();
 if($update_washarea){
 	  $_SESSION['error']   = "updated succesfully";
 
    header('location:'.$baseurl.'/wash_areas.php');
    exit;
}else{
	  $_SESSION['error']   = "Please try after some time";
 
      header('location:'.$baseurl.'/wash_areas.php');
    exit;
}	
}
}

//delete cars from database
if($_GET['delete_id']){
  
	$id= $_GET['delete_id'];
	$delete_washarea = delete_wash_area($id);
	 if($delete_washarea){
	 	$_SESSION['error']   = "Deleted succesfully";
 
    header('location:'.$baseurl.'/wash_areas.php');
    exit;
}else{
		$_SESSION['error']   = "Please try after some time";
 
    header('location:'.$baseurl.'/wash_areas.php');
    exit;
}	
}






	
	
	






?>