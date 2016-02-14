<?php 

function db_connect() {

	$username = "gsprasad_vasanti";
	$password = "Vasu_8278";
	$hostname = "localhost"; 
	//connection to the database
	$dbhandle = mysql_connect($hostname, $username, $password) or die(mysql_error());
	//select a database to work with
	$selected = mysql_select_db("gsprasad_justwash",$dbhandle) or die(mysql_error()); 
    return $dbhandle;
}

function baseurl() {
    $baseurl = "http://justwash.gsprasad.com/";
    return $baseurl;
}
?>