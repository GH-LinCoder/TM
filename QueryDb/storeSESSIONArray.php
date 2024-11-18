<?php
session_start();

$data = json_decode(file_get_contents('php://input'), true); //different because json

$_SESSION['array'] = $data;

echo json_encode( $_SESSION['array']);

//echo json_encode(['message' => 'Data stored successfully']);


//can sanitise with user input before storing it in the array

/*$data = array(
    'THId' => filter_var($_POST['THId'], FILTER_SANITIZE_NUMBER_INT),
    'TaskName' => htmlspecialchars($_POST['TaskName']),
    'TaskDesc' => htmlspecialchars($_POST['TaskDesc']),
    'TaskAuthor' => filter_var($_POST['TaskAuthor'], FILTER_SANITIZE_NUMBER_INT),
    'TaskFaq' => filter_var($_POST['TaskFaq'], FILTER_SANITIZE_URL), // Sanitize URL
  );
  */

  // Check if data is valid (optional)
  /*
  if (empty($data['THId']) || empty($data['TaskName'])) {
    // Handle invalid data
  } else {
    // Store the data in session or send it back to JavaScript
  }
*/
  ?>