
let prism = document.querySelector(".rec-prism");
const logToConsole=true;
//const logToConsole=false;

var remember=[];

console.log('CreateHeader.html')
showCreateHeader();
loadSESSIONArray();//this may have lots of members & tasks in it or be empty.

function rememberProcess(remember){
  if(logToConsole) console.log('RememberProcess()');
for(i=0;i<remember.length;i+=2){
  console.log('Item ',i/2+1,' of ', remember.length/2,' items', 'Remember as ',remember[i], remember[i+1]);}        
}

function loadFormFromArray(){
  if(logToConsole) console.log('loadFormFromArray()');
//HOW?
for(i=0;i<remember.length;i+=2){

  switch (remember[i]) {
    case 'as Student': //document.getElementById('studentId').value=remember[i+1].MId ; 
    //document.getElementById('rowDataStudent').innerText='Student:'+remember[i+1].MUserName;
    break;
    case 'as Manager': //document.getElementById('managerId').value=remember[i+1].MId ; 
    //document.getElementById('rowDataManager').innerText='Manager:'+remember[i+1].MUserName;
    break;
    case 'as Task': document.getElementById('task_THId').value=remember[i+1].THId ;
    document.getElementById('header_THId').value=remember[i+1].THId;
    document.getElementById('headerTHId').value=remember[i+1].THId ;
    document.getElementById('taskName').value=remember[i+1].TaskName ;
    document.getElementById('taskDesc').value=remember[i+1].TaskDesc ; 

    //document.getElementById('rowDataTask').innerText='Task:'+remember[i+1].TaskName;
    break;
    case 'as Author': document.getElementById('author').value=remember[i+1].MId ;
    document.getElementById('stage_author').value=remember[i+1].MId;
    document.getElementById('taskAuthor').value=remember[i+1].MId ;
    document.getElementById('authorId').value=remember[i+1].MId ; 
    //document.getElementById('rowDataTask').innerText='Task:'+remember[i+1].TaskName;
    break;


    default: console.log('default: '+remember[i]); break;
  }
 console.log('Item ',i/2+1,' of ', remember.length/2,' items', 'Remember as ',remember[i], remember[i+1]);
 } 

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




function showCreateHeader(){
  if(logToConsole) console.log('showCreateHeader()');
  prism.style.transform = "translateZ(-100px) "; 
document.getElementById("panel").innerHTML="Each task has a name, a description, and an author.<br>Then you can create each stage (step or lesson) in the task.";

}
function createHeader(){
               //document.getElementById("panel").innerHTML="js createHeader 1 "; 
//Extract data from web page form & prepare for building a string that is safe to send. 
if(logToConsole) console.log('createHeader()');
var str, 
 userName= encodeURIComponent(document.getElementById("name").value) , 
 describe= encodeURIComponent(document.getElementById("describe").value), 
 author=   encodeURIComponent(document.getElementById("author").value),
 taskFaq=  encodeURIComponent(document.getElementById("taskFaq").value);
// document.getElementById("panel").innerHTML="js createHeader 2 "; 
var request= new XMLHttpRequest();
var last_id; //????????????????
//need check have no nulls

//alert('js');//works

//build a string of the above inputs from the web page form. Format it like an indexed array. Separate with &. "label1=" value1 +"&label2=" value2
str="userName="+ userName;
str+="&desc="+ describe;
str+="&author="+ author;
str+="&taskFaq="+taskFaq;
if(logToConsole) console.log(str);
//document.getElementById("panel").innerHTML="js createHeader has str=<br>  "+str +"<p>"; //developer feedback FAILS here but works in other function stage<<<<<<<<<<<<<<

//the call to the server will be asynchronous & checked for notification of completion. readystate starts at 0 & goes to 4 when complete
//the server returns a ststus of 200 if the task was run or an error code of 400, 401, 403 
//it may print on screen later than the below instructions
request.onreadystatechange = function() {

  if (this.readyState == 4 && this.status == 200){
  //must call response text?  Have I left something out? Wierd, if I comment this like out the script fails
  document.getElementById("panel").innerHTML+="<br> CreateTaskheader, this.responseText:<br> "+ request.responseText +"<br>";

  var str2= document.getElementById("panel").innerHTML;
  //var str2="a test string in which id occurs ";
  var found =str2.indexOf("id");
  //document.getElementById("panel").innerHTML+="Position of last_id:"+found+"<br>";//does nothing when includes +found if outside this asynchronous function
 
  //last_id=str2.slice(found+3);
  //document.getElementById("panel").innerHTML+=last_id;//+3 to ignore  id=
//  document.getElementById("panel").innerHTML+=str2.slice(found+3);//+3 to ignore  id=

//WORKS here because wais for response, but o
} 
   
}

//need to prevent send if missing input (need to validate the input NOT YET IMPLEMENTED)
if (userName.length=="" || describe=="" || author=="") { 
  document.getElementById("panel").innerHTML="Can't send to database because of lack of input(BAD nulls)<br>  ";  
} else {//document.getElementById("panel").innerHTML="js createHeader has no nullS=<br>  ";


    //the request is started with method POST, the url of where the PHP script is, & asynchronous=true
request.open("POST", "insert_taskheader.php", true);
    //the server needs some extra data
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //??????

  // these were suggested online but not sure why
  //request.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); //????
  //http.setRequestHeader("Content-length", str.length);//this prevented .php call
  //http.setRequestHeader("Connection", "close");

  //the data is sent in str which is formatted like an indexed array  label1=" value1 +"&label2=" value2
request.send(str);  // <<<<<<<<<<<<<<<<<<<<< str=request.send(str) return is undefined

//document.getElementById("panel").innerHTML+="<br> return="+ str2 +"<br>";// str2 'undefined'

//can js find the returned last_id value that the php echo sent?????

//document.getElementById("panel").innerHTML="Trying to load last_id by php writing script"+last_id;  //undefined

//str=document.getElementById("panel").innerHTML;
//document.getElementById("panel").innerHTML+="<p>"+str2;//it is the last thing that was written by js. Not the echo ?
}



}

function showCreateStage(){
  if(logToConsole) console.log('showCreateStage()');
prism.style.transform = "translateZ(-100px) rotateY( +90deg)";
document.getElementById("panel").innerHTML="There can be more than one stage (step or lesson) as part of the overall task.<br> At least one. <br>It has a name, a stage number, a descriptioon & an author";
}

function createStage(){
  if(logToConsole) console.log('createStage()');
    //document.getElementById("panel").innerHTML="js createHeader 1 "; 
  //Extract data from web page form & prepare for building a string that is safe to send. 
    var str, 
    task_THId= encodeURIComponent(document.getElementById("task_THId").value) , 
    stageName= encodeURIComponent(document.getElementById("stage_name").value) , 
   describe= encodeURIComponent(document.getElementById("stage_description").value), 
  stageNumber= encodeURIComponent(document.getElementById("stage_number").value), 
  //need check have no nulls 
   author=   encodeURIComponent(document.getElementById("stage_author").value);
   document.getElementById("panel").innerHTML="js createHeader 2 "; 
  var request= new XMLHttpRequest();
  
  str="task_THId="+ task_THId;
  str+="&stage_name="+ stageName;
  str+="&stagen="+stageNumber;
  str+="&stage_description="+ describe;
  str+="&stage_author="+ author;
  
document.getElementById("panel").innerHTML="js createStage has str=<br>  "+str +"<br"; //developer feedback <<<<<<<<<<<<<<
  
  //the call to the server will be asynchronous & checked for notification of completion. readystate starts at 0 & goes to 4 when complete
  //the server returns a ststus of 200 if the task was run or an error code of 400, 401, 403 
  request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200){
    //must call response text
   document.getElementById("panel").innerHTML+="<br> CreateStage, this.responseText: produces:<br> "+ this.responseText +" <br>";
  }  
  }
