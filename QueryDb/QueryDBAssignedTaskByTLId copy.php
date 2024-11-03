 <?php
 
 include '../Connect_T&M.php';

 if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['TLId']) ) {  //specific key
        $TLId = intval($_POST['TLId']);


//13------------------------------------
// Run a SQL query of TASKSLIST by Task (joining other tables)
//--------------------------------------
$sql = "SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId,tasksheader.TaskName, membersSt.MUserName AS Student, membersMan.MUserName AS Manager FROM `tasklist`INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId AND TLId=$TLId INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;";

//------------------------------------
// Run the SQL query. Below is identical in different functions
//------------------------------------

$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
$dbData = [];
//$result = mysqli_query($conn, $sql);//why repeated?

$i = 0;
while ($row = mysqli_fetch_assoc($result)) {
    $dbData[$i] = $row;
    $i++;
}
echo json_encode($dbData);
}
//end of normal query & response
  
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing offset or limit parameter']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}

// Close the connection
 mysqli_close($conn);
 ?>