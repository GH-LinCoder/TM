<?php
include '../Connect_T&M.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['rowKey']) )  {  //
        $key = intval($_POST['rowKey']);
     
        $count_query = "SELECT COUNT(*) FROM `tasksstages` WHERE TaskId=$key"; // table name specific
        $result = mysqli_query($conn, $count_query);
        $total_rows = mysqli_fetch_row($result)[0];

        if($total_rows<1){echo json_encode($total_rows);} 
 else{


        //find the highest numbered entry in the
//        $sql = "SELECT THId, MAX(TH) FROM $tableName;"; // table name specific
 //       $result = mysqli_query($conn, $count_query);
 //       $highest_key = mysqli_fetch_row($result)[0];

        // Adjust if necessary
       // $key = min($key, $total_rows); //never let $MId exceed the last row
        $key = max($key, 1); //error total rows can be less than the highest key


$sql = "SELECT * FROM `tasksstages` WHERE TaskId=$key ORDER BY StageNum ASC";
//------------------------------------
// Run the SQL query. Below is identical in different functions
//------------------------------------

$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
$dbData = [];
//$result = mysqli_query($conn, $sql);//why repeated?

$i = 0;
while ($row = mysqli_fetch_assoc($result)) {
    $dbData[$i] = $row;
    $i++;
}
echo json_encode($dbData);
}
//end of normal query & response
    }  
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing offset or limit parameter']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}

//}
// Close the connection
 mysqli_close($conn);
 ?>
    

  