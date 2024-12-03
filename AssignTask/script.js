let prism = document.querySelector(".rec-prism");
const logToConsole=true;
//const logToConsole=false; 

var remember=[];

console.log('assigntask.html')
showAssign();
loadSESSIONArray();//this may have lots of members & tasks in it or be empty.



function showAssign(){
  if(logToConsole) console.log('showAssign()');
  prism.style.transform = "translateZ(-100px)";
  document.getElementById("panel").innerHTML="<p>If you have permission you can select someone to do a task.</p>" 
  +"That person is called the <i> student </i>. "
  +"<p>The member who supervises or helps the student is called the <i>Manager</i></p>"
  +"<p>Clicking the <b>get student id</b> or <b>get manager id</b> buttons redirects you to the people page"
  +" where you can remember a member as student & then select a member as manager.</p>"
  +"<p>Clicking the <b>get task id</b> button redirects you to the tasks page where you can click <b>remember this</b> as task."
  +" You need to either remeber the member id & task id or click the <b> remember this </b> button for each item (student, manager, task).</p>"
  +"After clicking you have to return to the assign task page (All links are in the menu item Manage)."
  +"<p>Hover over the labels 'Student', 'Manager' or 'Task' to see their names appear below the button</p><i>If you input a number the display still shows the last remembered name</i> ";

}

function showEdit(){
  if(logToConsole) console.log('showEdit()');
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  document.getElementById("panel").innerHTML="If you have permission you can edit the details of who is assigned to the task<br>Change the student , the task or the manager here.";

}

