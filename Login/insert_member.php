<?php
include '../Connect_T&M.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    if (isset($_POST['email'])&& $_POST['name'] )  {  //could include specific key
      $email = $_POST['email'];
     $name = $_POST['name'];

echo $email. " " .$name;

//needs to clean input

$sql = "INSERT INTO `members`(`MEmail`, `MUserName`) VALUES ('$email', '$name');";

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


}

 
 ?>