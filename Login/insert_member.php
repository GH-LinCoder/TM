<?php
include '../Connect_T&M.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    if (isset($_POST['email'])&& $_POST['name'] )  {  //could include specific key
      $email =mysqli_real_escape_string($conn, $_POST['email']);
     $name = mysqli_real_escape_string ($conn, $_POST['name']);

//needs to check validity of inputs


echo $email. " " .$name;

//needs to clean input



$sql = "INSERT INTO `members` (`MEmail`, `MUserName`) VALUES (?, ?)";
$stmt = mysqli_prepare($conn, $sql);

// Bind parameters
mysqli_stmt_bind_param($stmt, "ss", $email, $name);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(['message' => 'Data inserted successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error inserting data: ' . mysqli_stmt_error($stmt)]);
}

mysqli_stmt_close($stmt);
} else {
http_response_code(400);
echo json_encode(['error' => 'Missing required parameters']);
}

mysqli_close($conn);
}

 
 ?>