<!-- the html needs to be before the js script-->
<!DOCTYPE html><html lang="en" >
<head><meta charset="UTF-8">
 <title>DB Show Tasklist (test)</title>
 <link rel="stylesheet" href="../reports/style.css">
 <link rel="icon" href="../favicons/favicon.ico" type="image/icon type">
</head>
</body>
<div id="THId">THId div</div><div id="taskName">taskName div</div><div id="taskDesc">taskDesc div</div>

 <?php
 include_once "ConnectDb.php";
 
//51------------------------------------
// Run a SQL query of TASKS (headers)
//--------------------------------------

$taskId=$_POST['taskId'];

$taskId=3;

$sql = "SELECT * FROM tasksheader WHERE THId=$taskId";
$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
//    echo "<strong>tasksheader </strong> <p>";
//<script>document.getElementById('taskId').innerHTML='jsinsert';</script>  
//echo "<script type=\"text/javascript\">document.getElementById(\"taskId\").innerHTML=\"php\";</script>;";

echo "<h2>Tasks Table [Task Headers]</h2><p>";
echo "<table>";
    echo "<tr><th> THId </th><th>" . " TaskName </th><th>"."Description </th></tr>";
    while($row = mysqli_fetch_assoc($result)) {
    echo "<tr><td> ". $row["THId"]." </td><td> ".  $row["TaskName"] ." </td><td> ". $row["TaskDesc"]."  </td></tr> ";
$THId=$row["THId"]; $taskName=$row["TaskName"]; $TaskDesc=$row["TaskDesc"];

        /*Above task name*/

       
    } echo"</table>";

/*                                                              TEST 20:17 Tuesday  1 oct 2024 */
    
echo $THId. $taskName.$TaskDesc; /* The script below works 19:14 02 Oct 2024 but only when this .php file is loaded into the browser. The script doesn't work when this file is called from another webpage XMLHttpRequest() */
echo"<br>";
 $json='{ "THId":$THId, "TaskName":$taskName,"TaskDesc":$TaskDesc}';
echo "the json>".$json."< should be there"; //this echos the stuff to the screen without the actual values. Not what I wanted



    echo '<script>';
    echo 'var THId='.$THId.';';
    echo 'var TaskName='.json_encode($taskName).';';
    echo 'var TaskDesc='.json_encode($TaskDesc).';';
    //echo 'alert(THId);';
    echo 'document.getElementById("THId").innerHTML=THId;' ;
    echo 'document.getElementById("taskName").innerHTML=TaskName;' ;
    echo 'document.getElementById("taskDesc").innerHTML=TaskDesc;' ;
    echo '</script>';



}


// Close the connection
 mysqli_close($conn);
 ?>





</div>
</body>
</html>