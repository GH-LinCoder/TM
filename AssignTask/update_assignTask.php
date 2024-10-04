<?php
include '../Connect_T&M.php';
echo "<p> <i>PHP file called: insert_taskstage.php </i> which echo:<br>";
//
//5
//echo "empty?".empty($_POST)."<";

$TLId = $_POST['TLId'];
$stage=$_POST['stage'];
echo "<strong>". $TLId . "</strong></p>";

/* 
$stage=1; //default new assignments start at stage 1

$studentId = $_POST['studentId'];
echo "<strong>". $studentId . "</strong></p>";
//15
$managerId = $_POST['managerId'];
echo "<strong>". $managerId . "</strong></p>";

$stageText = $_POST['stageText'];
echo "<strong>". $stageText . "</strong></p>";

*/
$sql = "UPDATE `tasklist` SET 'Stage'=`$stage` WHERE `TLId`=$TLId;";
echo $sql.'<br>';


if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    echo "Record updated successfully. TLId is: " . $$TLId;
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

//36
$conn->close();

?>