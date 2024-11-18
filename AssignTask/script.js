let prism = document.querySelector(".rec-prism");
const logToConsole=true;
//const logToConsole=false; 

console.log('assigntask.html')


function showAssign(){
  if(logToConsole) console.log('showAssign()');
  prism.style.transform = "translateZ(-100px)";
  document.getElementById("panel").innerHTML="If you have permission you can select someone to do a task.<br> That person is called <i>student</i>";

}

function showEdit(){
  if(logToConsole) console.log('showEdit()');
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  document.getElementById("panel").innerHTML="If you have permission you can edit the details of who is assigned to the task<br>Change the student , the task or the manager here.";

}

function showProgressStudent(){
  if(logToConsole) console.log('showProgressStudent()');
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  document.getElementById("panel").innerHTML="If you have permission you can change which stage of the task the student is in.<br>You click the move back/forward buttons to place the student in the relevant stage (step or lesson).";
}

function showSelectTask(){
  if(logToConsole) console.log('showSelectTask()');
  prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
  document.getElementById("panel").innerHTML="Search the full list of tasks<br> or those persons who are currently students of tasks,<br> or managers of tasks,<br> or who have authored a task<br>.";
}

function showManage(){
  if(logToConsole) console.log('showManage()');
  prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
  document.getElementById("panel").innerHTML="Can't talk now, lots to do";

}

function showThankYou(){
  if(logToConsole) console.log('showThankyou()');
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
}


///////////////////////////////////////////////////                                         get id (student, task, manager)

function getStudentId() {
  if(logToConsole) console.log('getSudentId()');
  // needs to call the member display and have that return the clicked value. 
  // have the member display show the card for each item?
  // MId card for student
  // THId card for task
  //MId card for manager
  //somehow store those three values & return them for assignment
//functions are in script for dashboard (summary)
  //script.js:1296 

let assignment={
  student: '',
  task:'',
  manager:''}; // place in it student, task & manager Ids

//dsiplay a member list  
makeListVisible(); //the buttons & floating panels are not included in this page
//script.js:322 
showMembers();
//script.js:194 
fetchDb();
//script.js:186 
calculateLimitOffset();
//script.js:1304 
displayOnList(); //has rowData

//click the memeber chosen

//script.js:519 
//chooseWhichCardToUse();//this would delete old cards
//script.js:520 \{MId: '3', MEmail: 'brisia300@lodo.es', MUserName: 'Brisia', MDate: '2024-10-10 20:38:37'\}MDate: "2024-10-10 20:38:37"MEmail: "brisia300@lodo.es"MId: "3"MUserName: "Brisia"[[Prototype]]: Object
//script.js:536 MId

//script.js:455 
makeCardsVisible();
//script.js:546 
buildNewCard(rowData)();//doesn't delete old card. so can display 3 at once ? But rowData undefined here?
//script.js:552 
DisplayOnCard(); //??
//Clicked row: \{MId: '3', MEmail: 'brisia300@lodo.es', MUserName: 'Brisia', MDate: '2024-10-10 20:38:37'\}  Number of columns= 4
//script.js:1941 
showTaskColor();
//get that MId; from the object & put into assignment{}

}





/*                   call server functions                 */

