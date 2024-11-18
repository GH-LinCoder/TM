<?php session_start();



include '../Connect_T&M.php';

$sql = "SELECT\n"

    . "  (SELECT COUNT(DISTINCT MId) FROM members) AS countMembers,\n"

    . "  (SELECT COUNT(DISTINCT THId) FROM tasksheader) AS countTasksheaders,\n"

    . "  (SELECT COUNT(DISTINCT TSId) FROM tasksStages) AS countTasksStages,\n"

    . "  (SELECT COUNT(DISTINCT TLId) FROM taskList) AS countTaskList,\n"

    . "  (SELECT COUNT(DISTINCT studentId) FROM taskList) AS countStudents,\n"

    . "  (SELECT COUNT(DISTINCT TaskAuthor) FROM tasksheader) AS countAuthors,\n"

    . "  (SELECT COUNT(DISTINCT managerId) FROM taskList) AS countManagers;";

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