<?php
include_once "../QueryDb/ConnectDb.php";

echo "CookieTest.php ";

$taskId=$_POST['taskId'];

//$taskId=3;

$sql = "SELECT * FROM tasksheader WHERE THId=$taskId";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

echo "<h2>Tasks Table [Task Headers]</h2><p>";
echo "<table>";
    echo "<tr><th> THId </th><th>" . " TaskName </th><th>"."Description </th></tr>";
    while($row = mysqli_fetch_assoc($result)) {
    echo "<tr><td> ". $row["THId"]." </td><td> ".  $row["TaskName"] ." </td><td> ". $row["TaskDesc"]."  </td></tr> ";
    $THId=$row["THId"];
    $taskName=$row["TaskName"];  
    $taskDesc=$row["TaskDesc"];
    /*Above task name*/
    } echo"</table>";

    setcookie("THId", $THId,time()+120,"/" );// the "/" makes cookie available to any page
    setcookie("TaskTitle", $taskName,time()+120,"/");
    setcookie("TaskDesc", $taskDesc,time()+120,"/" ); 
}

?>