<?php
include '../Connect_T&M.php';
        //echo "<p> <i>PHP file called: insert_assignTask.php </i> which could echo:<br>";
$errorMess='';

/*
$taskTHId = intval( $_POST['taskTHId']);
        //echo "<strong>". $taskTHId . "</strong></p>";
$stage=1; //default new assignments start at stage 1
$studentId = intval( $_POST['studentId']);
        //echo "<strong>". $studentId . "</strong></p>";
$managerId = intval( $_POST['managerId']);
        //echo "<strong>". $managerId . "</strong></p>";

//Is this selection of student & task aready assigned? (Is it in the db?)
$sql = "SELECT * FROM `tasklist` WHERE TaskId=$taskTHId AND StudentId=$studentId AND ManagerId=$managerId;";

$result = $conn->query($sql);
*/

$taskTHId = intval($_POST['taskTHId']);
$stage = 1;
$studentId = intval($_POST['studentId']);
$managerId = intval($_POST['managerId']);

$sql = "SELECT * FROM `tasklist` WHERE TaskId=? AND StudentId=? AND ManagerId=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iii", $taskTHId, $studentId, $managerId); //i for integer, s for string, b for blob, d for double
$stmt->execute();

$result = $stmt->get_result();

if($result->num_rows > 0) echo ' That student has already been assigned to that task <br>';
else{ //try to insert the data into the db. If any of the Id don't exist in the db tehere will be a constraint error thrown
try{
$sql = "INSERT INTO tasklist (`Taskid` ,`Stage`, `StudentId`, `ManagerId`) VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);

// Bind parameters
mysqli_stmt_bind_param($stmt, "iiii", $taskTHId, $stage, $studentId, $managerId); //iiii one for each insertion

// Execute the query
if (mysqli_stmt_execute($stmt)) {
  echo "Record inserted successfully";
} 
}catch (mysqli_sql_exception $e) { //this could be a constraint error because the studentId or ManagerId or taskId don't exist
//The error only delivers first error. So can't concatenate them .= when multiple errors. And Db gives task error first
 
  // Check for specific foreign key constraint error ( the error message is typically very long)
  if (strpos(mysqli_stmt_error($stmt), 'constraint fails') !== false) {
          // echo '<br>constraint fails: ';
    // Check which foreign key is violated
 
      if (strpos(mysqli_stmt_error($stmt), 'constraintStudentId') !== false) {
        $errorMess = "Invalid Student ID: The specified Member ID does not exist.<br>";  
        }
      if (strpos(mysqli_stmt_error($stmt), 'constraintManagerId') !== false) {
        $errorMess = "Invalid Manager ID: The specified Member ID does not exist.<br>";  
        } 
      if (strpos(mysqli_stmt_error($stmt), 'constraintTaskId') !== false) {
          $errorMess = "Invalid Task ID: The specified Task ID does not exist.<br>";
          } 
        echo $errorMess;
        //else {
          //echo "Unknown foreign key constraint violation.";
     // }
  } else {
      // other errors??
  }
  echo "Error: " . mysqli_stmt_error($stmt);
}
}
$conn->close();
?>