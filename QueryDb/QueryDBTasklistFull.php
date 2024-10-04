<!DOCTYPE html><html lang="en" >
<head><meta charset="UTF-8">
 <title>DB Show Tasklist (test)</title>
 <link rel="stylesheet" href="../reports/style.css">
 <link rel="icon" href="../favicons/favicon.ico" type="image/icon type">
</head>
</body>
 <div name="stages" align="center">

 <?php
 include_once "ConnectDb.php";

//13------------------------------------
// Run a SQL query of TASKSLIST (joining other tables)
//--------------------------------------

echo "<h2>Tasklist assigned</H2><h4><i>Details from other tables</h4></i>";

$sql = "SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId, \n"

    . "tasksheader.TaskName,\n"

    . "membersSt.MUserName AS Student,\n"

    . "membersMan.MUserName AS Manager\n"

    . "FROM `tasklist`\n"

    . "INNER JOIN tasksheader ON\n"

    . "tasklist.TaskId=tasksheader.THId\n"

    . "INNER JOIN members AS membersSt  ON\n"

    . "tasklist.StudentId=membersSt.MId\n"

    . "INNER JOIN members AS membersMan ON\n"

    . "tasklist.ManagerId=membersMan.MId;";

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