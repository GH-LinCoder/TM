<?php
..include('Connect_T&M.php');




// Run a SQL query
$sql = "SELECT * FROM members";
$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        echo "MId: " . $row["MId"]. " - MUserName: " . $row["MUserName"]. " <br>";
        
    }
    echo"<p>";
}

// Run a SQL query
$sql = "SELECT * FROM tasksheader";
$result = mysqli_query($conn, $sql);

// Fetch the result data
if (mysqli_num_rows($result) > 0) {
    echo "<strong>tasksheader </strong> <p>";
    echo "THId" . " TaskName " . " <p>";
    while($row = mysqli_fetch_assoc($result)) {
        echo $row["THId"]." ~~~ ".  $row["TaskName"]. " <br>";
        
    }

    
} else {
    echo "0 results";
}


echo  '<a href="/projects/HomePage/">TestHome</a>';



// Close the connection
mysqli_close($conn);


?>