//need to prevent send if missing input (need to validate the input NOT YET IMPLEMENTED)
if (task_THId=="" ||  stageName=="" || describe=="" ||stageNumber=="" || author=="") {
  document.getElementById("panel").innerHTML="Can't send to database because of lack of input(BAD nulls)<br>  ";  
} else {document.getElementById("panel").innerHTML="js createHeader has no nullS=<br>  ";

//the request is started with method POST, the url of where the PHP script is, & asynchronous=true
request.open("POST", "insert_taskstage.php", true);
//the serve needs some extra data
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //??????

//the data is sent in str which is formatted like an indexed array  label1=" value1 +"&label2=" value2
request.send(str);  // <<<<<<<<<<<<<<<<<<<<<
}
  
}

function showEditHeader(){
  if(logToConsole) console.log('showEditHeader()');
  prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
  document.getElementById("panel").innerHTML="If you have permission you can edit the details of a task<br>Edit the task name name, description or author here.<br> Use the other link to edit a stage";

}
function editHeader(){
  if(logToConsole) console.log('editHeader()');
 ; 
}

function showEditStage(){
  if(logToConsole) console.log('showEditStage()');
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  document.getElementById("panel").innerHTML="If you have permission you can edit the details of a task stage<br>Edit the task name name, description, stage number or author here.<br> Use the other link to edit the task header";

}
function editStage(){
  if(logToConsole) console.log('editStage()');
 ; 
}


function showManage(){
  if(logToConsole) console.log('showManage()');
  prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
  document.getElementById("panel").innerHTML="Work to do.";

}


function showThankYou(){
  if(logToConsole) console.log('showThankYou()');
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
  //         trying next 2 line 
  //var result = '<?php CreateHeader.php; ?>';
  //document.write('message showthankyou()');  
  //document.write(result);  
}

function showThankYouSignup(){
  if(logToConsole) console.log('showThankYouSignup()');
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
//echo ( getElementsByName("email"+"<<<"));
}

function showThankYouLogin(){
  if(logToConsole) console.log('showThankYouLogin()');
  prism.style.transform = "translateZ(+50px) rotateX( 90deg)";


}
