<?php
include '../Connect_T&M.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['MemberId']))  {  //could include specific key
        $key = intval($_POST['MemberId']);

        $count_query = "SELECT COUNT(*) FROM `tasklist` "; // table name specific
        $result = mysqli_query($conn, $count_query);
        $total_rows = mysqli_fetch_row($result)[0];
        

        // Adjust if necessary
        $key = min($key, $total_rows); //never let $MId exceed the last row
        $key = max($key, 1);
//13------------------------------------
// Run a SQL query of TASKSLIST by student (joining other tables)
//--------------------------------------


//$sql = "SELECT * FROM `tasklist` WHERE StudentID= 3;";

$sql = "SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId, \n"

    . "tasksheader.TaskName, membersSt.MUserName AS Student, membersMan.MUserName AS Manager \n"

    . "FROM `tasklist`\n"

    . "INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId\n"

    . "INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId AND StudentId=$key\n"

    . "INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;";

/* other order
$sql = "SELECT tasksheader.TaskName,tasklist.TaskId, membersSt.MUserName AS Student, tasklist.StudentId,tasklist.Stage,\n"

    . "  membersMan.MUserName AS Manager,  tasklist.ManagerId, tasklist.TLId \n"

    . "FROM `tasklist`\n"

    . "INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId\n"

*/

//------------------------------------
// Run the SQL query. Below is identical in different functions
//------------------------------------

$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
$row = mysqli_fetch_assoc($result);
echo json_encode($row);
} else {
//    http_response_code(500);
    echo json_encode(['error No row found ']);
}
    }else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing parameter']);
          }
    
//end of normal query & response
} else {
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);}

// Close the connection
 mysqli_close($conn);

 ?>