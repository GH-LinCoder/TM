<?php
include '../Connect_T&M.php';

//13------------------------------------
// Run a SQL query of TASKSLIST (joining other tables)
//--------------------------------------

echo "<h2>Tasklist assigned</H2><h4><i>Details from other tables</h4></i>";

$sql =$sql = "SELECT \n"

. "tasklist.TLId, \n"

. "tasklist.TaskId,\n"

. "tasksheader.TaskName,\n"

. "tasklist.Stage, \n"

. "tasklist.StudentId, \n"

. "membersSt.MUserName AS Student,\n"

. "tasklist.ManagerId,\n"

. "membersMan.MUserName AS Manager\n"

. "\n"

. "\n"

. "FROM `tasklist`\n"

. "INNER JOIN tasksheader ON\n"

. "tasklist.TaskId=tasksheader.THId\n"

. "INNER JOIN members AS membersSt  ON\n"

. "tasklist.StudentId=membersSt.MId\n"

. "INNER JOIN members AS membersMan ON\n"

. "tasklist.ManagerId=membersMan.MId;";

// Run a SQL query


$summaryData = [];
$result = mysqli_query($conn, $sql);

$i = 0;
while ($row = mysqli_fetch_assoc($result)) {
    $summaryData[$i] = $row;
    $i++;
}  //echo"</table>";

echo json_encode($summaryData); //echos to screen when php run in browser. It looks something like this:
// [{"countMembers":"8","countTasksheaders":"3","countTasksStages":"3","countTaskList":"3","uniqueStudents":"2","uniqueManagers":"2"}]

// Close the connection
mysqli_close($conn);
?>