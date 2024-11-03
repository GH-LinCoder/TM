var summaryData = [];//assuming the php returns an array of this kind
//summaryData[0] = { "countMembers": 112, "countStudents": 14, "countManagers": 4, "countTasks": 34, "countStages": 82, "countTaskList": 62 }

let prism = document.querySelector(".rec-prism");
let title = document.querySelector(".title");
titleValue=document.getElementById('title').getAttribute('value');
document.getElementById('panel').textContent+='This is the page for: '+titleValue;
//                                                   create javascript names for places in the webpage

//                                                    summary face
let memberSummary = document.querySelector("#memberSummary");
let studentSummary = document.querySelector("#studentSummary");
let managerSummary = document.querySelector("#managerSummary");
let authorSummary = document.querySelector("#authorSummary");
let taskSummary = document.querySelector("#taskSummary");
let stagesSummary = document.querySelector("#stagesSummary");
let tasklistSummary = document.querySelector("#tasklistSummary");

//           DIFFERENT                                         long side faces functions

if(titleValue=='people'){

let totalStudent = document.querySelector("#totalStudent");
let totalAuthors = document.querySelector("#totalAuthors");
let totalManagers = document.querySelector("#totalManagers");
let totalMembers = document.querySelector("#totalMembers");
}else{

  //            DIFFERENT                                        long side faces functions 
let totalTasklist = document.querySelector("#totalTasklist");
let totalTasks = document.querySelector("#totalTasks");
let totalStages = document.querySelector("#totalStages");

}

//                                     After data fetched from database put each specific result in the relevant place on the web page

function putDataInSummary(summaryData) {
  //                                          The people related data
  document.getElementById("memberSummary").value = "Members [" + summaryData[0].countMembers + "]";
  document.getElementById("studentSummary").value = "Students [" + summaryData[0].countStudents + "]";
  document.getElementById("managerSummary").value = "Managers [" + summaryData[0].countManagers + "]";
  document.getElementById("authorSummary").value = "Authors [" + summaryData[0].countAuthors + "]";

  //                                            The task related data
  document.getElementById("taskSummary").value = "Tasks [" + summaryData[0].countTasksheaders + "]";
  document.getElementById("stagesSummary").value = "Stages [" + summaryData[0].countTasksStages + "]";
  document.getElementById("tasklistSummary").value = "Tasklist [" + summaryData[0].countTaskList + "]";

}

//                    DIFFERENT                                    data specific to this page
function putDataInFaces(summaryData){

  if(titleValue=='people'){
  document.getElementById("totalStudent").value = "Students [" + summaryData[0].countStudents + "]";
  document.getElementById("totalManagers").value = "Managers [" + summaryData[0].countManagers + "]";
  document.getElementById("totalMembers").value = "Members [" + summaryData[0].countMembers + "]";
  document.getElementById("totalAuthors").value = "Authors [" + summaryData[0].countAuthors + "]";
} else
{
  document.getElementById("totalTasklist").value = "TaskList [" + summaryData[0].countTaskList + "]";
  document.getElementById("totalTasks").value = "Tasks [" + summaryData[0].countTasksheaders + "]";
  document.getElementById("totalStages").value = "Stages [" + summaryData[0].countTasksStages + "]";
}
}



////////////////////////////////////////////////////////                                summary 

/*                                  Summary database reads                      */
//Fetch() calls to read the database to count all the summary items
//count members, taskheaders, tasksStages, tasklist. Put together in summary=json_encode;

//Put lots of divs in the html or build the html in javascript?  

