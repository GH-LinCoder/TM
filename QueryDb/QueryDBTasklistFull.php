<?php
  include '../Connect_T&M.php';

 //the query is different for each function file 
 $sql = "SELECT tasklist.TLId,tasklist.TaskId,tasksheader.TaskName,tasklist.Stage,\n"

    . " tasklist.StudentId, membersSt.MUserName AS Student, tasklist.ManagerId,\n"

    . " membersMan.MUserName AS Manager\n"

    . "FROM `tasklist`\n"

    . "INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId\n"

    . "INNER JOIN members AS membersSt  ON\n"

    . "tasklist.StudentId=membersSt.MId INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;";

// Fetch the result data
$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
$dbData = [];
$result = mysqli_query($conn, $sql);

$i = 0;
while ($row = mysqli_fetch_assoc($result)) {
    $dbData[$i] = $row;
    $i++;
}
echo json_encode($dbData);
}
// Close the connection
 mysqli_close($conn);
 ?>