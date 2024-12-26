<?php

include '../Connect_T&M.php';







$sql = "SELECT\n"

    . "COUNT(members.MId) AS countMembers,\n"

    . "COUNT(tasksheader.THId) AS countTasksheaders,\n"

    . "COUNT(tasksstages.TSId) AS countTasksstages,\n"

    . "COUNT(tasklist.TLId) AS countTasklist,\n"

    . "COUNT(DISTINCT tasklist.studentId) AS uniqueStudents,\n"

    . "COUNT(DISTINCT tasklist.managerId) AS uniqueManagers\n"

    . "FROM members\n"

    . "LEFT JOIN tasklist ON members.MId = tasklist.studentId\n"

    . "LEFT JOIN tasksheader ON tasksheader.THId = tasklist.TLId\n"

    . "LEFT JOIN tasksstages ON tasksstages.TSId = tasklist.TLId;";






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