<?php
/*
total_entriesVery important that the ` is the top left key on keyboard.
If use the ' (which is on right hand side with @, the SELECT doesn't work.
Only use around table names NOT when refering to a table.column  ! 
(The error message will say "Unknown column in field list"

ALTER TABLE `tasksstages` CHANGE `StageDate` `StageDate` TIMESTAMP NOT NULL;
*/



//prepared statements

//SELECT

$stmt = $db->prepare('SELECT * FROM users where name = ? where id = ?');
$stmt->bind_param('si', $name, $id);
$stmt->execute();


//INSERT

$stmt = $db->prepare("INSERT INTO foo (firstname, lastname, email) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $firstname, $lastname, $email);
$stmt->execute();



//getting last ID source w3 (not what the manual says)

if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    echo "New record created successfully. Last inserted ID is: " . $last_id;
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }


//SELECT MId, MAX(MId) FROM members;
$sql = "SELECT MId, MAX(MId) FROM members;";

//SELECT * FROM `tasksstages` LIMIT 4 OFFSET 3;
$sql = "SELECT * FROM `tasksstages` LIMIT 4 OFFSET 3;";


//get all of tasks & StageDesc

//SELECT * FROM `tasksheader` CROSS JOIN `tasksstages`; //but this gave 55 rows when there are only 8 + 8 =16 total rows

$sql = "SELECT * FROM `tasksheader` CROSS JOIN `tasksstages`;";

//use two calls?
$sql = "SELECT * FROM `tasksheader`";

$sql = "SELECT * FROM `tasksstages`;"





//Students (all) with id + names + task & name + stage + manager & name

SELECT tasklist.TLId, tasklist.TaskId, tasksheader.TaskName, tasklist.Stage, tasklist.StudentId, membersSt.MUserName AS StudentName, tasklist.ManagerId, membersMan.MUserName AS ManagerName 
FROM `tasklist`
INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId
INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId 
INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;

$sql = "SELECT tasklist.TLId, tasklist.TaskId, tasksheader.TaskName, tasklist.Stage, tasklist.StudentId, membersSt.MUserName AS StudentName, tasklist.ManagerId, membersMan.MUserName AS ManagerName \n"
    . "FROM `tasklist`\n"
    . "INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId\n"
    . "INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId \n"
    . "INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;";






//count of all tables & unique students & managers

//finally got something working aI & I (neither did it alone)


$sql = "SELECT\n"

    . "  (SELECT COUNT(DISTINCT MId) FROM members) AS countMembers,\n"

    . "  (SELECT COUNT(DISTINCT THId) FROM tasksheader) AS countTasksheaders,\n"

    . "  (SELECT COUNT(DISTINCT TSId) FROM tasksStages) AS countTasksStages,\n"

    . "  (SELECT COUNT(DISTINCT TLId) FROM taskList) AS countTaskList,\n"

    . "  (SELECT COUNT(DISTINCT studentId) FROM taskList) AS countStudents,\n"

    . "  (SELECT COUNT(DISTINCT TaskAuthor) FROM tasksheader) AS countAuthors,\n"

    . "  (SELECT COUNT(DISTINCT managerId) FROM taskList) AS countManagers;";

//The above produces single associative array that works.



Tasklist with details
SELECT 
tasklist.TLId, 
tasklist.TaskId,
tasksheader.TaskName,
tasklist.Stage, 
tasklist.StudentId, 
membersSt.MUserName AS Student,
tasklist.ManagerId,
membersMan.MUserName AS Manager


FROM `tasklist`
INNER JOIN tasksheader ON
tasklist.TaskId=tasksheader.THId
INNER JOIN members AS membersSt  ON
tasklist.StudentId=membersSt.MId
INNER JOIN members AS membersMan ON
tasklist.ManagerId=membersMan.MId;

$sql = "SELECT \n"

    . "tasklist.TLId, \n"

    . "tasklist.TaskId,\n"

    . "tasksheader.TaskName,\n"

    . "tasklist.Stage, \n"

    . "tasklist.StudentId, \n"

    . "membersSt.MUserName AS Student,\n"

    . "tasklist.ManagerId,\n"

    . "membersMan.MUserName AS Manager\n"

    . "\n"

    . "\n"

    . "FROM `tasklist`\n"

    . "INNER JOIN tasksheader ON\n"

    . "tasklist.TaskId=tasksheader.THId\n"

    . "INNER JOIN members AS membersSt  ON\n"

    . "tasklist.StudentId=membersSt.MId\n"

    . "INNER JOIN members AS membersMan ON\n"

    . "tasklist.ManagerId=membersMan.MId;";






