<?php //the SESSION array contains rows of data that the user is trying to remember
session_start();

if(isset($_SESSION['array'])){
$data = $_SESSION['array'];}
else $data="";
echo json_encode($data);

?>