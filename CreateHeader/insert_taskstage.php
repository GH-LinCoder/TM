<?php
include '../Connect_T&M.php'; //nov 25 this does insert in stages, but doesn't check that any of the data makes sense. Also should use prepared statements
echo "<p> <i>PHP file called: insert_taskstage.php </i> which echo:<br>";
//
//5
//echo "empty?".empty($_POST)."<";

$stage_name = htmlspecialchars( $_POST['stage_name']);
echo "<strong>". $stage_name . "</strong></p>";
//10
$stage_description = htmlspecialchars( $_POST['stage_description']);
echo "<strong>". $stage_description . "</strong></p>";

$stage_number = intval($_POST['stagen']);
echo "<strong>". $stage_number . "</strong></p>";

$task_THId = intval($_POST['task_THId']);
echo "<strong>". $task_THId . "</strong></p>";

$stage_author = htmlspecialchars( $_POST['stage_author']);
echo "<strong>". $stage_author . "</strong></p>";
//22

$sql = "SELECT * FROM `tasksstages` WHERE taskid=? AND StageNum=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $task_THId, $stage_number); //i for integer, s for string, b for blob, d for double
$stmt->execute();

$result = $stmt->get_result();



if($result->num_rows > 0) echo ' That stage has already been added to that task <br>';
else{ //try to insert the data into the db. If any of the Id don't exist in the db tehere will be a constraint error thrown
try{ 
$sql = "INSERT INTO `tasksstages`(`taskid` ,`StageNum`, `stageName`, `stageDesc`, `stageAuthor`) VALUES (?, ?, ?, ?,?)";
$stmt = mysqli_prepare($conn, $sql);
// Bind parameters
mysqli_stmt_bind_param($stmt, "iissi", $task_THId, $stage_number, $stage_name, $stage_description, $stage_author); //iiii one for each insertion

// Execute the query
if (mysqli_stmt_execute($stmt)) {
  //  echo "Record inserted successfully";
      $last_id = $conn->insert_id;
      echo "New record created successfully. Last inserted<br> last_id=" . $last_id; 
      //echo $last_id;// return fails???
  }
}catch (mysqli_sql_exception $e) {

  // Check for specific foreign key constraint error ( the error message is typically very long)
if (strpos(mysqli_stmt_error($stmt), 'constraint fails') !== false) {
          // echo '<br>constraint fails: ';
    // Check which foreign key is violated
 
  if (strpos(mysqli_stmt_error($stmt), 'TaskOfStage') !== false) {
        $errorMess = "Invalid Task ID: The specified Task ID does not exist.<br>";  
        }
      if (strpos(mysqli_stmt_error($stmt), 'StageAuthor') !== false) {
        $errorMess = "Invalid Manager ID: The specified Member ID does not exist.<br>";  
        } 
        echo $errorMess;
      
        //else {
          //echo "Unknown foreign key constraint violation.";
     // }




  echo $e;
}
}
}

  $conn->close();
?>
