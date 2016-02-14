<?php

include('functions.php');

 $baseurl = baseurl();
$array = $_GET;
$emial = $_GET['email'];
//add user to database
if($_GET['submit'] =='submit'){
	
if (empty($array['full_name'])) {
    //$_SESSION['error']   = "Please enter full name";
    $json = array(array('error' => 'Please enter full name'));
				echo json_encode($json);
    exit;
}
	
	if (empty($array['email'])) {
    //$_SESSION['error']   = "Please Enter email";
    $json = array(array('error' => 'Please Enter email'));
				echo json_encode($json);
    exit;
}
	
	if (empty($array['password'])) {
    //$_SESSION['error']   = "Please Enter password";
   $json = array(array('error' => 'Please Enter password'));
				echo json_encode($json);
    exit;
}	
	if (empty($array['retype_password'])) {

    //$_SESSION['error']   = "Please  re-type password";
   $json = array(array('error' => 'Please  re-type password'));
				echo json_encode($json);
    exit;
}

if ($array['password'] != $array['retype_password']) {
		
    //$_SESSION['error']   = "Password not matched";
   $json = array(array('error' => 'Password not matched'));
				echo json_encode($json);
    exit;
}
	
	if (empty($array['phone'])) {
    //$_SESSION['error']   = "Please Enter phone no";
   $json = array(array('error' => 'Please Enter phone no'));
				echo json_encode($json);
    exit;
}	
	
	
	if (empty($array['address'])) {
    //$_SESSION['error']   = "Please Enter address";
   $json = array(array('error' => 'Please Enter address'));
				echo json_encode($json);
    exit;
}

   
    $adduser_check     = adduser_check($emial); 
    if($adduser_check==1){
	//$_SESSION['error']  = "Sorry username allready exists.";
	$json = array(array('error' => 'Sorry username allready exists.'));
				echo json_encode($json);
    exit;
	}else{
	$details   = add_user();	
		if($details){
			 //$_SESSION['error']  = "user added succesfully.";
			 $json = array(array('error' => 'user added succesfully'));
				echo json_encode($json);
    exit;
		}
	
		
	}

}



	
	
	






?>