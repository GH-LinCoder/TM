<?php
include_once "../QueryDb/ConnectDb.php";

echo "..StagesCard.php ";

$taskId=$_POST['taskId'];

//$taskId=3;


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

$cookieName= "Task". $row["TaskId"] ."Stages".$row["StageNum"];//odd only seeing three cookies in js
$cookieData=json_encode($row["StageName"].$row["StageDesc"]); //changed from sending entire $rows[]

echo $cookieName." ".$cookieData;

setcookie($cookieName, $cookieData,time()+60,"/" );// the "/" makes cookie available to any page

 //     $rows[]= $row; //added from stack exchange //this includes all columns of table.. may not be needed
      //$rows[]="&"; //trying to separate the rows-the encoded is a string which I can't access
 //   $taskId=$row["TaskId"];
    } echo "</table>";
//    $cookieData=json_encode($rows);
  //     $title="StagesForTask".  $taskId;

    
//echo $title;   
      // echo $cookieData;

 //      setcookie($title, $cookieData,time()+120,"/" );// the "/" makes cookie available to any page
    //can't set array so can't send $rows
} else {
    echo "0 results";
}

// Close the connection
 mysqli_close($conn);
 ?>