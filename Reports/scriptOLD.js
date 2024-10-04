let prism = document.querySelector(".rec-prism");

function showTasks(){//display tasks
  prism.style.transform = "translateZ(-100px)";
  document.getElementById("panel").innerHTML="Search the list of tasks.<br>See a list of all the tasks in the databse.<br> Select the tasks you are trying to complete.<br>";

  document.getElementById("panel").innerHTML+= "If you already have a chosen task, see its details.<p> <b>Lists</b> have a row for each task one below the other.<br><b>Cards</b> show one at a time & can be clicked to see the next";
}
function showStudents(){//display students
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  document.getElementById("panel").innerHTML="Search the list of students.<br>See a list of all the students in the databse.<br> Select the students you are trying to help.<br>";

}

function showManagers(){//display managers
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  document.getElementById("panel").innerHTML="* Active search of databse. All other buttons show the entire database - all 5 tables .<br>";

}

function showPersonal(){//display user details
  prism.style.transform = "translateZ(-100px) rotateY( 180deg)"; 
  document.getElementById("panel").innerHTML="Check your username email address & other stored data.";

}

function showManage(){//links to tasks
  prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
  document.getElementById("panel").innerHTML="So much to do, so little time.";

}





function showThankYou(){
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
    XMLRequest("../test/QueryDbTest.php","");
 

}

function showSelectTask(){
  prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
}

function showThankYouSignup(){
  prism.style.transform = "translateZ(-50px) rotateX( 90deg)";
//echo ( getElementsByName("email"+"<<<"));
}

function showThankYouLogin(){
  prism.style.transform = "translateZ(+50px) rotateX( 90deg)";
}

function promote(){
  prism.style.transform = "translateZ(+50px) rotateX( 90deg)";
}

function demote(){
  prism.style.transform = "translateZ(+50px) rotateX( 90deg)";
}



/*                                                                           utility connect & send request for a php file                                */
function XMLRequest($fileURL,str){
  document.getElementById("panel").innerHTML+="js XMLRequest()$fileURL: "+$fileURL+"<br>"; 
  document.getElementById("panel").innerHTML+="js XMLRequest()str: "+str+"<br>";
  var request= new XMLHttpRequest();
  request.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
    //must call response text?  Have I left something out? Wierd, if I comment this like out the script fails
    document.getElementById("panel").innerHTML=" Db call, this.responseText: "+ request.responseText +"<br>";
    }
    else{document.getElementById("panel").innerHTML+="Else "+this.request.responseText +"<br>"};
  }
  //the request is now to be started with method POST, the url of where the PHP script is, & asynchronous=true
  request.open("POST", $fileURL, true);
  //the server needs some extra data
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //??????
  request.send(str); 
}

/*                                                                            Student Db display                                         */

function TasklistFull(){
  document.getElementById("panel").innerHTML+=" dBtasklistFull() ";
  XMLRequest("../queryDb/QueryDbTasklistFull.php","");

}

function listByStudent(){
  /* Can be called with studentId from student section or memberId from personal section. Problem of several forms on 1 page */
var studentId = encodeURIComponent(document.getElementById("studentId").value);
if(studentId=="") {studentId = encodeURIComponent(document.getElementById("MemberId").value)};
 document.getElementById("panel").innerHTML+="listByStudent() str="+str+"<br>";
  var str="studentId="+ studentId;
  document.getElementById("panel").innerHTML+="listByStudent()str: "+str+"<br>";
  if (studentId=="") { 
    document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
  } else {document.getElementById("panel").innerHTML+="js reports has no nullS=<br>  ";
  XMLRequest("../queryDb/QueryDbTasklistByStudent.php", str);

  }


}

function listByMember(){
  document.getElementById("panel").innerHTML+="js listByMember()<br>";
  var MId = encodeURIComponent(document.getElementById("MemberId").value);
    var str="MemberId="+ MId;
    document.getElementById("panel").innerHTML+="listByMemberId()str: "+str+"<br>";
    if (MId=="") { 
      document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
    } else {document.getElementById("panel").innerHTML+="js reports has no nullS=<br>  ";
    XMLRequest("../queryDb/QueryDbMemberById.php", str);
    }
   }


