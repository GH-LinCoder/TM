<?php
include '../Connect_T&M.php';
//echo "<script> alert('Hello from PHP!'); </script>";  //fails but that code works inside html
//echo "<p> <i>PHP file called: insert_taskheader.php </i> which echo:<br>";

$name = $_POST['userName']; //odd can't change this to taskName. Error unidentified array index
//echo '<strong>'. $name . '</strong></p>';
$desc = $_POST['desc'];
//echo '<strong>'. $desc . '</strong></p>';
$taskFaq = $_POST['taskFaq'];
//echo '<strong>'. $taskFaq . '</strong></p>';


/*
if (isset($_POST['taskFaq'])) {  //this was when debugging
  $taskFaq = $_POST['taskFaq'];
  echo '<strong>' . $taskFaq . '</strong></p>';
} else {
  echo '<p>Error: taskFaq is missing.</p>';
  // Log the error or send an error message to the user
  error_log("taskFaq_POST  is missing from POST data");
}*/


$author = $_POST['author'];
//echo "<strong>". $author . "</strong></p>";
//17

//$sql = "INSERT INTO `tasksheader`(`TaskName`, `TaskDesc`, `TaskAuthor`) VALUES ('$name','$desc','$author');
//SELECT LAST_INSERT_ID()
//;";

$sql ="INSERT INTO `tasksheader`(`TaskName`, `TaskDesc`, `TaskAuthor`, `TaskFaq` ) VALUES ('$name','$desc','$author','$taskFaq' );";
//echo $sql.'<br>';

if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    echo "New record created successfully. Last inserted<br> last_id=" . $last_id; 
    //echo $last_id;// return fails???
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

$conn->close();
?>