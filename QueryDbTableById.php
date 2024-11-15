<?php
include '../Connect_T&M.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['keyId']) && isset($_POST['tableName']) && isset($_POST['keyName']) )  {  //could include specific key
        $key = intval($_POST['keyId']);
        $tableName = $_POST['tableName']; 
        $KeyName = $_POST['keyName'];

//        $tableName = 'members';
//        $KeyName = 'MId';        
//MEMBERS: "keyId="+ memberId +"&tableName="+"members"+"&keyName="+"MId";

        $count_query = "SELECT COUNT(*) FROM $tableName"; // table name specific
        $result = mysqli_query($conn, $count_query);
        $total_rows = mysqli_fetch_row($result)[0];
     
        //find the highest numbered entry in the
        $sql = "SELECT MId, MAX(MId) FROM $tableName;"; // table name specific
        $result = mysqli_query($conn, $count_query);
        $highest_key = mysqli_fetch_row($result)[0];

        // Adjust if necessary
       // $key = min($key, $total_rows); //never let $MId exceed the last row
        $key = max($key, 1); //error total rows can be less than the highest key



$sql = "SELECT *, (SELECT MAX($KeyName) FROM $tableName) AS maxKey FROM $tableName WHERE $KeyName = $key";



//------------------------------------
// Run the SQL query. Below is NOT identical in different functions
//------------------------------------

$result = mysqli_query($conn, $sql);
//if requested key does not exist the loop checks for a higher value & if reaches limit, it goes down to find a value 
while (mysqli_num_rows($result) == 0  ){
if($highest_key > $key) { $key++ ;} else { $key-- ;};  // table name specific
$sql = "SELECT *, (SELECT MAX($KeyName) FROM $tableName) AS maxKey FROM $tableName WHERE $KeyName = $key";
$result = mysqli_query($conn, $sql);
//$key = min($key, $total_rows); //never let $MId exceed the last row  WRONG key > rows
$key = max($key, 1);
}
    
// Fetch the result data
if (mysqli_num_rows($result) > 0) {
$row = mysqli_fetch_assoc($result);

echo json_encode($row);
} else {
//    http_response_code(500);
    echo json_encode(['error No row found ']);
}
    }else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing parameter']);
          }
    
//end of normal query & response
} else {
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);}

// Close the connection
 mysqli_close($conn);



 
 ?>