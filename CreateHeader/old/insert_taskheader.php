<?php

echo "<p> <i>PHP file called: insert_taskheader.php </i> which echo:<br>";
$str = $_GET['data'];
//$str = $_POST['data'];
$str = "<strong>". $str . "</strong></p>";
echo $str;
//echo $_REQUEST['str'];

//$str = $_GET['author'];  //undefined array key "author"
//echo $str;  

?>