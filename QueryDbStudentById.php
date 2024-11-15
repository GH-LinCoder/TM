<?php
include '../Connect_T&M.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['keyId'])) {  //could include specific key
      //  $offset = intval($_POST['offset']);
      $key = intval($_POST['keyId']);

//     below is specific to each table in 2 places
        // Validate offset and limit

$count_query = "SELECT COUNT(*) FROM `tasklist`
INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId AND tasklist.StudentId=$key
INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId 
INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;";
//   $result = mysqli_query($conn, $count_query);
//   $total_rows = mysqli_fetch_row($result)[0];
// if($count_query)  
   // Adjust limit if necessary
 //  $offset = min($offset, $total_rows-1);
 //  $limit  =min ($limit, $total_rows-$offset);

//the query is different for each function file
$sql = "SELECT tasklist.StudentId, membersSt.MUserName AS StudentName, tasklist.TaskId, tasksheader.TaskName, tasklist.Stage, tasklist.ManagerId, membersMan.MUserName AS ManagerName, tasklist.TLId\n"

    . "FROM `tasklist` \n"

    . "INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId AND tasklist.StudentId=$key\n"

    . "INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId\n"

    . "INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId ORDER BY StudentId;";

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
//echo json_encode('');
  
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing parameter']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}

// Close the connection
 mysqli_close($conn);
 ?>
