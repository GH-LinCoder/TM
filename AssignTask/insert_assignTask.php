<?php
include '../Connect_T&M.php';
//echo "<p> <i>PHP file called: insert_assignTask.php </i> which could echo:<br>";
//
//5
//echo "empty?".empty($_POST)."<";

$taskTHId = $_POST['taskTHId'];
//echo "<strong>". $taskTHId . "</strong></p>";

$stage=1; //default new assignments start at stage 1

$studentId = $_POST['studentId'];
//echo "<strong>". $studentId . "</strong></p>";
//10
$managerId = $_POST['managerId'];
//echo "<strong>". $managerId . "</strong></p>";



//$stageText = $_POST['stageText'];
//echo "<strong>". $stageText . "</strong></p>";
//22

$sql = "INSERT INTO `tasklist`(`Taskid` ,`Stage`, `StudentId`, `ManagerId`) VALUES ('$taskTHId','$stage','$studentId','$managerId');";
echo $sql.'<br>';


if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    echo "New record created successfully. Last inserted ID is: " . $last_id;
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }


//if ($conn->query($sql) === TRUE) {echo 'record created successfully';} 
//else {echo 'Error: ' . $sql . '<br>' . $conn->error;};
//28+
$conn->close();

?>