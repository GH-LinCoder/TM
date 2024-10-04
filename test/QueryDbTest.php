<!DOCTYPE html><html lang="en" >
<head><meta charset="UTF-8">
<title>DB Show DB (test)</title>
 <link rel="stylesheet" href="../reports/style.css">
 <link rel="icon" href="../favicons/favicon.ico" type="image/icon type">
</head>
<body>

<div name="stages"></div>
<div name="members"></div>
<div name="tasks"></div>
<div name="assigned"></div>


<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "task&member";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully<p>";
//15

//73------------------------------------
// Run a SQL query of TASKSLIST (foreign keys not details)
//--------------------------------------

echo "<h2>Tasklist assigned   [foreign keys not details]</h2><p>";
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


echo"<p>";
//------------------------------------
// Run a SQL query of TASKSLIST (joining other tables)
//--------------------------------------

echo "<h2>Tasklist assigned [Details from other tables]</h2><p>";

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
    echo "<tr><th> TLId </th>"."<th> TaskName </th>" . "<th> StudentName </th> "."<th> ManagerName </th> " . "<th> stage </th></tr>";
    while($row = mysqli_fetch_assoc($result)) {
        echo"<tr><td>". $row["TLId"]."</td><td>".  $row["TaskName"]."</td><td>".  $row["Student"] ."</td><td>". $row["Manager"]."</td><td>". $row["Stage"]."</td></tr>";
//        
    } echo"</table>";
}


 echo"<p>";

//--------------------------------------
// Run a SQL query of STAGES
//22------------------------------------

echo "<h2>Stages Table [tasksstages]</h2><br>";
$sql = "SELECT * FROM tasksstages";
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

//--------------------------------------
// Run a SQL query of MEMBERS
//39------------------------------------
echo "<p>";
echo "<h2>Members Table</h2><br>";
$sql = "SELECT * FROM members";
$result = mysqli_query($conn, $sql);
// Fetch the result data
if (mysqli_num_rows($result) > 0) 

echo "<table>";
    echo "<tr><th> MId </th><th> MUserName </th><th> mEmail </th></tr>";
    while($row = mysqli_fetch_assoc($result)) {
        echo "<tr><td> " . $row["MId"]. " </td><td> " . $row["MUserName"]." </td><td> ". $row["MEmail"]." </td></tr>";
            } echo "</table>";



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
 echo"<p>";

//70

/*
//73------------------------------------
// Run a SQL query of TASKSLIST (foreign keys not details)
//--------------------------------------

echo "<h2>Tasklist assigned   [foreign keys not details]</h2><p>";
$sql = "SELECT * FROM tasklist";
$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
//    echo "<strong>tasklist </strong> <p>";
    echo "TLId~ " . " StudentId~ "."ManagerId~ " . "stage <p>";
    while($row = mysqli_fetch_assoc($result)) {
        echo $row["TLId"]." ~~~~~~ ".  $row["StudentId"] ."~~~~~~". $row["ManagerId"]."~~~~~~". $row["Stage"]."<br>";
//        
    }
}


echo"<p>";
//------------------------------------
// Run a SQL query of TASKSLIST (joining other tables)
//--------------------------------------

echo "<h1>Tasklist assigned [Details from other tables]</h1><p>";

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
//    echo "<strong>tasklist </strong> <p>";
    echo "TLId~ "."TaskName" . " StudentName~ "."ManagerName~ " . "stage <p>";
    while($row = mysqli_fetch_assoc($result)) {
        echo $row["TLId"]."~".  $row["TaskName"]."~".  $row["Student"] ."~". $row["Manager"]."~". $row["Stage"]."<br>";
//        
    }
}

*/
 echo"<p>";




echo  '<a href="/projects/HomePage/">TestHome</a>';

// Close the connection
mysqli_close($conn);
?>
</body>
</html>