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

//51------------------------------------
// Run a SQL query of TASKS (headers)
//--------------------------------------

echo "<h2>Tasks Table [Task Headers]</h2><p>";
$sql = "SELECT * FROM tasksheader";
$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
//    echo "<strong>tasksheader </strong> <p>";

echo "<table>";
    echo "<tr><th> THId </th><th>" . " TaskName </th><th>"."Description </th></tr>";
    while($row = mysqli_fetch_assoc($result)) {
        echo "<tr><td> ". $row["THId"]." </td><td> ".  $row["TaskName"] ." </td><td> ". $row["TaskDesc"]."  </td></tr> ";
//65        
    } echo"</table>";
}


// Close the connection
 mysqli_close($conn);
 ?>

</div>
</body>
</html>