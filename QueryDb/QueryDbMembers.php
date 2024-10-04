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
// Run a SQL query of MEMBERS
//39------------------------------------

echo "<h2>Members Table</h2>";
$sql = "SELECT * FROM members";
$result = mysqli_query($conn, $sql);
// Fetch the result data
if (mysqli_num_rows($result) > 0) 

echo "<table>";
    echo "<tr><th> MId </th><th> MUserName </th><th> mEmail </th></tr>";
    while($row = mysqli_fetch_assoc($result)) {
        echo "<tr><td> " . $row["MId"]. " </td><td> " . $row["MUserName"]." </td><td> ". $row["MEmail"]." </td></tr>";
            } echo "</table>";


// Close the connection
 mysqli_close($conn);
 ?>

</div>
</body>
</html>