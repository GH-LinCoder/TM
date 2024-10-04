<!DOCTYPE html><html lang="en" >
<head><meta charset="UTF-8">
 <title>DB Show Tasklist by Student (test)</title>
 <link rel="stylesheet" href="../reports/style.css">
 <link rel="icon" href="../favicons/favicon.ico" type="image/icon type">
</head>
</body>
 <div name="stages" align="center">

 <?php
 
 include_once "ConnectDb.php";


 $TLId=4; //Where should this value be assigned??
 echo "<br>PHP ....TaskByTLId()<br>";

$TLId=$_POST['TLId']; //doesn't have any value. Why?
echo "PHP TaskId: ".$TLId."<br>";
//13------------------------------------
// Run a SQL query of TASKSLIST by Task (joining other tables)
//--------------------------------------

echo "<h2>Tasklist assigned</H2><h4><i>Details from other tables</h4></i>";

$sql = "SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId,tasksheader.TaskName, membersSt.MUserName AS Student, membersMan.MUserName AS Manager FROM `tasklist`INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId AND TLId=$TLId INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;";




    $result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {

 echo "<table>";
    echo "<tr><th> TLId </th>"."<th> Task </th>". "<th> stage </th>" . "<th> Student </th> "."<th> Manager </th> </tr>"; 
    while($row = mysqli_fetch_assoc($result)) {
        echo"<tr><td>". $row["TLId"]."</td><td>". $row["TaskId"]." ". $row["TaskName"]."</td><td>". $row["Stage"]."</td><td>".  $row["StudentId"]." ".  $row["Student"] ."</td><td>".  $row["ManagerId"]." ". $row["Manager"]."</td></tr>";
//        
    } echo"</table>";
}

// Close the connection
 mysqli_close($conn);



 ?>

</div>
</body>
</html>