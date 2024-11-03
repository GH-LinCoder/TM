<?php
include '../Connect_T&M.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['taskId']))  {  //could include specific key
        $key = intval($_POST['taskId']);

        $count_query = "SELECT COUNT(*) FROM `tasksheader` "; // table name specific
        $result = mysqli_query($conn, $count_query);
        $total_rows = mysqli_fetch_row($result)[0];
        

        // Adjust if necessary
        $key = min($key, $total_rows); //never let $MId exceed the last row
        $key = max($key, 1);


$sql = "SELECT * FROM tasksheader WHERE `THId`=$key;";

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