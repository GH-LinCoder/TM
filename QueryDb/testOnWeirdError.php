<?php
include '../Connect_T&M.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['keyId']) && isset($_POST['tableName']) && isset($_POST['keyName']) )  {  //could include specific key
        $key = intval($_POST['keyId']); // an integer
        $tableName = $_POST['tableName']; //members or tasks or tasksstages or tasklist
        $KeyName = $_POST['keyName']; //one of MId  THId  TSId TLId


        switch ($keyName) {
            case 'MId':
            $sql = "SELECT MUserName, MId, MEmail, MDate FROM `members` WHERE $keyName=$key;";        
            break;
            case 'THId':
            $sql = "SELECT TaskName, THId, TaskDesc, TaskAuthor, TaskFaq, TaskDate FROM `tasksheader` WHERE $keyName=$key;";        
            break;
            case 'TSIId':
            $sql = "SELECT StageName, TSId, StageDesc, StageNum, TaskId, StageFaq, StageAuthor, StageDate FROM `tasksstages` WHERE $keyName=$key;";
            break;
            case 'TLIId':
            $sql = "SELECT tasksheader.TaskName,tasklist.TaskId, membersSt.MUserName AS Student, tasklist.StudentId,tasklist.Stage, membersMan.MUserName AS Manager, tasklist.ManagerId, tasklist.TLId FROM `tasklist` INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId WHERE $keyName=$key;";
            break;
            }




  $sql = "SELECT MUserName, MId, MEmail, MDate FROM `members` WHERE $KeyName=$key;";        
  $result = mysqli_query($conn, $sql);

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