/*
My code works but doesn't include the names AS
SELECT
COUNT(*) AS countMembers FROM members
UNION ALL
SELECT COUNT(DISTINCT StudentId)FROM tasklist AS countStudents
UNION ALL
SELECT COUNT(DISTINCT ManagerId) FROM tasklist AS countManagers
UNION ALL
SELECT COUNT(DISTINCT TaskAuthor) FROM tasksheader AS countAuthors
UNION ALL
SELECT COUNT(*) AS countTasksheaders FROM tasksheader
UNION ALL
SELECT COUNT(*) AS countTasksStages FROM tasksstages
UNION ALL
SELECT COUNT(*) AS countTaskList FROM tasklist;
*/


$sql = "SELECT\n"

    . "COUNT(*) AS countMembers FROM members\n"

    . "UNION ALL\n"

    . "SELECT COUNT(DISTINCT StudentId)FROM tasklist AS countStudents\n"

    . "UNION ALL\n"

    . "SELECT COUNT(DISTINCT ManagerId) FROM tasklist AS countManagers\n"

    . "UNION ALL\n"

    . "SELECT COUNT(DISTINCT TaskAuthor) FROM tasksheader AS countAuthors\n"

    . "UNION ALL\n"

    . "SELECT COUNT(*) AS countTasksheaders FROM tasksheader\n"

    . "UNION ALL\n"

    . "SELECT COUNT(*) AS countTasksStages FROM tasksstages\n"

    . "UNION ALL\n"

    . "SELECT COUNT(*) AS countTaskList FROM tasklist;";




$sql = "SELECT COUNT(*) FROM `tasksstages`;";




/*
This AI code - doesn't do what I wanted, but does have the associated array

SELECT
    COUNT(members.MId) AS countMembers,
    COUNT(tasksheader.THId) AS countTasksheaders,
    COUNT(tasksStages.TSId) AS countTasksStages,
    COUNT(taskList.TLId) AS countTaskList,
    COUNT(DISTINCT taskList.studentId) AS uniqueStudents,
    COUNT(DISTINCT taskList.managerId) AS uniqueManagers
FROM members
LEFT JOIN taskList ON members.MId = taskList.studentId
LEFT JOIN tasksheader ON tasksheader.THId = taskList.TLId
LEFT JOIN tasksStages ON tasksStages.TSId = taskList.TLId;

php version  
*/
$sql = "SELECT\n"

    . "    COUNT(members.MId) AS countMembers,\n"

    . "    COUNT(tasksheader.THId) AS countTasksheaders,\n"

    . "    COUNT(tasksStages.TSId) AS countTasksStages,\n"

    . "    COUNT(taskList.TLId) AS countTaskList,\n"

    . "    COUNT(DISTINCT taskList.studentId) AS uniqueStudents,\n"

    . "    COUNT(DISTINCT taskList.managerId) AS uniqueManagers\n"

    . "FROM members\n"

    . "LEFT JOIN taskList ON members.MId = taskList.studentId\n"

    . "LEFT JOIN tasksheader ON tasksheader.THId = taskList.TLId\n"

    . "LEFT JOIN tasksStages ON tasksStages.TSId = taskList.TLId;";







$sql = "UPDATE `members` SET `MEmail` = \'dev@TandM.com\', `MUserName` = \'LoneDeveloper\' WHERE `members`.`MId` = 1;";
UPDATE `members` SET `MEmail` = 'dev@TandM.com', `MUserName` = 'LoneDeveloper' WHERE `members`.`MId` = 1;


$sql = "SELECT COUNT(TSId) FROM `tasksstages` WHERE 1;";
SELECT COUNT(TSId) FROM `tasksstages` WHERE 1;


$sql = "SELECT * FROM `tasksheader`;";  (the whole of a table)
SELECT * FROM `tasksheader`;

$sql = "SELECT `THId`,`TaskName` FROM `tasksheader`;";
SELECT `THId`,`TaskName` FROM `tasksheader`;



$sql = "SELECT * FROM `tasklist` WHERE `TLId` = 5;";

SELECT * FROM `tasklist` WHERE `TLId` = 5;   is same thing in SQL



$sql = "SELECT * FROM `tasklist` WHERE `TaskId` =3;";

SELECT * FROM `tasklist` WHERE `TaskId` =3;



$sql = "SELECT * FROM `tasksstages` WHERE `TaskId`=2;";
SELECT * FROM `tasksstages` WHERE `TaskId`=2;


$sql = "SELECT `TSId`,`TaskId`,`StageName`,`StageDesc`,`StageAuthor`   FROM `tasksstages`\n"

    . "WHERE `TaskId`=3;";

