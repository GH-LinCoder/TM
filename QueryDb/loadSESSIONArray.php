<?php session_start(); //the SESSION array contains rows of data that the user is trying to remember

if(isset($_SESSION['array'])) { $data = $_SESSION['array'];}
else {//$data=""; //$data=""; seems to cause problem in javascript.
//$data="Array not set in $SESSION";
$data=['No entries', '{label: "value"}'];
};
    echo json_encode($data);

?>