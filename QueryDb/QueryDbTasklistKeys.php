<?php
 include '../Connect_T&M.php';

//the query is different for each function file
$sql = "SELECT * FROM `tasklist`";

//------------------------------------
// Run the SQL query. Below is identical in different functions
//------------------------------------

$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
$dbData = [];
$result = mysqli_query($conn, $sql);

$i = 0;
while ($row = mysqli_fetch_assoc($result)) {
    $dbData[$i] = $row;
    $i++;
}
echo json_encode($dbData);
}
// Close the connection
 mysqli_close($conn);
 ?>