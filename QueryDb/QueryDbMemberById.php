<?php
include '../Connect_T&M.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {echo json_encode(['error' => 'Method Not Allowed']);}

    elseif (!isset($_POST['keyId'])) 
    {http_response_code(400);echo json_encode(['error' => 'Missing parameter']);}

        else{         
            $key = intval($_POST['keyId']); // an integer unique reference MId. But the table may have had MId rows deleted. 
                                            //If so skip forward to next existing value of MId

           $sql = "SELECT MUserName, MId, MEmail, MDate FROM `members` WHERE MId = (SELECT MIN(MId) FROM members WHERE MId > $key-1);";        
           $result = mysqli_query($conn, $sql);
                                        //but if the requested MId exceeds the highest, display the highest that does exist

           if (mysqli_num_rows($result) == 0) { $sql = "SELECT MUserName, MId, MEmail, MDate FROM `members` WHERE MId = (SELECT MAX(MId) FROM members WHERE MId < $key);";        
               $result = mysqli_query($conn, $sql);}

           if (mysqli_num_rows($result) > 0) {$row = mysqli_fetch_assoc($result); echo json_encode($row);} else {echo json_encode(['error No row found ']);}
    
        }

    
// Close the connection
mysqli_close($conn);
?>