SELECT `TSId`,`TaskId`,`StageName`,`StageDesc`,`StageAuthor` FROM `tasksstages` WHERE `TaskId`=3;


Using foreign key to find extra info from 2nd table
SELECT tasksheader.THId, tasksheader.TaskName, members.MUserName  AS AUTHORS   FROM `tasksheader`, `members`
WHERE tasksheader.TaskAuthor=members.MId

$sql = "SELECT tasksheader.THId, tasksheader.TaskName, members.MUserName  AS AUTHORS 
FROM `tasksheader`, `members` WHERE tasksheader.TaskAuthor=members.MId;";


Display content of tasklist + taskname from taskheader
SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId, 
tasksheader.TaskName   
FROM `tasklist`
INNER JOIN tasksheader ON
tasklist.TaskId=tasksheader.THId;

how to also display student from members???


Full display of Tasklist: (including the actual contents)

SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId, 
tasksheader.TaskName, membersSt.MUserName AS Student, membersMan.MUserName AS Manager 
FROM `tasklist` 
INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId 
INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId 
INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;

$sql = "SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId, \n"

    . "tasksheader.TaskName,\n"

    . "membersSt.MUserName AS Student,\n"

    . "membersMan.MUserName AS Manager\n"

    . "FROM `tasklist`\n"

    . "INNER JOIN tasksheader ON\n"

    . "tasklist.TaskId=tasksheader.THId\n"

    . "INNER JOIN members AS membersSt  ON\n"

    . "tasklist.StudentId=membersSt.MId\n"

    . "INNER JOIN members AS membersMan ON\n"

    . "tasklist.ManagerId=membersMan.MId;";


Task list for specific student

SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId, 
tasksheader.TaskName, membersSt.MUserName AS Student, membersMan.MUserName AS Manager 
FROM `tasklist`
INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId
INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId AND StudentId="2"
INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;

$sql = "SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId, \n"

    . "tasksheader.TaskName, membersSt.MUserName AS Student, membersMan.MUserName AS Manager \n"

    . "FROM `tasklist`\n"

    . "INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId\n"

    . "INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId AND StudentId=\"5\"\n"

    . "INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;";

Put data in taskheader
INSERT INTO `tasksheader`(`TaskName`, `TaskDesc`, `TaskAuthor`) 
VALUES ('[value-2]','[value-3]','[value-4]');
$sql = "INSERT INTO `tasksheader`(`TaskName`, `TaskDesc`, `TaskAuthor`) VALUES ('[value-2]','[value-3]','[value-4]')";

INSERT INTO `members`(`MEmail`, `MUserName`) VALUES ('jpoj34@thrup.zu','JayPodj');
$sql = "INSERT INTO `members`(`MEmail`, `MUserName`) VALUES (\'jpoj34@thrup.zu\',\'JayPodj\');";


Tasklist by tasklist number TLId
SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId,tasksheader.TaskName, membersSt.MUserName AS Student, membersMan.MUserName AS Manag FROM `tasklist`INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId AND TLId='3' INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;
$sql = "SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId,tasksheader.TaskName, membersSt.MUserName AS Student, membersMan.MUserName AS Manag FROM `tasklist`INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId AND TLId=\'3\' INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;";

Tasklist by task number TaskId
SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId,tasksheader.TaskName, membersSt.MUserName AS Student, membersMan.MUserName AS Manag FROM `tasklist`INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId AND TaskId='3' INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;
$sql = "SELECT tasklist.TLId, tasklist.TaskId,tasklist.Stage, tasklist.StudentId, tasklist.ManagerId,tasksheader.TaskName, membersSt.MUserName AS Student, membersMan.MUserName AS Manag FROM `tasklist`INNER JOIN tasksheader ON tasklist.TaskId=tasksheader.THId AND TaskId=\'3\' INNER JOIN members AS membersSt ON tasklist.StudentId=membersSt.MId INNER JOIN members AS membersMan ON tasklist.ManagerId=membersMan.MId;";


INSERT INTO `tasksstages` (`TaskId`,`StageNum`,`StageName`,`StageDesc`,`StageAuthor`)  VALUES ('2','2','Losing hope','How to struggle','2');

UPDATE
UPDATE `tasksstages` SET `TaskId` = '115' WHERE `tasksstages`.`TSId` = 34;

UPDATE `tasksstages` SET `StageName` = 'Email student', `StageDesc` = 'Email confirmation to be sent to the student that the task has been assigned.' WHERE `tasksstages`.`TSId` = 9;



?>