function assignTask(){
  if(logToConsole) console.log('AssignTask()');
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";

  /* read form input & create string of associated array  label=value   to send to server*/
  var str, 
  studentId= encodeURIComponent(document.getElementById("studentId").value) , 
  taskTHId=  encodeURIComponent(document.getElementById("taskTHId").value), 
  managerId= encodeURIComponent(document.getElementById("managerId").value);
  //stageText= encodeURIComponent(document.getElementById("stageText").value);
  
  document.getElementById("panel").innerHTML="js assignTask "; 
  str="studentId="+ studentId;
  str+="&taskTHId="+ taskTHId;
  str+="&managerId="+ managerId;
  //str+="&stageText="+stageText;
  
  document.getElementById("panel").innerHTML="js createStage has str=<br>  "+str +"<p>";
  /* string prepared to send to server. Has been displayed in 'panel' for user feedback */
  
  /*Open request to server*/
  
  var request= new XMLHttpRequest();
  var last_id; /*To store id of the assignment inserted in the tasklist table */
  
  request.onreadystatechange = function() {
  
    if (this.readyState == 4 && this.status == 200){
    
    document.getElementById("panel").innerHTML+="<br> CreateTaskheader, this.responseText:<br> "+ request.responseText +"<br>";
    var str2= document.getElementById("panel").innerHTML;
    var found =str2.indexOf("id");
    document.getElementById("panel").innerHTML+="JS Position of last_id:"+found+"<br>";//does nothing when includes +found if outside this asynchronous function
    last_id=str2.slice(found+3);
    document.getElementById("panel").innerHTML+=last_id;//+3 to ignore  id=
  } 
     
  }
  
    //need to prevent send if missing input (need to validate the input NOT YET IMPLEMENTED)
    if (studentId=="" || taskTHId=="" || managerId=="") { 
      document.getElementById("panel").innerHTML="Can't send to database because of lack of input(BAD nulls)<br>  ";  
    } else {document.getElementById("panel").innerHTML="js assignTask has no nullS=<br>  ";
    
  
      request.open("POST", "insert_assignTask.php", true);
      //the serve needs some extra data
      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //??????
      
      //the data is sent in str which is formatted like an indexed array  label1=" value1 +"&label2=" value2
      request.send(str);  // <<<<<<<<<<<<<<<<<<<<< str=request.send(str) return is undefined
  
    } 
}

function editAssignment() {
  if(logToConsole) console.log('editAssignment()');
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
}


/*                                                                           utility connect & send request for a php file                                */
function XMLRequest($fileURL, str){
  if(logToConsole) console.log('XMLRequest()');
  var request= new XMLHttpRequest();
  request.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
    //must call response text?  Have I left something out? Wierd, if I comment this like out the script fails
    document.getElementById("panel").innerHTML=" Db call, this.responseText: "+ request.responseText +"<br>";
    }
    
  }
  //the request is now to be started with method POST, the url of where the PHP script is, & asynchronous=true
  request.open("POST", $fileURL, true);
  //the server needs some extra data
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //??????
  request.send(str); 
}







function dBTasklistByStudent(){
  if(logToConsole) console.log('dbTasklistByStudent()');
  XMLRequest("../queryDb/QueryDbTasklistByStudent.php");
}




function thisAssignedTask(){
  if(logToConsole) console.log('thisAssignedTask()');
  document.getElementById("panel").innerHTML+=" dBthisAssignedTask() ";
  var TLId = encodeURIComponent(document.getElementById("TLId").value);
    var str="TLId="+ TLId;
    document.getElementById("panel").innerHTML+="thisAssignedTLId()str: "+str+"<br>";
    if (TLId=="") { 
      document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
    } else {document.getElementById("panel").innerHTML+="js reports has no nullS=<br>  ";
    XMLRequest("../queryDb/QueryDbAssignedTaskbyTLId.php", str);
    }

}



function promote(){
  if(logToConsole) console.log('promote()');
  //prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
  //where find current stage?  need to send TLId  & stage to php

  TLId= encodeURIComponent(document.getElementById("TLId").value) , 
 // stage=  encodeURIComponent(document.getElementById("stage").value); 
stage = 2;  //not sure where to get this yet
 
  str="TLId="+ TLId;
  str+="&stage="+ stage;
  document.getElementById("panel").innerHTML="js update_assignTask promote: "+str;
}

function demote(){
  if(logToConsole) console.log('demote()');
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
  //Need find the tasklist entry for this studentId and increment the 'stage' column
}

function searchTask(){
  if(logToConsole) console.log('searchTask()');
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)"
}  