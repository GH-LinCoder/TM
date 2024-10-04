<!DOCTYPE html><html lang="en" >
<head><meta charset="UTF-8">
<title>DB Show DB (test)</title>
 <link rel="stylesheet" href="style.css">
 <link rel="icon" href="../favicons/favicon.ico" type="image/icon type">
<img
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

echo "<h1>Tasklist assigned   [foreign keys not details]</h1><p>";
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


 echo"<p>";








//--------------------------------------
// Run a SQL query of STAGES
//22------------------------------------

echo "<h1>Stages Table [tasksstages]</h1><br>";
$sql = "SELECT * FROM tasksstages";
$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
//    echo "<h1>tasksstages </h1> <p>";
    echo "TSId"."~" . "TaskId"." ~~~ " . " StageName "." ~~~ " . "StageNum"." ~~~ " . "StageDesc ". "<p>";
    while($row = mysqli_fetch_assoc($result)) {
        echo $row["TSId"]."~~~~~ ".$row["TaskId"]." ~~~ ".$row["StageName"]."~~~<b>".$row["StageNum"]."</b> ~~~ ". $row["StageDesc"]. " <br>";
//30        
    }

} else {
    echo "0 results";
}

//--------------------------------------
// Run a SQL query of MEMBERS
//39------------------------------------
echo "<p>";
echo "<h1>Members Table</h1><br>";
$sql = "SELECT * FROM members";
$result = mysqli_query($conn, $sql);
// Fetch the result data
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        echo "MId: " . $row["MId"]. "~~~  MUserName: " . $row["MUserName"]."~~~ mEmail: ". $row["MEmail"]." <br>";
            }
    echo"<p>";
}
//51------------------------------------
// Run a SQL query of TASKS (headers)
//--------------------------------------

echo "<h1>Tasks Table [Task Headers]</h1><p>";
$sql = "SELECT * FROM tasksheader";
$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
//    echo "<strong>tasksheader </strong> <p>";
    echo "THId~~~~" . " TaskName~~~~~~~~~~ "."Description" . " <p>";
    while($row = mysqli_fetch_assoc($result)) {
        echo $row["THId"]." ~~~ ".  $row["TaskName"] ."~~~". $row["TaskDesc"]." <br>";
//65        
    }
}
 echo"<p>";

//70


//73------------------------------------
// Run a SQL query of TASKSLIST (foreign keys not details)
//--------------------------------------

echo "<h1>Tasklist assigned   [foreign keys not details]</h1><p>";
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


 echo"<p>";




echo  '<a href="/projects/HomePage/">TestHome</a>';

// Close the connection
mysqli_close($conn);
?>
</body>
</html>