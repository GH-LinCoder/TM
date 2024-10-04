<?php 
//setcookie("THId", "Test of cookie for THId",time()+120,"/");
//setcookie("TaskTitle", "Test of cookie for task title",time()+120,"/" ); 
//setcookie("TaskDesc", "description test",-time()+120,"/" );

?>

<?php
include_once "../QueryDb/ConnectDb.php";
//echo '<script>'; echo 'alert("help");';   echo '</script>';

echo "CookieTest.php ";
//$n="390";
/*                                  this does work */
//echo '<script>';
//echo 'var n='.$n.';';
//echo 'alert(n);';
//echo  'document.getElementById("panel").innerHTML="Panel" ;' ;
//echo  'document.getElementById("taskName").innerHTML='.$n.';' ;
//echo '</script>';

$taskId=$_POST['taskId'];

//$taskId=3;

$sql = "SELECT * FROM tasksheader WHERE THId=$taskId";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

echo "<h2>Tasks Table [Task Headers]</h2><p>";
echo "<table>";
    echo "<tr><th> THId </th><th>" . " TaskName </th><th>"."Description </th></tr>";
    while($row = mysqli_fetch_assoc($result)) {
    echo "<tr><td> ". $row["THId"]." </td><td> ".  $row["TaskName"] ." </td><td> ". $row["TaskDesc"]."  </td></tr> ";
    $THId=$row["THId"];
    $taskName=$row["TaskName"];  
    $taskDesc=$row["TaskDesc"];
    /*Above task name*/
    } echo"</table>";

    setcookie("THId", $THId,time()+120,"/" );
    setcookie("TaskTitle", $taskName,time()+120,"/");
    setcookie("TaskDesc", $taskDesc,time()+120,"/" ); //the setcookie seems to work, but the getcookie doesn't (except when run independently)
}

?>





<!--

<!DOCTYPE html><html lang="en" >
<head><meta charset="UTF-8">
 <title>setcookie getcookie (test)</title>
 <link rel="stylesheet" href="../reports/style.css">
 <link rel="icon" href="../favicons/favicon.ico" type="image/icon type">
</head>
<body onload=getCookies.js>
<!--div id="THId">THid</div><div id="taskName">taskname</div><div id="taskDesc">taskDesc</div-->
 


<script>/*
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


// happening too early. But the old cookies should be there. Why no output????
document.getElementById("taskName").innerHTML= getCookie("TaskTitle");

document.getElementById("taskDesc").innerHTML= getCookie("TaskDesc");

document.getElementById("THId").innerHTML= getCookie("THId");

*/
</script>



<!--script  src="./getCookies.js"></script-->


 
 </body></html>