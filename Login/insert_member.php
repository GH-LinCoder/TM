<?php
include '../Connect_T&M.php';
$errorMess='';
$maxLength=20;//prevent very long user names
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    if (isset($_POST['email'])&& $_POST['name'] )  {  //could include specific key
      $email =mysqli_real_escape_string($conn, $_POST['email']);
     $name = mysqli_real_escape_string ($conn, $_POST['name']);
$name = substr($name, 0, $maxLength);//limit to 15 chars length
$name = str_replace(" ", "_", $name);//remove spaces insert underscore
//needs to check validity of inputs


//echo $email. " " .$name;

//Check if already in Db

$sql = "SELECT * FROM `members` WHERE MEmail=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email); //i for integer, s for string, b for blob, d for double
$stmt->execute();

$result = $stmt->get_result();


if($result->num_rows > 0) echo ' That email <b>'.$email .'</b> is already in the database <br>';
else {
    $sql = "SELECT * FROM `members` WHERE MUserName=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $name); //i for integer, s for string, b for blob, d for double
    $stmt->execute();
    
    $result = $stmt->get_result();

    if($result->num_rows > 0) echo ' That user name <b>'.$name .'</b>  is already in the database <br>';
else {
    $sql = "INSERT INTO `members` (`MEmail`, `MUserName`) VALUES (?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    
    // Bind parameters
    mysqli_stmt_bind_param($stmt, "ss", $email, $name);
    //$stmt->execute();
    
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(['message' => 'New member added successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error inserting data: ' . mysqli_stmt_error($stmt)]);
    }
}
}

mysqli_stmt_close($stmt);
} else {
http_response_code(400);
echo json_encode(['error' => 'Missing required parameters']);
}

mysqli_close($conn);
}

 
 ?>