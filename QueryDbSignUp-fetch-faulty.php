<?php
include '../Connect_T&M.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = $data['email'];
    $name = $data['name'];
     
    
    //if (isset($_POST['email'])&& $_POST['name'] )  {  //could include specific key
    //    $email = $_POST['email'];
    //    $name = $_POST['name'];

//needs to clean input


//        $count_query = "SELECT COUNT(*) FROM `members` "; // table name specific
//        $result = mysqli_query($conn, $count_query);
//        $total_rows = mysqli_fetch_row($result)[0];
        

        // Adjust if necessary
       // $key = min($key, $total_rows); //never let $MId exceed the last row
       // $key = max($key, 1);


        $sql = "INSERT INTO `members`(`MEmail`, `MUserName`) VALUES ($email, $name);";

//------------------------------------
// Run the SQL query. Below is identical in different functions
//------------------------------------

$result = mysqli_query($conn, $sql);

if (mysqli_query($conn, $sql)) {
    echo json_encode(['message' => 'Data inserted successfully']);
  } else {
    http_response_code(500);
    echo json_encode(['error' => 'Error inserting data: ' . mysqli_error($conn)]);
  }

  mysqli_close($conn);
}


// Fetch the result data
/*
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
*/
// Close the connection
 mysqli_close($conn);



 
 ?>