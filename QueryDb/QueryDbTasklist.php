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

//16------------------------------------
// Run a SQL query of TASKSLIST (foreign keys not details)
//--------------------------------------

 echo "<h2>Tasklist: assigned tasks</h2> <h4><i>Foreign keys only. No details</i></h4><p>";
 $sql = "SELECT * FROM tasklist";
 $result = mysqli_query($conn, $sql);
 
 // Fetch the result data
 if (mysqli_num_rows($result) > 0) {
  echo "<table >";
  echo "<tr><th> TLId </th> " . "<th> StudentId </th> "."<th> ManagerId </th>" . "<th> stage </th></tr>";
    while($row = mysqli_fetch_assoc($result)) {
        echo "<tr><td> ". $row["TLId"]." </td><td> ".  $row["StudentId"] ." </td><td> ". $row["ManagerId"]." </td><td> ". $row["Stage"]." </td></tr> ";        
    }echo"</table>";
 }

// Close the connection
 mysqli_close($conn);
 ?>

</div>
</body>
</html>