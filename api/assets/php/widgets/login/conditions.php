<?php
include('functions.php');
 $baseurl = baseurl();
$array = $_GET;
//Validating the email
if (empty($array['email'])) {
    $json = array(array('error' => 'Please Enter Email'));
        echo json_encode($json);
    exit;
}
//Validating the password
if (empty($array['password'])) {
   $json = array(array('error' => 'Please Enter Password'));
    echo json_encode($json);
    exit;
}
  $login     = login_check(); //for check if user exit or not
  if($login==1){
  $details   = user_details();//retrive user details if user exit
	$json = array(array('error' => 'logged in sucessfully'));
  echo json_encode($json);
  exit;
	}else{
	$json = array(array('error' => 'Wrong credentials'));
  echo json_encode($json);
  exit;
		
	}





?>