function showProgressStudent(){
  if(logToConsole) console.log('showProgressStudent()');
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  document.getElementById("panel").innerHTML="If you have permission you can change which stage of the task the student is in.<br>You click the (not yet coded) move back/forward buttons to place the student in the relevant stage (step or lesson).";
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

function isSESSIONLoaded(){
  if(logToConsole) console.log('isSESSIONLoaded()');  
//read the SESSION to see if there are stored members or tasks
//NOT USED
return true//if there are stored values ?
//could be several different ones. How select?
}


function loadFormFromArray(){
  if(logToConsole) console.log('loadFormFromArray()');
//HOW?
for(i=0;i<remember.length;i+=2){

  switch (remember[i]) {
    case 'as Student': document.getElementById('studentId').value=remember[i+1].MId ; 
    document.getElementById('rowDataStudent').innerText='Student:'+remember[i+1].MUserName;
    break;
    case 'as Manager': document.getElementById('managerId').value=remember[i+1].MId ; 
    document.getElementById('rowDataManager').innerText='Manager:'+remember[i+1].MUserName;
    break;
    case 'as Task': document.getElementById('taskTHId').value=remember[i+1].THId ; 
    document.getElementById('rowDataTask').innerText='Task:'+remember[i+1].TaskName;
    break;
    case 'as Assigned': 
    document.getElementById('task-THId').value=remember[i+1].TaskId ; 
    document.getElementById('editStudentId').value=remember[i+1].StudentId ; 
    document.getElementById('edit-SId').value=remember[i+1].Stage ;

    document.getElementById('taskname').innerText=remember[i+1].TaskName;
//    document.getElementById('stagename').innerText=remember[i+1].??; //only has foreign key
//    document.getElementById('stagedesc').innerText=remember[i+1].??;

document.getElementById('TLId').value=remember[i+1].TLId ; 
//document.getElementById('stageStudent').value=remember[i+1].StudentId ; 
document.getElementById('stageMove').value=remember[i+1].Stage ;

document.getElementById("progTask").innerHTML='Task: '+remember[i+1].TaskName;
    document.getElementById("progStudent").innerHTML='Student: '+remember[i+1].Student +' ['+ remember[i+1].StudentId+']';
      document.getElementById("progManager").innerHTML='Manager: '+remember[i+1].Manager;

    ;break;
    default: console.log('default: '+remember[i]); break;
  }
 console.log('Item ',i/2+1,' of ', remember.length/2,' items', 'Remember as ',remember[i], remember[i+1]);
 } 

}


function rememberProcess(remember){
  if(logToConsole) console.log('RememberProcess()');
for(i=0;i<remember.length;i+=2){
  console.log('Item ',i/2+1,' of ', remember.length/2,' items', 'Remember as ',remember[i], remember[i+1]);}        
}

function loadSESSIONArray(){
  if(logToConsole) console.log('loadSESSIONArray()');
  fetch('../QueryDb/loadSESSIONArray.php')
  .then(response => response.json())
  .then(result => {
      // Use the result
     // console.log('result[0]='+result[0]);
     remember=result;
   //  rememberProcess(remember);
     loadFormFromArray();
      //store the session data in the local remember[]
        //when empty the session var? when empty remember?
  })
  .catch(error => {
      console.error('Error loadSESSIONArray:', error);
  });
  }


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
//just redirect to the people.html to get the member id ???
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
 // prism.style.transform = "translateZ(-100px) rotateX( 90deg)";//shows confirmed

  /* read form input & create string of associated array  label=value   to send to server*/
  var str, 
  studentId= encodeURIComponent(document.getElementById("studentId").value) , 
  taskTHId=  encodeURIComponent(document.getElementById("taskTHId").value), 
  managerId= encodeURIComponent(document.getElementById("managerId").value);
  //stageText= encodeURIComponent(document.getElementById("stageText").value);
  
  document.getElementById("panel").innerHTML="assignTask() "; 
  str="studentId="+ studentId;
  str+="&taskTHId="+ taskTHId;
  str+="&managerId="+ managerId;
  //str+="&stageText="+stageText;
  
//  document.getElementById("panel").innerHTML="js createStage has str=<br>  "+str +"<p>";
  /* string prepared to send to server. Has been displayed in 'panel' for user feedback */
  
  /*Open request to server*/
  
  var request= new XMLHttpRequest();
  var last_id; /*To store id of the assignment inserted in the tasklist table */
  
  request.onreadystatechange = function() {
  
    if (this.readyState == 4 && this.status == 200){
    
    document.getElementById("panel").innerHTML+='<br>'+request.responseText +"<br>";
//    document.getElementById("panel").innerHTML+="<br> Assign Task, this.responseText:<br> "+ request.responseText +"<br>";
    //    var str2= document.getElementById("panel").innerHTML;
//    var found =str2.indexOf("id");
//    document.getElementById("panel").innerHTML+="JS Position of last_id:"+found+"<br>";//does nothing when includes +found if outside this asynchronous function
//    last_id=str2.slice(found+3);
//    document.getElementById("panel").innerHTML+=last_id;//+3 to ignore  id=
  } 
     
  }
  
    //need to prevent send if missing input (need to validate the input NOT YET IMPLEMENTED)
    if (studentId=="" || taskTHId=="" || managerId=="") { 
      document.getElementById("panel").innerHTML="Can't send to database because of lack of input(BAD nulls)<br>  ";  
    } else {document.getElementById("panel").innerHTML+="Inputs being sent<br>  ";
    
  
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
async function fetchDbSingle(url, str){
  if(logToConsole) console.log('fetchDbSingle()');
  const dataToSend = str;

  //test made no difference
  //const dataToSend='keyId=1&tableName=members&keyName=MId';
  
  //test  other errors
  //url='../QueryDb/QueryDbAllMembers.php';
  
    if(logToConsole) console.log('fetchDbSingle(' + url+' '+ str +')');
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: dataToSend
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }







function dBTasklistByStudent(){
  if(logToConsole) console.log('dbTasklistByStudent()');
  fetchDbSingle("../queryDb/QueryDbTasklistByStudent.php");
}




async function thisAssignedTask(){ //This is calling db when data is already in remember
  if(logToConsole) console.log('thisAssignedTask()');
  document.getElementById("panel").innerHTML+=" dBthisAssignedTask() ";
  var TLId = encodeURIComponent(document.getElementById("TLId").value);
    var str="TLId="+ TLId;
    document.getElementById("panel").innerHTML+="thisAssignedTLId()str: "+str+"<br>";
    if (TLId=="") { 
      document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
    } else {document.getElementById("panel").innerHTML+="js reports has no nullS=<br>  ";
      const rowData = await fetchDbSingle("../queryDb/QueryDbAssignedTaskbyTLId.php", str);
     //const rowData = await fetchDbSingle("../queryDb/QueryDbTasklistById.php", str);
      console.log(rowData);
      document.getElementById("progTask").innerHTML=' Task: '+rowData[0].TaskName;
      document.getElementById("progStudent").innerHTML=' Student: '+rowData[0].Student;
      document.getElementById("progManager").innerHTML=' Manager: '+rowData[0].Manager;
     // document.getElementById("progStageName").innerHTML=' Manager: '+rowData[0].StageName;
      
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