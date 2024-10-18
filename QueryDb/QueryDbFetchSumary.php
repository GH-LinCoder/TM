<?php

include '../Connect_T&M.php';



$sql = "SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId, \n"

    . "tasksheader.TaskName,\n"

    . "membersSt.MUserName AS Student,\n"

    . "membersMan.MUserName AS Manager\n"

    . "FROM `tasklist`\n"

    . "INNER JOIN tasksheader ON\n"

    . "tasklist.TaskId=tasksheader.THId\n"

    . "INNER JOIN members AS membersSt  ON\n"

    . "tasklist.StudentId=membersSt.MId\n"

    . "INNER JOIN members AS membersMan ON\n"

    . "tasklist.ManagerId=membersMan.MId;";



    $sql = "SELECT\n"

    . "    COUNT(members.MId) AS countMembers,\n"

    . "    COUNT(tasksheader.THId) AS countTasksheaders,\n"

    . "    COUNT(tasksStages.TSId) AS countTasksStages,\n"

    . "    COUNT(taskList.TLId) AS countTaskList,\n"

    . "    COUNT(DISTINCT taskList.studentId) AS uniqueStudents,\n"

    . "    COUNT(DISTINCT taskList.managerId) AS uniqueManagers\n"

    . "FROM members\n"

    . "LEFT JOIN taskList ON members.MId = taskList.studentId\n"

    . "LEFT JOIN tasksheader ON tasksheader.THId = taskList.TLId\n"

    . "LEFT JOIN tasksStages ON tasksStages.TSId = taskList.TLId;";






// Run a SQL query


$summaryData=[];
$result = mysqli_query($conn, $sql);

$i=0;
while($row = mysqli_fetch_assoc($result)) {
$summaryData[$i]=$row; $i++;


}  //echo"</table>";
  
echo json_encode( $summaryData); //echos to screen when php run in browser
// [{"countMembers":"8","countTasksheaders":"3","countTasksStages":"3","countTaskList":"3","uniqueStudents":"2","uniqueManagers":"2"}]

    // Close the connection
mysqli_close($conn);


?>