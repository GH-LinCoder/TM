<?php
include '../Connect_T&M.php';

//echo "<script> alert('Hello from PHP!'); </script>";  //fails but that code works inside html

echo "<p> <i>PHP file called: insert_taskheader.php </i> which echo:<br>";

//5
//echo "empty?".empty($_POST)."<";

$name = $_POST['userName']; //odd can't change this to taskName. Error unidentified array index
echo '<strong>'. $name . '</strong></p>';

//11
$desc = $_POST['desc'];
echo '<strong>'. $desc . '</strong></p>';

$author = $_POST['author'];
echo "<strong>". $author . "</strong></p>";
//17

//$sql = "INSERT INTO `tasksheader`(`TaskName`, `TaskDesc`, `TaskAuthor`) VALUES ('$name','$desc','$author');
//SELECT LAST_INSERT_ID()
//;";

$sql ="INSERT INTO `tasksheader`(`TaskName`, `TaskDesc`, `TaskAuthor`) VALUES ('$name','$desc','$author');";
echo $sql.'<br>';

echo ($conn->query($sql));


if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    echo "New record created successfully. Last inserted<br> last_id=" . $last_id; 
    //echo $last_id;// return fails???
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }






  ///test try to get value into js

//echo "<script>last_id=".$last_id."</script>";
//Try to echo script to write to 'panel"

//echo  '<script> document.getElementById("panel").innerHTML+="<i>Last_id=</i>"'.$last_id.'</script>'; //nothing shows up

//if ($conn->query($sql) === TRUE) {echo 'record created successfully';} 
//+else {echo 'Error: ' . $sql . '<br>' . $conn->error;};
//24
$conn->close();

?>