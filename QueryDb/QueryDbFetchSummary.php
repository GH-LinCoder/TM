<?php

include '../Connect_T&M.php';







$sql = "SELECT COUNT(members.MId) AS countMembers, COUNT(tasksheader.THId) AS countTasksheaders, COUNT(tasksstages.TSId) AS countTasksstages, COUNT(tasklist.TLId) AS countTasklist, COUNT(DISTINCT tasklist.studentId) AS uniqueStudents, COUNT(DISTINCT tasklist.managerId) AS uniqueManagers, COUNT(DISTINCT tasksheader.TaskAuthor) AS uniqueAuthors FROM members LEFT JOIN tasklist ON members.MId = tasklist.studentId LEFT JOIN tasksheader ON tasksheader.THId = tasklist.TLId LEFT JOIN tasksstages ON tasksstages.TSId = tasklist.TLId; ";






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