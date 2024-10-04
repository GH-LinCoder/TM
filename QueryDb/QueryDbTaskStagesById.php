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

//--------------------------------------
// Run a SQL query of STAGES
//22------------------------------------

$taskId=$_POST['taskId'];

echo "<h2>Stages Table</h2><h4><i>tasks stages</i></h4>";
$sql = "SELECT * FROM `tasksstages` WHERE TaskId=$taskId ORDER BY StageNum ASC";

$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
//    echo "<h2>tasksstages </h2> <p>";
echo "<table>";
    echo "<tr><th>TSId"." </th><th> " . "TaskId"." </th><th> " . " StageName "." </th><th> " . "StageNum"." </th><th> " . "StageDesc ". " </th></tr> ";
    while($row = mysqli_fetch_assoc($result)) {
        echo"<tr><td>". $row["TSId"]." </td><td> ".$row["TaskId"]." </td><td> ".$row["StageName"]." </td><td> <b> ".$row["StageNum"]."</b> </td><td> ". $row["StageDesc"]. "  </td></tr> ";
//30        
    } echo "</table>";

} else {
    echo "0 results";
}

// Close the connection
 mysqli_close($conn);
 ?>

</div>
</body>
</html>