function listByTaskAssigned(){
  var TaskId = encodeURIComponent(document.getElementById("taskId").value);
    var str="taskId="+ TaskId;
    document.getElementById("panel").innerHTML+="listByTaskAssigned()taskID: "+TaskId+"<br>";    
    document.getElementById("panel").innerHTML+="listByTaskAssigned()str: "+str+"<br>";
    if (TaskId=="") { 
      document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
    } else {document.getElementById("panel").innerHTML+="js reports has no nullS=<br>  ";
    XMLRequest("../QueryDb/QueryDBTasklistByTask.php", str);
}
}

/*                                                                             Manager Db display                                         */

function dbAssignedKeys(){
  XMLRequest("../queryDb/QueryDbTasklistKeys.php");
}

function dbAssignedDetails(){
  XMLRequest("../queryDb/QueryDbTasklistFull.php");
}

function dbTaskHeaders(){
  XMLRequest("../queryDb/QueryDbTaskHeaders.php");  
}

function dbTaskStages(){
  XMLRequest("../queryDb/QueryDbStages.php");  
}

function dbMembers(){
  XMLRequest("../queryDb/QueryDbMembers.php");
}


/*                                                                              Tasks                                                     */
function getCookie(cname) { //Only works when run on its own in its own page in the url. Why???
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "Didn't find cookie";
}




function dbTaskHeader(){

  var TaskId = encodeURIComponent(document.getElementById("taskTHId").value);
  var str="taskId="+ TaskId;
  document.getElementById("panel").innerHTML+="listByTask()taskID: "+TaskId+"<br>";    
  document.getElementById("panel").innerHTML+="listByTask()str: "+str+"<br>";
  if (TaskId=="") { 
    document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
  } else {document.getElementById("panel").innerHTML+="js reports has no nullS=<br>  ";
  XMLRequest("../QueryDb/TaskIdToCard.php",str);      // Test of cookies   Should be different php file
  //does set cookies, but so far can't find them here, but can if run getcookie in own html file.

  setTimeout(() => {      /* does this need a delay to make sure cookie set? */
    document.getElementById("taskTitle").innerHTML= getCookie("TaskTitle");
    document.getElementById("taskDesc").innerHTML= getCookie("TaskDesc");
    document.getElementById("taskNumber").innerHTML= getCookie("THId"); }, 500);

}
}
/* the above which puts values into card replaced this function 19:42 3 oct 2024
function dbTaskHeader(){

  var TaskId = encodeURIComponent(document.getElementById("taskTHId").value);
  var str="taskId="+ TaskId;
  document.getElementById("panel").innerHTML+="listByTask()taskID: "+TaskId+"<br>";    
  document.getElementById("panel").innerHTML+="listByTask()str: "+str+"<br>";
  if (TaskId=="") { 
    document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
  } else {document.getElementById("panel").innerHTML+="js reports has no nullS=<br>  ";
  XMLRequest("../queryDb/QueryDbTaskHeaderId.php",str);  
}
}
*/

function dbTaskStagesById(){
var TaskId = encodeURIComponent(document.getElementById("taskTHId").value);
  var str="taskId="+ TaskId;
  document.getElementById("panel").innerHTML+="listByTask()taskID: "+TaskId+"<br>";    
  document.getElementById("panel").innerHTML+="listByTask()str: "+str+"<br>";
  if (TaskId=="") { 
    document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
  } else {document.getElementById("panel").innerHTML+="js reports has no nullS=<br>  ";
    XMLRequest("../queryDb/QueryDbTaskStagesById.php",str); 
}
}

function taskStagesCard(){
  var TaskId = encodeURIComponent(document.getElementById("taskTHId").value);
  var str="taskId="+ TaskId;
  document.getElementById("panel").innerHTML+="listByTask()taskID: "+TaskId+"<br>";    
  document.getElementById("panel").innerHTML+="listByTask()str: "+str+"<br>";
  if (TaskId=="") { 
    document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
  } else {document.getElementById("panel").innerHTML+="js reports has no nullS=<br>  ";
    XMLRequest("../queryDb/QueryDbTaskStagesCard.php",str); 
}



//  showThankYou();
}




/*                                                                              Personal Db display                                       */

function myDbDetails(){
  /* need to pass the value in the MemberId input box */
  //XMLRequest("../queryDb/QueryDbMyDetails.php");
}


