<?php session_start();
include '../Connect_T&M.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['offset']) && isset($_POST['limit'])) {  //could include specific key
        $offset = intval($_POST['offset']);
        $limit = intval($_POST['limit']);

//     below is specific to each table in 2 places
        // Validate offset and limit

$count_query = "SELECT COUNT(*) FROM `tasklist`
INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId
INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId 
INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;";
   $result = mysqli_query($conn, $count_query);
   $total_rows = mysqli_fetch_row($result)[0];
   
   // Adjust limit if necessary
   $offset = min($offset, $total_rows-1);
   $limit  =min ($limit, $total_rows-$offset);

//the query is different for each function file
$sql = "SELECT membersMan.MUserName AS ManagerName, tasklist.ManagerId AS MId,  membersSt.MUserName AS StudentName, tasklist.StudentId AS Id,  tasksheader.TaskName, tasklist.TaskId,  tasklist.Stage, tasklist.TLId \n"

    . "FROM `tasklist`\n"

    . "INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId\n"

    . "INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId \n"

    . "INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId ORDER BY ManagerId LIMIT $limit OFFSET $offset;";

    // Run a SQL query


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