function fetchSummary() {
  const url = '../QueryDb/QueryDbFetchSummary.php';/* Need code the PHP */
  fetch(url)
    .then(response => response.json())
    .then(data => {
      //summaryData=response.json;//AI says this is wrong and suggested the following...
   //   summaryData = data;
      console.log(data); // For debugging
      summaryData=data;
//lengthOfLatestRead=data.length;
//console.log(lengthOfLatestRead);
      putDataInSummary(data);
      putDataInFaces(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


// fetch the summary data by calling the above function
fetchSummary();




/*                                   The webpage has some of its function on the 4 faces of an elongated cube called a Prism                     
                                     The 4 long faces are for main functions. One end face is links to other webpages. The other end is a summary display (dashboard)     

*/

/* Display the summary face first */
showSummary();

var pageNumber=1, currentPage=1, limit=10,  offset=0;

function calculateLimitOffset(currentPage){//pageNumber is the user chosen page to display. It may not exist.
 if(currentPage==1) { offset=0 }
 else {offset=(currentPage-1) * limit};
 console.log("pageNumber[" + pageNumber + "]"+ "current Page[" + currentPage + "]  limit ["+ limit +"] offset["+ offset +"]") ;
}


////////////////////////////////////////////////////////                                    end of summary 





async function fetchDbSingle(url,str) {
  const dataToSend=str; 
console.log('fetchDbSingle: '+str);
   //no idea why return was written here: return fetch(). aparently not needed but does seem needed in fetchDb(url)  ???
     fetch(url, { 
     method:'POST',
     headers:{ 'Content-Type':'application/x-www-form-urlencoded'},
     body:dataToSend}) 
      .then(response => response.json())
      .then(data => {
        console.log(data); // For debugging
        return data;
      })
      .catch(error => {
  
        console.error('Error fetching data:', error);
      });
  }



/////////////////////////////////////////////////////                              Read a page from Db  

//variables for doing db reads by page
var lengthOfLatestRead=0; //this is the size of the latest query result. Wrong. Wanted to know how big a full read would be.
var limit, offset;

async function fetchDb(url) {
//  document.getElementById('panel').innerHTML+= "fetchDb()"; 
  calculateLimitOffset(currentPage);
  const dataToSend='offset='+encodeURIComponent(offset)+'&limit='+encodeURIComponent(limit);  

 //no idea why return is written here.It is needed, but in the fetchDbSingle(url, str) it isn't needed ???
  return fetch(url, { 
   method:'POST',
   headers:{ 'Content-Type':'application/x-www-form-urlencoded'},
   body:dataToSend}) 
    .then(response => response.json())
    .then(data => {
      console.log(data); // For debugging
      lengthOfLatestRead=data.length; //pointless??
      console.log(lengthOfLatestRead);
      return data;

      // putDataInSummary(summaryData);
     // putDataInFaces(summaryData);
    })
    .catch(error => {

      console.error('Error fetching data:', error);
    });
}




////////////////////////////////////////////////////////                       display one row on a card

function displayOnCard(rowData){

  if (!sliding_panel_container.classList.contains('visible')) {
    sliding_panel_container.classList.add('visible');}



  // rowData is an object  { label: 'value' , label:'value'...   }
  headers = Object.keys(rowData);
  console.log("DisplayOnCard() Clicked row:", rowData, " Number of columns=", headers.length);
  document.getElementById('panel').innerHTML='The headers are: '+headers;//works


  cardDiv = document.createElement('div');
  cardDiv.id = 'dynamicCard';   
  cardDiv.className = 'course';
cardSlider.appendChild(cardDiv);


//div 1 of top card - for row key
let cardKeyDiv = document.createElement('div');
cardKeyDiv.id='cardTopLeft';
cardKeyDiv.className='task-left';

// Create the left reactangle with the database column name 
cardKeyTitle = document.createElement('h8');
cardKeyTitle.style.color='white';
cardKeyTitle.className = 'h8';
cardKeyTitle.style.position='absoloute';
cardKeyTitle.id="cardKeyRef";
cardKeyTitle.textContent=headers[0];

cardKeyDiv.appendChild(cardKeyTitle);

// add the unique key reference number 
let keyContent = document.createElement('div');
keyContent.id='cardKeyTitle';
currentValue =  rowData[headers[0]];
keyContent.textContent=currentValue;
cardKeyDiv.appendChild(keyContent);
cardDiv.appendChild(cardKeyDiv);     

//create all the remaining columns with their database names. Start at 1 (the key reference number was item 0)
i=1;
while ( i< headers.length){
let cardDivj=document.createElement('div');	
let cardDivTitle = document.createElement('h8');
  cardDivTitle.style.padding='3px';  
  cardDivTitle.textContent =[headers[i]]; 	
  cardDivj.appendChild(cardDivTitle);

// add the values from the database under the database column names   
  let cardDivContent = document.createElement('div');
  cardDivContent.classList.add='cardContent';
  cardDivContent.textContent=rowData[headers[i]];
	cardDivj.appendChild(cardDivContent);
  cardDiv.appendChild(cardDivj);
i++;
}

//nav table to click through the other records


//                        Card nav buttons & display

let cardDivNav=document.createElement('div');
cardDivNav.id='cardDivNav';
cardDivNav.className='stageNumber-info';
//cardDivNav.textContent = "cardDivNav";
cardDiv.appendChild(cardDivNav);



const tableNav = document.createElement('table');
tableNav.classList.add('tableNav');

cardDivNav.appendChild(tableNav);

tableTopRow= tableNav.insertRow();
tableTopRow.classList.add('tableTopRow');

cell = tableTopRow.insertCell();cell.classList.add('table-cell'); 

cardKeyTitle = document.createElement('h6');
//cardKeyTitle.textContent = 'stage';
cardKeyTitle.id="cardName";
cardKeyTitle.style.color='black';
cardKeyTitle.className = 'h6';
//cardKeyTitle.style.position='absolute';
cardKeyTitle.innerText='item'; 
cell.appendChild( cardKeyTitle);

//document.getElementById('cardName').innerHTML='Task';
//this name could be "TASK" or something else based on context

cell = tableTopRow.insertCell(); cell.classList.add('table-cell'); cell.textContent = rowData[headers[0]];

table2ndRow= tableNav.insertRow();
table2ndRow.classList.add('table2ndRow');
cell = table2ndRow.insertCell(); 
cell.classList.add('table-cell'); 
cell.colSpan = 2;

previousItemButton = document.createElement('button');
previousItemButton.innerText = 'Previous';
       // button.setAttribute('onclick', 'function()');
previousItemButton.classList.add('btn');
cell.appendChild(previousItemButton);
previousItemButton.id="previousItem";


table3rdRow= tableNav.insertRow();
table3rdRow.classList.add('table3rdRow');
cell = table3rdRow.insertCell(); 
cell.classList.add('stageNumber');
cell.innerText=rowData[headers[0]]; 
cell.colSpan = 2;
cell.id="displayItem";

//cell.textContent = "4";

table4thRow= tableNav.insertRow();
table4thRow.classList.add('table4thRow');
cell = table4thRow.insertCell(); 
cell.classList.add('table-cell'); 
cell.colSpan = 2;
nextItemButton = document.createElement('button');
nextItemButton.innerText = 'Next';
nextItemButton.id="nextItem";
       // button.setAttribute('onclick', 'function()');
nextItemButton.classList.add('btn');
cell.appendChild(nextItemButton);

//document.getElementById('cardDivNav').appendChild(tableNav);

//end of nav are of card

let itemNumber=rowData[headers[0]];
let currentItem=itemNumber;




///////////////////////////////////////                         event listeners for buttons & number on dynamic card

/*                    Previous          change item number*/
//const previousItem = document.querySelector('#previousItem');
previousItemButton.addEventListener('click', () => {
  console.log('clicked previous');
  itemNumber--;
    if(itemNumber<1)itemNumber=1;
     /*Large task number on right*/
    document.getElementById('displayItem').innerHTML=itemNumber;
     /*small ? number on left*/
   
     /*don't change the small itemId until the task being displayed changes*/
   /* document.getElementById('taskId').innerHTML=taskNumber;*/
   
     /*Change color when displaying the current item */
   showTaskColor(currentItem,itemNumber);
   })
   
   
   /* If click the item number, the display should now display this item.  Can click previous/next to choose a task number, but clicking the number confirms the choice and then displays that task  */
   
   const displayItem = document.querySelector('#displayItem');
   displayItem.addEventListener('click', () => {
    console.log('clicked displayed number');
     /*click the displayed page number to deliver data*/
     /* Need call a php pagination script*/
    currentItem=itemNumber;
    document.getElementById("displayItem").innerHTML="*"+itemNumber;
   showTaskColor(currentItem,itemNumber);
  
  //     document.getElementById('cardKey').innerHTML="Awaiting db for "+taskNumber;
       
   });
   
   
   /*                    Next          change task number*/
   nextItemButton.addEventListener('click', () => { 
    console.log('clicked next');
    itemNumber++; 
    document.getElementById('displayItem').innerHTML=itemNumber;/*Large task number on right*/
   /*don't change the taskId until the page change is confirmed*/											  
   /*document.getElementById('taskId').innerHTML=taskNumber;	*/
   showTaskColor(currentItem,itemNumber);		 
  })
   



//below is test only
for (var head in headers) {//head is an int from 0 to length of headers  
currentHeader = headers[head];
currentValue = rowData[headers[head]];
console.log(currentHeader, currentValue); 

/*
function createCardDiv(j){
//create another div of top card
let cardDivj=document.createElement('div');	
let cardDivTitle = document.createElement('line');
  cardDivTitle.style.padding='3px';
  cardDivj.id='column'+i+' of '+rowLength;
  cardDivTitle.textContent = cardDivj.id 	
let cardDivContent = document.createElement('p');
	cardDivContent.style.backgroundColor='lightgrey';
  cardDivContent.id='divContent'+i;
  cardDivContent.textContent="col "+i+" from db with an unknown amount of text. Where will it go?";
	cardDivTitle.appendChild(cardDivContent);
	cardDiv.appendChild(cardDivTitle);	
cardDiv.appendChild(cardDivj);     
//end of a column creation
*/

}
};  /////////////////////////                                         end of displayOnCard(rowData)






//////////////////////////////                                         display on list

function displayOnList(dataForList){

  //check if a table has already been built (use the id='headerRow' that was applied for this purpose)
  headerElement = document.getElementById('headerRow');

  if (headerElement) { //if there is a headerRow that means a table has already been built & displayed
    // Table exists, therefore remove it
    const table = headerElement.parentNode; // Get the parent table element
    table.parentNode.removeChild(table); // Remove the stuff appended to the table
    //the html table seems to still exist after this
  }

//build the rows of the table. First create a row for headers which have different style
  let headerRow = table.insertRow();
  headerRow.classList.add('headerRow');
  headerRow.id='headerRow'; //this id is to be able to identify if a list has already been shown on the table 

//HEADER get the headers from the data
  let headers = Object.keys(dataForList[0]);
    console.log("Headers = " + headers);
//HEADER create cells in the table and insert the header names
    for (var head in headers) {
     cell = headerRow.insertCell(); cell.textContent = headers[head];
     }

// Data ROWS - outer loop is for the number of rows there are in dataForList     
console.log("Length of rowData:", dataForList.length, "currentPage= ", currentPage);//if length < limit, this is final page
if(dataForList.length < limit){ finalPage=true; console.log('Loop finalPage=', finalPage)}else finalPage=false;
for (const rowData of dataForList) {

      //console.log("currentPage= ", currentPage);


      const row = table.insertRow();
      row.classList.add('table-row'); // need a listener for each row

      //row.addEventListener('click',() => { console.log("clicked", rowData[0]);})

      row.addEventListener('click',() => { //rowKey=row.cells[0].textContent;
//copy the entire row with headers for later processing
        const rowData = {};
        for (let i = 0; i < row.cells.length; i++) {
            rowData[headers[i]] = row.cells[i].textContent;
        }

//       console.log("Clicked row data:", rowData);
        displayOnCard(rowData);


/*        the below also worked to collect values without headers
        const rowData = [];
        for (const cell of row.cells) {
            rowData.push(cell.textContent);
                                      }
*/
                                      //        console.log("Clicked row data:", rowData);
      //for (header in rowData) output+= row.cells[header].textContent +"&";
     // console.log(output);
        // displayOnCard(rowData);
      //const firstCell = row.cells[0];
      //const firstCellValue = firstCell.textContent; 
      // console.log("Clicked row with first cell value:", firstCellValue);
       });

      //Inner loop is for how many columns there are in each row
      for (const header in rowData) {
        const cell = row.insertCell();
        cell.textContent = rowData[header]; // how this works is beyond me
      }
    }
   //add the pageDisplayed & totalPages to left of nav buttons  "Page X of Y Pages"
   document.getElementById('pageDisplayed').innerHTML= offset/limit+1;
   document.getElementById('pageTotal').innerHTML=limit;
} /////////////////////////////////////////////////////////////////                     end of displayOnList()


//store whatever function was last used. Can then reuse that function by  currentShowFunc();
var currentShowFunc=showSummary(); 




////////////////////////////////////////////////////////                functions called from the menu



//   DIFFERENT                                     The four longer rectangular side faces. 
async function showStudents() {//display students
  prism.style.transform = "translateZ(-100px)";
  currentShowFunc=showStudents; // this doesn't assign the function to the variable, it calls the function in a loop
  //should open list slider
//  sliding_panel_container.classList.toggle('visible');//opens card
   if (!list_sliding_panel_container.classList.contains('visible')) {
    list_sliding_panel_container.classList.add('visible');
  }

  //need fetch data: students
//  readDbThenDisplay("../QueryDb/QueryDbAllStudents");
studentData= await fetchDb('../QueryDb/QueryDbAllStudents.php');
document.getElementById('panel').innerHTML='The students & Manager data is identical. It shows which members are students on a one of more tasks.<br>'+
'Each student has a unique reference and other details  ManagerId,  ManagerName,  Stage,  StudentId,  StudentName,  TLId,  TaskId,   TaskName';
displayOnList(studentData);
}


async function showStudentTasks() {
  const memberId = encodeURIComponent(document.getElementById("studentId").value);
    const str="MemberId="+ memberId;
    console.log(str);

  studentData= await fetchDbSingle('../QueryDb/QueryDBTasklistByStudent.php',str);
   if (!list_sliding_panel_container.classList.contains('visible')) {
    list_sliding_panel_container.classList.add('visible');
  }
  //displayOnList(studentData);
  currentShowFunc=showStudentTasks;

}

async function showManagers() {//display managers
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  //need fetch data: managers - identical data to all students?
  managerData= await fetchDb('../QueryDb/QueryDbAllManagers.php');
  document.getElementById('panel').innerHTML='The students & Manager data is identical. It shows which members are managers on a one of more tasks.<br>'+
  'Each manager has a unique reference and other details  ManagerId,  ManagerName,  Stage,  StudentId,  StudentName,  TLId,  TaskId,   TaskName';
  displayOnList(managerData);
  currentShowFunc=showManagers;

  if (!list_sliding_panel_container.classList.contains('visible')) {
    list_sliding_panel_container.classList.add('visible');
  }
 // list_sliding_panel_container.classList.toggle('visible');
}







async function showMembers() {//display user details
  prism.style.transform = "translateZ(-100px) rotateY( 180deg)";
  //need fetch data: members
  memberData= await fetchDb('../QueryDb/QueryDbMembers.php');
  document.getElementById('panel').innerHTML='The member table shows   MId,  MUserName,  MEmail,  MDate';
  //document.getElementById("panel").innerHTML = "Members [" + memberData[0].MId + "]";
  displayOnList(memberData);
  currentShowFunc=showMembers;
  if (!list_sliding_panel_container.classList.contains('visible')) {
    list_sliding_panel_container.classList.add('visible')};
//  list_sliding_panel_container.classList.toggle('visible');
}


async function showAuthorsTasks() {//display tasks
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  //need fetch data: tasks & stages
authorDataTasks= await fetchDb('../QueryDb/QueryDbTaskHeaders.php'); 
authorDataStages = await fetchDb('../QueryDb/QueryDbStages.php'); 
document.getElementById('panel').innerHTML='The authors data is collected from two tables. The taskheader has a unique reference and other columns<br> THId, TaskName, TaskDesc, TaskAuthor, TaskFaq, TaskDate. '+
 'The stages table has a unique reference and other columns<br> TSId,  TaskId,  StageNum,   StageDesc,   StageAuthor, StageFaq, StageDate';
  //$sql = "SELECT * FROM `tasksheader`";
  //$sql = "SELECT * FROM `tasksstages`;"
  displayOnList(authorDataTasks);
 // displayOnList(authorDataStages); // The 2nd one is added to bottom of first, but they don't fit on panel. Need to do separately
 currentShowFunc=showAuthorsTasks;
  if (!list_sliding_panel_container.classList.contains('visible')) {
    list_sliding_panel_container.classList.add('visible');
  }
}

async function showAuthorsStages() {//display tasks
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  //need fetch data: tasks & stages
authorDataTasks= await fetchDb('../QueryDb/QueryDbTaskHeaders.php'); 
authorDataStages = await fetchDb('../QueryDb/QueryDbStages.php'); 
document.getElementById('panel').innerHTML='The authors data is collected from two tables. The taskheader has a unique reference and other columns  THId,  TaskName,  TaskDesc,  TaskAuthor,  TaskFaq,  TaskDate.  '+
 'The stages table has a unique reference and other columns  TSId,  TaskId,  StageNum,   StageDesc,   StageAuthor,  StageFaq,  StageDate';
  //$sql = "SELECT * FROM `tasksheader`";
  //$sql = "SELECT * FROM `tasksstages`;"
 // displayOnList(authorDataTasks);
  displayOnList(authorDataStages); // The 2nd one is added to bottom of first, but they don't fit on panel. Need to do separately
  currentShowFunc=showAuthorsStages;
   if (!list_sliding_panel_container.classList.contains('visible')) {
    list_sliding_panel_container.classList.add('visible');
  }
}



//    DIFFERENT                             The four longer rectangular side faces. 

async function showTasklist() {//display students
  prism.style.transform = "translateZ(-100px)";
  document.getElementById('panel').innerHTML='The tasklist shows anyone who has been assigned a task or has chosen a task.<br>'+
  'Each assigned task has a unique reference and other columns  TLId,  TaskId,  StudentId,  ManagerId,  Stage,  TaskListDate';
  //memberData= await fetchDb('../QueryDb/QueryDBTasklistFull.php');
  

  //need fetch data: 
tasklistData= await fetchDb('../QueryDb/QueryDbTaskListFull.php');
displayOnList(tasklistData);
currentShowFunc=showTasklist;
if (!list_sliding_panel_container.classList.contains('visible')) {
  list_sliding_panel_container.classList.add('visible');
}
}

async function showTasks() {//display managers
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  //need fetch data: 
  taskData= await fetchDb('../QueryDb/QueryDbTaskHeaders.php');
  document.getElementById('panel').innerHTML='The tasks table shows what tasks have been designed.<br>'+
  'Each task has a unique reference and other columns  THId,  TaskName,  TaskDesc,  TaskAuthor,  TaskFaq,  TaskDate';

  'The task table has a unique reference and other columns  THId,  TaskName,  TaskDesc,  TaskAuthor,  TaskFaq,  TaskDate'
  displayOnList(taskData);
  currentShowFunc=showTasks;
   if (!list_sliding_panel_container.classList.contains('visible')) {
    list_sliding_panel_container.classList.add('visible');
  }
}


async function showStages() {//display user details
  prism.style.transform = "translateZ(-100px) rotateY( 180deg)";
  //need fetch data:
  stagesData= await fetchDb('../QueryDb/QueryDbStages.php'); 
  document.getElementById('panel').innerHTML='The stages table shows what stages for the task have been designed.<br>'+
  'Each stage has a unique reference and other columns  TSId,  TaskId,  StageNum,   StageDesc,   StageAuthor,  StageFaq,  StageDate';
  displayOnList(stagesData);
  currentShowFunc=showStages;
   if (!list_sliding_panel_container.classList.contains('visible')) {
    list_sliding_panel_container.classList.add('visible');
  }
}



function showOTHER() {// not used
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  //need fetch data: 
}

//}

//   SAME  The two square end faces. Summary and Management links
function showSummary() { /* SUMMARY end face   z axis much closer so bigger*/
  prism.style.transform = "translateZ(100px) rotateX( 90deg)";
  //need fetch data: summary counts
}

function showManage() {//links to tasks z axis much closer so bigger
  prism.style.transform = "translateZ(100px) rotateX( -90deg)";
}




/*                                                                        OLD   utility connect & send request for a php file                                */
function XMLRequest($fileURL,str){  //OLD
  document.getElementById("panel").innerHTML+="js XMLRequest()$fileURL: "+$fileURL+"<br>"; 
  document.getElementById("panel").innerHTML+="js XMLRequest()str: "+str+"<br>";
  var request= new XMLHttpRequest();
  request.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
    //must call response text?  Have I left something out? Wierd, if I comment this like out the script fails
    document.getElementById("panel").innerHTML=" Db call, this.responseText: "+ request.responseText +"<br>";
    //console.log(XMLRequest.response);
     // console.log(XMLRequest.responseText); //tried these - "undefined"

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
 // document.getElementById("panel").innerHTML+=" dBtasklistFull() ";
 // XMLRequest("../queryDb/QueryDbTasklistFull.php","");
fetchDb('../queryDb/QueryDbTasklistFull.php');
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

async function memberById(){//need get the MId? and pass it on?
  const memberId = encodeURIComponent(document.getElementById("MemberId").value);
    const str="MemberId="+ memberId;
    console.log(str);

  const data= await fetchDbSingle('../QueryDb/QueryDbMemberById.php',str);
  console.log(data);
}   

async function taskById(){//need get the MId? and pass it on?
  const memberId = encodeURIComponent(document.getElementById("MemberId").value);
    const str="TaskId="+ memberId;
    console.log(str);

  const data= await fetchDbSingle('../QueryDb/QueryDbMemberById.php',str);
  console.log(data);
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
  //XMLRequest("../queryDb/QueryDbTasklistKeys.php");
fetchDb('../queryDb/QueryDbTasklistKeys.php');
}

function dbAssignedDetails(){
//  XMLRequest("../queryDb/QueryDbTasklistFull.php");
fetchDb('../queryDb/QueryDbTasklistFull.php');
}

async function dbTaskHeaders(){ //but this data already collected in summary

  //XMLRequest("../queryDb/QueryDbTaskHeaders.php");  
const data= await fetchDb('../QueryDb/QueryDbTaskHeaders.php');
//console.log(await this.fetchDb('../QueryDb/QueryDbTaskHeaders.php'));
console.log(data);
}

function dbTaskStages(){
//  XMLRequest("../queryDb/QueryDbStages.php");  
fetchDb('../QueryDb/QueryDbStages.php');
}

async function dbMembers(){
//  XMLRequest("../queryDb/QueryDbMembers.php");
data= await fetchDb('../queryDb/QueryDbMembers.php');

}


/*                                                       OLD                       Tasks                                                     */

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
  return false;
}


async function dbTaskHeader(){

  var taskId = encodeURIComponent(document.getElementById("taskTHId").value);
  var str="taskId="+ taskId;
  document.getElementById("panel").innerHTML+="listByTask()taskID: "+taskId+"<br>";    
  document.getElementById("panel").innerHTML+="listByTask()str: "+str+"<br>";
  if (taskId=="") { 
    document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
  } else {document.getElementById("panel").innerHTML+="js reports has no nullS=<br>  ";}

  
    const data= await fetchDbSingle('../QueryDb/QueryDbTaskById.php',str);
    console.log(data);
  }   


  async function dbTaskStage(){

    var Id = encodeURIComponent(document.getElementById("stageTSId").value);
    var str="stageTSId="+ Id;
    document.getElementById("panel").innerHTML+="listByTask()taskID: "+Id+"<br>";    
    document.getElementById("panel").innerHTML+="listByTask()str: "+str+"<br>";
    if (Id=="") { 
      document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
    } else {document.getElementById("panel").innerHTML+="js reports has no nullS<br>  ";}
  
    
      const data= await fetchDbSingle('../QueryDb/QueryDbTaskStageById.php',str);
      console.log(data);
    }   


    async function dbAssignedTask(){

      var Id = encodeURIComponent(document.getElementById("tasklistTLId").value);
      var str="tasklistTLId="+ Id;
      document.getElementById("panel").innerHTML+="listByTask()taskID: "+Id+"<br>";    
      document.getElementById("panel").innerHTML+="listByTask()str: "+str+"<br>";
      if (Id=="") { 
        document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
      } else {document.getElementById("panel").innerHTML+="js reports has no nullS<br>  ";}
    
      
        const data= await fetchDbSingle('../QueryDb/QueryDbTasklistById.php',str);
        console.log(data);
      }   





/*
function dbTaskHeader(){

  var TaskId = encodeURIComponent(document.getElementById("taskTHId").value);
  var str="taskId="+ TaskId;
  document.getElementById("panel").innerHTML+="listByTask()taskID: "+TaskId+"<br>";    
  document.getElementById("panel").innerHTML+="listByTask()str: "+str+"<br>";
  if (TaskId=="") { 
    document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
  } else {document.getElementById("panel").innerHTML+="js reports has no nullS=<br>  ";



  XMLRequest("../test/cookieTest.php",str);      // Test of cookies   Should be different php file
  
  
  
  //does set cookies, but so far can't find them here, but can if run getcookie in own html file.

  setTimeout(() => {      /* does this need a delay to make sure cookie set? */
  /*
    document.getElementById("taskTitle").innerHTML= getCookie("TaskTitle");
    document.getElementById("taskDesc").innerHTML= getCookie("TaskDesc");
    document.getElementById("taskNumber").innerHTML= getCookie("THId"); }, 500);

}
} */

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

function taskStagesCard(){  // old?
  var TaskId = encodeURIComponent(document.getElementById("taskTHId").value);
  var str="taskId="+ TaskId;
  document.getElementById("panel").innerHTML+="listByTask()taskID: "+TaskId+"<br>";    
  document.getElementById("panel").innerHTML+="listByTask()str: "+str+"<br>";
  if (TaskId=="") { 
    document.getElementById("panel").innerHTML+="Can't send to database because of lack of input(BAD null)<br>  ";  
  } else {document.getElementById("panel").innerHTML+="js reports has no nullS=<br>  ";
    XMLRequest("../queryDb/QueryDbTaskStagesCard.php",str); 

    setTimeout(() => {      /* does this need a delay to make sure cookie set? */
      //document.getElementById("panel").innerHTML+="Cookie of: StagesForTask"+TaskId+"<br>";    
      var cookie, i=1;  
    
while(cookie=(getCookie("Task"+TaskId+"Stages"+i)))//have to guess the stage numbers?
      {cookie2=JSON.parse(cookie);//this is an object it seems
      document.getElementById("panel").innerHTML+= "Task "+TaskId+" Stage "+i+"  "+cookie+"<br>";
      i++;
    } 

    }, 1000);
  

}
}

/*                                                                              Personal Db display                                       */

function myDbDetails(){
  /* need to pass the value in the MemberId input box */
  //XMLRequest("../queryDb/QueryDbMyDetails.php");
}

/*                                OLD??         fails                     call for 1 datum from the card??? */
function displayTHId(){
	THId=document.getElementById('taskTHId').value;
	if (THId == "") {
		document.getElementById('taskTHID').innerHTML = "?";
		return;
	} else { 
		document.getElementById('taskTHId').innerHTML = THId;
		str="taskID="+THId;
		XMLRequest("../queryDb/QueryDbIDTEST.php",THId)
	  }

}





/*                       floating panel for list         */
const list_sliding_panel_container = document.querySelector('.list-sliding-panel-container');

//                      floating   table display

//create a table and give it a class for css to use
const table = document.createElement('table');
table.classList.add('table');

document.getElementById('table').appendChild(table);


// nav buttons for list table

const tableListNav = document.createElement('table');
tableListNav.classList.add('tableListNav');
tableListNav.id="list-nav";


row = tableListNav.insertRow();row.classList.add('nav-row');
cell = row.insertCell();cell.classList.add('nav-cell');

let cardKeyTitle = document.createElement('h6');
cardKeyTitle.style.color='black';
cardKeyTitle.className = 'h6';
cardKeyTitle.textContent="Page";
cell.appendChild( cardKeyTitle);

cell = row.insertCell(); cell.classList.add('nav-cell'); cell.id='pageDisplayed';
cell.textContent='X';
cell = row.insertCell(); cell.classList.add('nav-cell'); 
cardKeyTitle = document.createElement('h6');
cardKeyTitle.style.color='black';
cardKeyTitle.className = 'h6';
cardKeyTitle.textContent="of";
cell.appendChild( cardKeyTitle);

cell = row.insertCell(); cell.classList.add('nav-cell'); cell.id='pageTotal';
cell.textContent='Y';
cell = row.insertCell(); 
cell.classList.add('nav-cell'); 

cardKeyTitle = document.createElement('h6');
cardKeyTitle.style.color='black';
cardKeyTitle.className = 'h6';
cardKeyTitle.textContent="Rows";
cell.appendChild( cardKeyTitle);

cell = row.insertCell(); 
cell.classList.add('nav-cell'); 
let cardDiv = document.createElement('button');
cardDiv.className='btn';
cardDiv.id='PageSkipBack100';
cardDiv.textContent='Skip back <<<< 100 pages';
cell.appendChild( cardDiv);

cell = row.insertCell(); 
cell.classList.add('nav-cell'); 
cardDiv = document.createElement('button');
cardDiv.className='btn';
cardDiv.id='PageSkipBack10';
cardDiv.textContent='Skip back << 10 pages';
cell.appendChild( cardDiv);

cell = row.insertCell(); 
cell.classList.add('nav-cell'); 
cardDiv = document.createElement('button');
cardDiv.className='btn';
cardDiv.id='PreviousPage';
cardDiv.textContent='Previous page';
cell.appendChild( cardDiv);


cell = row.insertCell(); 
cell.classList.add('nav-cell'); 
cardDiv = document.createElement('div');
cardDiv.className='stageNumber';
cardDiv.id='page';
cardDiv.textContent='1';
cell.appendChild( cardDiv);


cell = row.insertCell(); 
cell.classList.add('nav-cell'); 
cardDiv = document.createElement('button');
cardDiv.className='btn';
cardDiv.id='NextPage';
cardDiv.textContent='Next page';
cell.appendChild( cardDiv);

cell = row.insertCell(); 
cell.classList.add('nav-cell'); 
cardDiv = document.createElement('button');
cardDiv.className='btn';
cardDiv.id='PagesSkipAhead10';
cardDiv.textContent='Skip ahead >> 10 pages';
cell.appendChild( cardDiv);

cell = row.insertCell(); 
cell.classList.add('nav-cell'); 
cardDiv = document.createElement('button');
cardDiv.className='btn';
cardDiv.id='PagesSkipAhead100';
cardDiv.textContent='Skip  ahead >>>> 100 pages';
cell.appendChild( cardDiv);


document.getElementById('listSlider').appendChild(tableListNav);


//floating card button

        cardDiv = document.createElement('button');
        cardDiv.id = 'card-floating-btn';   
        cardDiv.className = 'card-floating-btn';
        cardDiv.textContent="# Open or close Card view";
        document.body.appendChild(cardDiv);//visible

//floating list button

        cardDiv = document.createElement('button');
        cardDiv.id = 'list-floating-btn';   
        cardDiv.className = 'list-floating-btn';
        cardDiv.textContent="= Open or close List view";
        document.body.appendChild(cardDiv);//visible





//                      The preset old Card display (jsCard columns + nav)

//var taskNumber=37, currentTask=37;//arbitrary test numbers
/*
        cardDiv = document.createElement('div');
        cardDiv.id = 'jscard';   
        cardDiv.className = 'course';
           //courseDiv.textContent = 'CourseDiv';
        //document.body.appendChild(cardDiv);  

cardSlider.appendChild(cardDiv);

//div 1 of top card - for row key
let cardKeyDiv = document.createElement('div');
cardKeyDiv.id='cardTopOne';
cardKeyDiv.className='task-left';
*/
/*
cardKeyTitle = document.createElement('h6');
//cardKeyTitle.textContent = 'Key';
cardKeyTitle.style.color='white';
cardKeyTitle.className = 'h6';
cardKeyTitle.style.position='absoloute';
cardKeyTitle.id="cardKeyNumber";

cardKeyDiv.appendChild(cardKeyTitle);
*/

/*
let keyContent = document.createElement('div');
keyContent.id='cardKeyName';
keyContent.textContent="Key from db";

cardKeyDiv.appendChild(keyContent);

cardDiv.appendChild(cardKeyDiv);     
*/

//here
/*
function createCardDiv(j){
//create another div of top card

let cardDivj=document.createElement('div');
//cardDivj.style.padding= '0px 0px 0px 0px';
//cardDivj.className='course-info';
//console.log(cardDivj.id);
	
let cardDivTitle = document.createElement('line');
	cardDivTitle.style.padding='3px';
cardDivj.id='column'+i+' of '+rowLength;
cardDivTitle.textContent = cardDivj.id 
//cardDivTitle.style.color='black';
//cardDivTitle.className = 'h6';
	
let cardDivContent = document.createElement('p');
	cardDivContent.style.backgroundColor='lightgrey';
cardDivContent.id='divContent'+i;
cardDivContent.textContent="col "+i+" from db with an unknown amount of text. Where will it go?";

	cardDivTitle.appendChild(cardDivContent);

	cardDiv.appendChild(cardDivTitle);

	
cardDiv.appendChild(cardDivj);     
//end of a column creation
}
	*/
	
//let rowLength=5; //test to create columns in card
//for (var i = 2; i < rowLength+1; i++) {
//	createCardDiv(i);
 //console.log(i);
 // more statements
//}



//                    old fixed card nav    jsCard nav buttons & display
/*
let cardDivNav=document.createElement('div');
cardDivNav.id='cardDivNav';
cardDivNav.className='stageNumber-info';
//cardDivNav.textContent = "cardDivNav";
cardDiv.appendChild(cardDivNav);
*/



//                    End of jsCard



//                      Stages card (Name, desc, + nav)


var stageNumber=1, currentStage=1; //arbitrary test numbers


        cardDiv = document.createElement('div');
        cardDiv.id = 'jscardStages';   
        cardDiv.className = 'course';
        //courseDiv.textContent = 'stages';
        //document.body.appendChild(cardDiv);  

cardSlider.appendChild(cardDiv);


//stage name title & actual stage name
cardKeyDiv = document.createElement('div');
cardKeyDiv.id='cardKeyStages';
cardKeyDiv.className='stage-left';

cardKeyTitle = document.createElement('h6');
cardKeyTitle.style.color='black';
cardKeyTitle.className = 'h6';
cardKeyTitle.style.position='absoloute';
cardKeyTitle.id="cardKeyStages";
cardKeyTitle.textContent="stageName";

cardKeyDiv.appendChild(cardKeyTitle);


keyContent = document.createElement('div');
keyContent.id='stageName';
keyContent.textContent="Insert stage name from db  (stageName)";

cardKeyDiv.appendChild(keyContent);
cardDiv.appendChild(cardKeyDiv);  


//            description div of stages card

cardDivj=document.createElement('div');
	
cardDivTitle = document.createElement('h6');
cardDivTitle.style.padding='3px';
//cardDivj.id='stageDescription';
cardDivTitle.textContent = 'Stage Description'; 
cardDivTitle.className = 'h6';;
//cardDivTitle.style.color='black';
//cardDivTitle.className = 'h6';
cardDivj.appendChild(cardDivTitle);
	
cardDivContent = document.createElement('div');
cardDivContent.id='stageDesc';
cardDivContent.className="stage-info";
cardDivContent.textContent="Insert stage Description (stageDecs)...with an unknown amount of text. Where will it go?";

	cardDivj.appendChild(cardDivContent);

	cardDiv.appendChild(cardDivj);
	  
//end of description div of stages car


//                         stagesCard nav buttons & display

stagesDivNav=document.createElement('div');
stagesDivNav.id='stagesDivNav';
stagesDivNav.className='stageNumber-info';
//cardDivNav.textContent = "cardDivNav";
cardDiv.appendChild(stagesDivNav);

const tableNavStages = document.createElement('table');
tableNavStages.classList.add('tableNav');

//cardDivNav.appendChild(tableNav);//why is this here?

tableTopRow= tableNavStages.insertRow();
tableTopRow.classList.add('tableTopRow');

cell = tableTopRow.insertCell();cell.classList.add('table-cell'); 

cardKeyTitle = document.createElement('h6');
cardKeyTitle.textContent = 'stage';
cardKeyTitle.style.color='black';
cardKeyTitle.className = 'h6';
cell.appendChild( cardKeyTitle);

cell = tableTopRow.insertCell(); cell.classList.add('table-cell');
cell.id="SLId";

//                       stages nav buttons

table2ndRow= tableNavStages.insertRow();
table2ndRow.classList.add('table2ndRow');
cell = table2ndRow.insertCell(); 
cell.classList.add('table-cell'); 
cell.colSpan = 2;

previousButtonStages = document.createElement('button');
previousButtonStages.innerText = 'Previous';
       // button.setAttribute('onclick', 'function()');
previousButtonStages.classList.add('btn');
cell.appendChild(previousButtonStages);
previousButtonStages.id="Previous";

table3rdRow= tableNavStages.insertRow();
table3rdRow.classList.add('table3rdRow');
cell = table3rdRow.insertCell(); 
cell.classList.add('stageNumber'); 
cell.colSpan = 2;
cell.id="stage";
cell.textContent = currentStage;

table4thRow= tableNavStages.insertRow();
table4thRow.classList.add('table4thRow');
cell = table4thRow.insertCell(); 
cell.classList.add('table-cell'); 
cell.colSpan = 2;
nextButtonStages = document.createElement('button');
nextButtonStages.innerText = 'Next';
nextButtonStages.id="Next";
       // button.setAttribute('onclick', 'function()');
nextButtonStages.classList.add('btn');
cell.appendChild(nextButtonStages);

//end of stagesCard nav

document.getElementById('stagesDivNav').appendChild(tableNavStages);

//end of stagesCard



/*                       floating button         open/close jsCard  & stagesCard*/
const card_floating_btn = document.querySelector('.card-floating-btn');
const sliding_panel_container = document.querySelector('.sliding-panel-container');



/* Reactions to clicks on nav buttons or displayed numbers*/

/*                                   
Click [Previous]  [Next] to choose which item to display. Click the displayed [number] to confirm.
When item on display is the same as the number displayed the background becomes green */ 


/*                    Previous/Next buttons          change task number*/
//const previousTask_btn = document.querySelector('#PreviousTask');
//const task= document.querySelector('#task');
//const nextTask_btn = document.querySelector('#NextTask');

//document.getElementById('task').innerHTML=taskNumber;/*Large stage number on right*/

//document.getElementById('cardKeyNumber').innerHTML=taskNumber;/*small stage number on right*/

function showTaskColor(currentItem,itemNumber){
	
		if(currentItem == itemNumber){displayItem.style.backgroundColor = 'lightgreen';
} else displayItem.style.backgroundColor = '#ffd';			  

}

//showTaskColor(currentItem,itemNumber);


/*                    Previous          change stage number*/

//previousTask_btn.addEventListener('click', () => {
 //taskNumber--;
// if(taskNumber<1)taskNumber=1;
	/*Large task number on right*/
// document.getElementById('task').innerHTML=taskNumber;
	/*small task number on left*/

	/*don't change the small taskId until the task being displayed changes*/
/* document.getElementById('taskId').innerHTML=taskNumber;*/

	/*Change color when displaying the current task */
//showTaskColor();
//})


/* If click the task number, the display should now display this task.  Can click previous/next to choose a task number, but clicking the number confirms the choice and then displays that task  */
/*
const taskDisplay = document.querySelector('#task');
taskDisplay.addEventListener('click', () => {
	/*click the displayed page number to deliver data*/
	/* Need call a php pagination script*/
	/*
  currentTask=taskNumber;
	document.getElementById("task").innerHTML="*"+taskNumber;
showTaskColor();
/*	document.getElementById('taskId').innerHTML=taskNumber;*/
//		document.getElementById('cardKey').innerHTML="Awaiting db for "+taskNumber;
		
//});


/*                    Next          change task number*/
//nextTask_btn.addEventListener('click', () => { taskNumber++; document.getElementById('task').innerHTML=taskNumber;/*Large task number on right*/
/*don't change the taskId until the page change is confirmed*/											  
/*document.getElementById('taskId').innerHTML=taskNumber;	*/
//showTaskColor();		 })


/*end of pages javscript on buttons & display of task number*/


/*                                   Stages   
Click [Previous]  [Next] to choose which stage to display. Click the displayed [number] to confirm. When stage on display is the same as the number displayed the background becomes green */ 

/*                    Previous/Next buttons          change stage number*/
const previous_btn = document.querySelector('#Previous');
const stage = document.querySelector('#stage');
const next_btn = document.querySelector('#Next');


function showStageColor(){
		if(stageNumber==currentStage){stage.style.backgroundColor = 'lightgreen';
} else stage.style.backgroundColor = '#ffd';			  
}

showStageColor();
		document.getElementById('SLId').innerHTML=stageNumber;/*small stage number on right*/

/*                    Previous          change stage number*/
previous_btn.addEventListener('click', () => {
 stageNumber--;
 if(stageNumber<1)stageNumber=1;
	/*Large stage number on right*/
 document.getElementById('stage').innerHTML=stageNumber;
	/*small stage number on left*/
/*document.getElementById('SLId').innerHTML=stageNumber;*/

	/*Change color when displaying the current stage */
showStageColor();
})


/* If click the stage number, the display should now display this stage.  Can click previous/next to choose a stage number, but clicking the number confirms the choice and then displays that stage  */

const stageDisplay = document.querySelector('#stage');
stageDisplay.addEventListener('click', () => {
	/*click the displayed page number to deliver data*/
	/* Need call a php pagination script*/
	currentStage=stageNumber;
	document.getElementById("stage").innerHTML="*"+stageNumber;
showStageColor();
	document.getElementById('stageDesc').innerHTML="Awaiting db for "+stageNumber;
		document.getElementById('stageName').innerHTML="Awaiting db for "+stageNumber;
	//document.getElementById('taskDesc').innerHTML="Awaiting db for "+taskNumber;
		document.getElementById('SLId').innerHTML=stageNumber;/*small stage number on right*/

/*		document.getElementById('SLId').innerHTML=stageNumber;*/
		/*Call for the php*/
	/* display the data */
});


/*                    Next          change stage number*/
next_btn.addEventListener('click', () => { stageNumber++; document.getElementById('stage').innerHTML=stageNumber;/*Large stage number on right*/
/*document.getElementById('SLId').innerHTML=stageNumber;*/	
showStageColor();		 })


/*react to button to make panel visible / invisible. css animates it*/
card_floating_btn.addEventListener('click', () => {
	sliding_panel_container.classList.toggle('visible')
});

/* list panel  */

/* open/close task card */
const list_floating_btn = document.querySelector('.list-floating-btn');
/*react to button to make panel visible / invisible. css animates it*/
list_floating_btn.addEventListener('click', () => {
	list_sliding_panel_container.classList.toggle('visible')
});


/*                                Table  Pages   
Click [Previous]  [Next] to choose which page of database rows to display. Click the displayed [number] to confirm. When page on display is the same as the number displayed the background becomes green */ 


function showPageColor(){
		if(currentPage==pageNumber){page.style.backgroundColor = 'lightgreen';} else page.style.backgroundColor = "rgb(203, 199, 170)";  
}
showPageColor();





/////////////////////////////////////                                            LIST nav buttons eventListeners

const PagesSkipBack100 = document.querySelector('#PageSkipBack100');
      PagesSkipBack100.addEventListener('click', () => {
	if(pageNumber>100){pageNumber-=100} else {pageNumber=1};
		  	document.getElementById("page").innerHTML=pageNumber;
		showPageColor();  
});
const PagesSkipBack10 = document.querySelector('#PageSkipBack10');
PagesSkipBack10.addEventListener('click', () => {
		if(pageNumber>10){pageNumber-=10} else {pageNumber=1};
		  	document.getElementById("page").innerHTML=pageNumber;
	showPageColor();
});
PreviousPage.addEventListener('click', () => {
	if(pageNumber>1) pageNumber--;	
	document.getElementById("page").innerHTML=pageNumber;
	showPageColor();

});

/*Clicking on the page number is confirmation to display that page of data. The background color changes & a php script is called to deliver that page of table rows */

const Page = document.querySelector('#page');
page.addEventListener('click', () => {
	/*click the displayed page number to deliver data*/
	/* Need call a php pagination script*/ 
console.log('Click NUMBER  finalPage=',finalPage, 'pageNumber=',pageNumber);
  if(finalPage && (pageNumber>currentPage)) {pageNumber=currentPage; 	document.getElementById("page").innerHTML=pageNumber;} else
 {   
    currentPage=pageNumber;
	document.getElementById("page").innerHTML="*"+pageNumber;	
}
showPageColor();
currentShowFunc(); //Re-run the most recent show function as soon as the page number is clicked on to update the list
});

const NextPage = document.querySelector('#NextPage');
NextPage.addEventListener('click', () => {
	pageNumber++;
	document.getElementById("page").innerHTML=pageNumber;
	showPageColor();
});
const PagesSkipAhead10 = document.querySelector('#PagesSkipAhead10');
PagesSkipAhead10.addEventListener('click', () => {
	pageNumber+=10;
	document.getElementById("page").innerHTML=pageNumber;
	showPageColor();
});
const PagesSkipAhead100 = document.querySelector('#PagesSkipAhead100');
PagesSkipAhead100.addEventListener('click', () => {
pageNumber+=100;
	document.getElementById("page").innerHTML=pageNumber;
	showPageColor();
});