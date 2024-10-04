<?php
include '../Connect_T&M.php';
echo "<p> <i>PHP file called: insert_taskstage.php </i> which echo:<br>";
//
//5
//echo "empty?".empty($_POST)."<";

$stage_name = $_POST['stage_name'];
echo "<strong>". $stage_name . "</strong></p>";
//10
$stage_description = $_POST['stage_description'];
echo "<strong>". $stage_description . "</strong></p>";

$stage_number = $_POST['stagen'];
echo "<strong>". $stage_number . "</strong></p>";

$task_THId = $_POST['task_THId'];
echo "<strong>". $task_THId . "</strong></p>";

$stage_author = $_POST['stage_author'];
echo "<strong>". $stage_author . "</strong></p>";
//22

$sql = "INSERT INTO `tasksstages`(`taskid` ,`StageNum`, `stageName`, `stageDesc`, `stageAuthor`) VALUES ('$task_THId','$stage_number','$stage_name','$stage_description','$stage_author');";
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