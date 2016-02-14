<?php
	include("functions.php");
	if(isset($_GET['invoice'])){
		 $user_id = $_GET['user'];
		  $invoice_id = $_GET['invoice'];

	    retrive_invoice($user_id, $invoice_id);
	}
?>