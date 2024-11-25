<?php
include '../Connect_T&M.php';
//echo "<script> alert('Hello from PHP!'); </script>";  //fails but that code works inside html
//echo "<p> <i>PHP file called: insert_taskheader.php </i> which echo:<br>";

$name = htmlspecialchars( $_POST['userName']); //odd can't change this to taskName. Error unidentified array index
//echo '<strong>'. $name . '</strong></p>';
$desc = htmlspecialchars($_POST['desc']);
//echo '<strong>'. $desc . '</strong></p>';
$author = intval($_POST['author']);
$taskFaq = $_POST['taskFaq'];
$taskFaq =filter_var($taskFaq, FILTER_VALIDATE_URL);

$sql = "SELECT * FROM `tasksheader` WHERE TaskName=? AND TaskDesc=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $name, $desc);
$stmt->execute();
$result = $stmt->get_result();
//echo $result;


if($result->num_rows > 0) echo ' That task has already been entered <br>';
else{ //try to insert the data into the db.
try{
$sql = "INSERT INTO tasksheader (`TaskName` ,`TaskDesc`,`TaskAuthor`, `TaskFaq` ) VALUES (?, ?,?,?)";
$stmt = mysqli_prepare($conn, $sql);
echo  $name, $desc,$author,$taskFaq;
// Bind parameters
mysqli_stmt_bind_param($stmt, "ssis", $name, $desc,$author,$taskFaq); //iii one for each insertion

// Execute the query
if (mysqli_stmt_execute($stmt)) {
//  echo "Record inserted successfully";


    $last_id = $conn->insert_id;
    echo "New record created successfully. Last inserted<br> last_id=" . $last_id; 
    //echo $last_id;// return fails???



} 
}catch (mysqli_sql_exception $e) { //
  echo "Error: " . $e;
  // Check for specific foreign key constraint error ( the error message is typically very long)
//  if (strpos(mysqli_stmt_error($stmt), 'constraint fails') !== false) {
          // echo '<br>constraint fails: ';
    // Check which foreign key is violated
 
  /*    if (strpos(mysqli_stmt_error($stmt), 'constraintStudentId') !== false) {
        $errorMess = "Invalid Student ID: The specified Member ID does not exist.<br>";  
        }
      if (strpos(mysqli_stmt_error($stmt), 'constraintManagerId') !== false) {
        $errorMess = "Invalid Manager ID: The specified Member ID does not exist.<br>";  
        } 
      if (strpos(mysqli_stmt_error($stmt), 'constraintTaskId') !== false) {
          $errorMess = "Invalid Task ID: The specified Task ID does not exist.<br>";
          } 
        echo $errorMess;
        */
        //else {
          //echo "Unknown foreign key constraint violation.";
     // }
  }
  
 
}




$conn->close();
?>
