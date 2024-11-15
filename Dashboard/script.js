/*                                   The webpage has some of its function on the 4 faces of an elongated cube called a Prism                     
                                     The 4 long faces are for main functions. 
                                     One end face has links to other webpages. 
                                     The other end is a summary display (dashboard)
                                     The web page menu at the top calls functions on this single page.
                                     The summary has a people section & a task section
                                     There is a people.html & a tasl.html which use the same js & css. 
                                     The color of the pages is different.   
*/

const logToConsole=true;
//const logToConsole=false; 

let prism = document.querySelector(".rec-prism");
let title = document.querySelector(".title");
titleValue = document.getElementById('title').getAttribute('value');
document.getElementById('panel').textContent += 'This is the page for: ' + titleValue;

//floating card button

let cardDiv = document.createElement('button');
cardDiv.id = 'card-floating-btn';
cardDiv.className = 'card-floating-btn';
cardDiv.textContent = "# Open or close Card view";
document.body.appendChild(cardDiv);

//floating list button

cardDiv = document.createElement('button');
cardDiv.id = 'list-floating-btn';
cardDiv.className = 'list-floating-btn';
cardDiv.textContent = "= Open or close List view";
document.body.appendChild(cardDiv);


/*                       floating button         open/close jsCard  & stagesCard*/
const card_floating_btn = document.querySelector('.card-floating-btn');
const sliding_panel_container = document.querySelector('.sliding-panel-container');


var summaryData = [];//assuming the php returns an array of this kind
var pageNumber = 1, currentPage = 1, limit = 10, offset = 0;

let dataByIdGlobal=[];

//variables for doing db reads by page
var lengthOfLatestRead = 0; //this is the size of the latest query result. Wrong. Wanted to know how big a full read would be.
var limit, offset;

//store whatever function was last used. Can then reuse that function by  currentShowListFunc() or currentTableByIdFunction;
var currentShowListFunc = showSummary; //for displaying lists from specific tables
var currentTableByIdFunction = memberById;          //for card display of a single row of a table

var stageNumber = 1, currentStage = 1; //arbitrary test numbers
var currentStep = 1, stepNumber =1;
//                                                   create javascript names for places in the webpage

/*                                                    summary face
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

} */


////////////////////////////////////////////////////////                                summary 

// fetch the summary data
fetchSummary();
/* Display the summary face as the first display */
showSummary();
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

   document.getElementById('panel').innerHTML = 'The main numbers from the database. This is the people page<br> Click an entry for details & actions';

}

//                    DIFFERENT                                    data specific to this page
function putDataInFaces(summaryData) {

  if (titleValue == 'people') {
    document.getElementById("totalStudent").value = "Students [" + summaryData[0].countStudents + "]";
    document.getElementById("totalManagers").value = "Managers [" + summaryData[0].countManagers + "]";
    document.getElementById("totalMembers").value = "Members [" + summaryData[0].countMembers + "]";
    document.getElementById("totalAuthors").value = "Authors [" + summaryData[0].countAuthors + "]";
  } else //the page is for tasks
  {
    document.getElementById("totalTasklist").value = "TaskList [" + summaryData[0].countTaskList + "]";
    document.getElementById("totalTasks").value = "Tasks [" + summaryData[0].countTasksheaders + "]";
    document.getElementById("totalStages").value = "Stages [" + summaryData[0].countTasksStages + "]";

    document.getElementById('panel').innerHTML = 'The main numbers from the database. This is the task page <br> Click an entry for details & actions';
  }
}

/*                                  Summary database reads                      */
//Fetch() calls to read the database to count all the summary items
//count members, taskheaders, tasksStages, tasklist. Put together in summary=json_encode;

//Put lots of divs in the html or build the html in javascript?  

function fetchSummary() {
  if(logToConsole) console.log('fetchSummary()');
  const url = '../QueryDb/QueryDbFetchSummary.php';/* Need code the PHP */
  fetch(url)
    .then(response => response.json())
    .then(data => {
      //      console.log(data); // For debugging
      summaryData = data;
      putDataInSummary(data);
      putDataInFaces(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
////////////////////////////////////////////////////////                                    end of summary  ////////////////////




////////////////////////////////////////                                      Read a datbase  row              ////////////////////

async function fetchDbSingle(url, str) {
  const dataToSend = str;
  if(logToConsole) console.log('fetchDbSingle(' + str +')');

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






/////////////////////////////////////////////////////                              Read a page from Db to list  

function calculateLimitOffset(currentPage) {//pageNumber is the user chosen page to display. It may not exist.
  if(logToConsole) console.log('calculateLimitOffset()');
  if (currentPage == 1) { offset = 0 }
  else { offset = (currentPage - 1) * limit };
  //console.log("pageNumber[" + pageNumber + "]"+ "current Page[" + currentPage + "]  limit ["+ limit +"] offset["+ offset +"]") ;
}


async function fetchDb(url) {
  if(logToConsole) console.log('fetchDb()');
  //  document.getElementById('panel').innerHTML+= "fetchDb()"; 
  calculateLimitOffset(currentPage);
  const dataToSend = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit);

  //no idea why return is written here.It is needed, but in the fetchDbSingle(url, str) it isn't needed ???
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: dataToSend
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // For debugging
      lengthOfLatestRead = data.length; //pointless??
      //    console.log(lengthOfLatestRead);
      return data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}



/////////////////////////////////////////////////////////       read another single row in card from card display

async function memberById(key) {//need get the MId? and pass it on?
  const str = "keyId=" + key + "&tableName=" + "members" + "&keyName=" + "MId";
    if(logToConsole) console.log(' memberById() ');
  const dataById = await fetchDbSingle('../QueryDb/QueryDbTableById.php', str);
  console.log(dataById);
  buildDisplayCardMain(dataById);
  currentTableByIdFunction = memberById;
}

async function memberByIdForm() {//need get the MId? and pass it on?
  if(logToConsole) console.log('membersByIdForm()');
  const memberId = encodeURIComponent(document.getElementById("MemberId").value);
  memberById(memberId);
}

async function studentById(key) {//probably doesn't work as it just reads tasklist instead of doing complicated query
  const str = "keyId=" + key + "&tableName=" + "tasklist" + "&keyName=" + "TLId";
  if(logToConsole) console.log(' studentById() ');
  const dataById = await fetchDbSingle('../QueryDb/QueryDbStudentById.php', str);
  //TableById is generic, doesn't put coliumns in good order & doesn't do foreign key lookup
  //console.log(dataById); //undefined ? Why? & logs BEFORE fetch logs
  buildDisplayCardMain(dataById);
  currentTableByIdFunction = studentById;
}

async function taskById(key) {//need get the MId? and pass it on?
  const str = "keyId=" + key + "&tableName=" + "tasksheader" + "&keyName=" + "THId";
  if(logToConsole) console.log('taskById:' + str);
  const dataById = await fetchDbSingle('../QueryDb/QueryDbTableById.php', str);
  //console.log(dataById); //undefined ? Why? & logs BEFORE fetch logs
  buildDisplayCardMain(dataById);
  currentTableByIdFunction = taskById;
}

async function stagesById(key) {//need get the MId? and pass it on?
  const str = "keyId=" + key + "&tableName=" + "tasksstages" + "&keyName=" + "TSId";
  if(logToConsole) console.log('taskById:' + str);
  const dataById = await fetchDbSingle('../QueryDb/QueryDbTableById.php', str);
  //console.log(dataById); //undefined ? Why? & logs BEFORE fetch logs
  buildDisplayCardMain(dataById);
  currentTableByIdFunction = stagesById;
}

async function tasklistById(key) {//need get the MId? and pass it on?
  const str = "keyId=" + key + "&tableName=" + "tasklist" + "&keyName=" + "TLId";
  if(logToConsole) console.log('taskById:' + str);
  const dataById = await fetchDbSingle('../QueryDb/QueryDbTableById.php', str);
  //console.log(dataById); //undefined ? Why? & logs BEFORE fetch logs
  buildDisplayCardMain(dataById);
  currentTableByIdFunction = tasklistById;
}

/////////////////////////////////////////////////////                         end of ById





////////////////////////////////////////////////////////                functions called from the menu ////////////////////

//   DIFFERENT                                     The four longer rectangular side faces. 
async function showStudents() {//display students
  if(logToConsole) console.log('showStudents()');
  prism.style.transform = "translateZ(-100px)";
  document.getElementById('panel').innerHTML = 'A member who is tackling a task is called a <i>student</i> <br>' +
    'StudentId is the MemberId. The other details are StudentName,  TaskId, TaskName,  Stage (reached in the task), ManagerId,  ManagerName, & TLId (the unique key for this student task)'+
    '<br> Click on a row in the list to display it on a card';
  
  currentShowListFunc = showStudents; // assign the function to the variable, if add () it calls the function in a loop
  currentTableByIdFunction = studentById;
  //should open list slider
  //  sliding_panel_container.classList.toggle('visible');//opens card
  makeListVisible();

  //need fetch data: students
  //  readDbThenDisplay("../QueryDb/QueryDbAllStudents");
  studentData = await fetchDb('../QueryDb/QueryDbAllStudents.php');
  displayOnList(studentData);
}


async function showManagers() {//display managers
  if(logToConsole) console.log('showManagers()');
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  document.getElementById('panel').innerHTML = 'A member who is helping another member with a task is called a <i>Manager</i><br>' +
  'ManagerId is the MemberId. The other details are:<br>' +
    'ManagerName,  StudentId,  StudentName,  TaskId,   TaskName, Stage(the student has reached in the task), TLId (the unique key for this student task) '+
    '<br> Click on a row in the list to display it on a card';
    console.log('showManagers()');
  //need fetch data: managers - identical data to all students?
  managerData = await fetchDb('../QueryDb/QueryDbAllManagers.php');
  //console.log('showManagers='+ managerData); //object object
  displayOnList(managerData);
  currentShowListFunc = showManagers;

  makeListVisible();
  // list_sliding_panel_container.classList.toggle('visible');
}

async function showMembers() {//display user details
  makeListVisible();
  if(logToConsole) console.log('showMembers()');
  prism.style.transform = "translateZ(-100px) rotateY( 180deg)";
  document.getElementById('panel').innerHTML = 'The member table shows the member unique key MId, the user name  MUserName,  email address MEmail, & MDate became a member'+
  '<br> Click on a row in the list to display it on a card';
  //need fetch data: members
  memberData = await fetchDb('../QueryDb/QueryDbMembers.php');

  //document.getElementById("panel").innerHTML = "Members [" + memberData[0].MId + "]";
  currentShowListFunc = showMembers;
  currentTableByIdFunction =memberById;
  displayOnList(memberData);
  //  list_sliding_panel_container.classList.toggle('visible');
}

async function showAuthorsTasks() {//display tasks
  if(logToConsole) console.log('showAuthors()');
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  document.getElementById('panel').innerHTML = 'Tasks & their stages were created by <i>authors</i> whose data is collected from two tables. <p> <i>taskheader</i> a unique reference THId & then <br> TaskName, TaskDesc, TaskAuthor, TaskFaq, TaskDate. ' +
    '<p><i>stages</i> has a unique reference  TSId & then<br>TaskId, StageNum, StageDesc, StageAuthor, StageFaq, StageDate'+
    '<br> Click on a row in the list to display it on a card';
  //need fetch data: tasks & stages
  authorDataTasks = await fetchDb('../QueryDb/QueryDbTaskHeaders.php');
  authorDataStages = await fetchDb('../QueryDb/QueryDbStages.php');
  displayOnList(authorDataTasks);
  // displayOnList(authorDataStages); // The 2nd one is added to bottom of first, but they don't fit on panel. Need to do separately
  currentShowListFunc = showAuthorsTasks;

  makeListVisible();
}

async function showAuthorsStages() {//display tasks
  if(logToConsole) console.log('showAuthorsStages()');
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  document.getElementById('panel').innerHTML = 'The authors data is collected from two tables. The taskheader has a unique reference and other columns  THId,  TaskName,  TaskDesc,  TaskAuthor,  TaskFaq,  TaskDate.  ' +
    'The stages table has a unique reference and other columns  TSId,  TaskId,  StageNum,   StageDesc,   StageAuthor,  StageFaq,  StageDate';
  //need fetch data: tasks & stages
  authorDataTasks = await fetchDb('../QueryDb/QueryDbTaskHeaders.php');
  authorDataStages = await fetchDb('../QueryDb/QueryDbStages.php');
  displayOnList(authorDataStages); // The 2nd one is added to bottom of first, but they don't fit on panel. Need to do separately
  currentShowListFunc = showAuthorsStages;
  makeListVisible();
}

async function showStudentTasks() {  //not used
  if(logToConsole) console.log('showStudentTasks()');
  const memberId = encodeURIComponent(document.getElementById("studentId").value);
  const str = "MemberId=" + memberId;
  console.log(str);

  studentData = await fetchDbSingle('../QueryDb/QueryDBTasklistByStudent.php', str);
  makeListVisible();
  //displayOnList(studentData);
  currentShowListFunc = showStudentTasks;

}

//    DIFFERENT HTML Page same js                            The four longer rectangular side faces. 

async function showTasklist() {//display students
  if(logToConsole) console.log('showTasklist()');
  prism.style.transform = "translateZ(-100px)";
  document.getElementById('panel').innerHTML = 'The tasklist shows anyone who has been assigned a task or has chosen a task.<br>' +
    'Each assigned task has a unique reference TLId and other columns;  TaskId,  StudentId,  ManagerId,  Stage,  TaskListDate';
  //need fetch data: 
  tasklistData = await fetchDb('../QueryDb/QueryDbTaskListFull.php');
  displayOnList(tasklistData);
  currentShowListFunc = showTasklist;
  currentTableByIdFunction = tasklistById;
  makeListVisible();
}

function TasklistFull() { //old??
  if(logToConsole) console.log('showTaskListFull()');
  fetchDb('../queryDb/QueryDbTasklistFull.php');
}


async function showTasks() {//display managers
  if(logToConsole) console.log('showTasks()');
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  document.getElementById('panel').innerHTML = 'The tasks table shows what tasks have been designed.<br>' +
    'Each task has a unique reference THId  and other columns:    TaskName,  TaskDesc,  TaskAuthor,  TaskFaq,  TaskDate <br>'+
    'Tasks have <i>stages</i> which are shown separately. <br>Click on a row to see the task with stages';
  //need fetch data: 
  taskData = await fetchDb('../QueryDb/QueryDbTaskHeaders.php');
  displayOnList(taskData);
  currentShowListFunc = showTasks;
  currentTableByIdFunction = taskById;
  makeListVisible();
}

async function showStages() {//display user details
  if(logToConsole) console.log('showStages()');
  prism.style.transform = "translateZ(-100px) rotateY( 180deg)";
  //need fetch data:
  document.getElementById('panel').innerHTML = 'The stages table shows what stages for the task have been designed.<br>' +
    'Each stage has a unique reference  TSId and other columns:  TaskId,  StageNum,   StageDesc,   StageAuthor,  StageFaq,  StageDate';
  stagesData = await fetchDb('../QueryDb/QueryDbStages.php');
  displayOnList(stagesData);
  currentShowListFunc = showStages;
  currentTableByIdFunction = stagesById;
  makeListVisible();
}

function showOTHER() {// not used spare 4th face
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  //need fetch data: 
}

//}

//   both HTML pages have same end faces  The two square end faces. Summary and Management links
function showSummary() { /* SUMMARY end face   z axis much closer so bigger*/
  if(logToConsole) console.log('showSummary()');
  prism.style.transform = "translateZ(100px) rotateX( 90deg)";
  //need fetch data: summary counts
  document.getElementById('panel').innerHTML = 'The main numbers from the database.<br> Click for details & further actions';

}

function showManage() {//links to tasks z axis much closer so bigger
  if(logToConsole) console.log('showManage()');
  prism.style.transform = "translateZ(100px) rotateX( -90deg)";
}






////////////////////////////////////////////////////////                       display one row on a NEW card

function makeCardsVisible(){
  if(logToConsole) console.log('makeCardsVisible()');
  if (!sliding_panel_container.classList.contains('visible')) {
    sliding_panel_container.classList.add('visible');
  }

}


function populateCardWithRowData(rowData, headers, headersLength){
  if(logToConsole) console.log('populateCardWithRowData()');
  makeCardsVisible();
  console.log('row clicked=' + rowData); //
  console.log('headers='+headers);
  let item = headers[0];
  let value = rowData[item];  // don't use . dot notation for variables
  console.log(item + value);

  const KeyRef = rowData[headers[0]];
  const name = rowData[headers[1]];

document.getElementById('cardKeyTitle').innerHTML =item;
document.getElementById("cardPersonId").innerHTML ='<b>'+ name +'</b> '+'['+KeyRef + ']';

  for (i = 2; i < headersLength; i++) {
    item = headers[i];
    console.log(item); //correct StudentId
    let value = item;  // don't use . dot notation for variables
    document.getElementById('column' + i).innerText = value;

    item = headers[i];
    value = rowData[item];  // don't use . dot notation for variables
    console.log(value); //correct
    document.getElementById('PersonContent' + i).innerText = value;
  }

  populateCardNav(0, '?');
}


function studentCard(studentId){
  if(logToConsole) console.log('studentCard()');
  makeCardsVisible();
  readDbForThisStudentId(studentId).then(dataById => {
    console.log("Received data:", dataById);
    dataByIdGlobal=dataById;
    console.log(dataByIdGlobal);
    headers = Object.keys(dataById[0]);
  //  lengthOfHeaders=headers.length;
  console.log(headers);
  //document.getElementById('panel').innerHTML += 'The headers are: ' + headers;
  
  createCardThisNumberOfHeaders(headers.length);
  populateCard(dataById, headers, headers.length, 0);
  
    // Use the data here
  }).catch(error => {
    console.error("Error:", error);
  });


}


function chooseWhichCardToUse(rowData){ //A row in a list has been clicked. That row data is sent here
  if(logToConsole) console.log('chooseWhichCardToUse()');
  console.log(rowData);
  headers = Object.keys(rowData);
  headersLength=headers.length;
  itemName=headers[0];
   switch (itemName) {
    case "StudentId":
    console.log(itemName);
  studentId=rowData['StudentId'];
 
    studentCard(studentId);
    break; 
    case "ManagerId":
    console.log(itemName);
    buildDisplayCardMain(rowData);
    break; 
    case "MId":
    console.log(itemName);
    buildDisplayCardMain(rowData);
    break; 

default: console.log('unknown: '+itemName); buildDisplayCardMain(rowData);
}
}


function buildDisplayCardMain(rowData) {
  if(logToConsole) console.log('buildDisplayCardMain()');
makeCardsVisible();

  //console.log(rowData);
  // rowData is an object  { label: 'value' , label:'value'...   }
  headers = Object.keys(rowData);
  console.log("DisplayOnCard() Clicked row:", rowData, " Number of columns=", headers.length);
  document.getElementById('panel').innerHTML = 'The headers are: ' + headers;//works

  ////////// try to remove old card if it exists

  headerElement = document.getElementById('cardTopLeft');
  if (headerElement) { //if there is a headerRow that means a table has already been built & displayed
    // Table exists, therefore remove it
    const card = headerElement.parentNode; // Get the parent table element
    card.parentNode.removeChild(card); // Remove the old stuff appended to the table
    //the html table seems to still exist after this
  }
  //////////

  cardDiv = document.createElement('div');
  cardDiv.id = 'dynamicCard';
  cardDiv.className = 'course';
  cardSlider.appendChild(cardDiv);


  //div 1 of top card - for row key
  let cardKeyDiv = document.createElement('div');
  cardKeyDiv.id = 'cardTopLeft';
  cardKeyDiv.className = 'task-left';

  // Create the left reactangle with the database column name 
  cardKeyTitle = document.createElement('h8');
  cardKeyTitle.style.color = 'white';
  cardKeyTitle.className = 'h8';
  cardKeyTitle.style.position = 'absoloute';
  cardKeyTitle.id = "cardKeyRef";
  cardKeyTitle.textContent = headers[0];

  cardKeyDiv.appendChild(cardKeyTitle);

  // add the unique key reference number 
  let keyContent = document.createElement('div');
  keyContent.id = 'cardKeyTitle';
  currentValue = rowData[headers[0]];
  keyContent.textContent = currentValue;
  cardKeyDiv.appendChild(keyContent);
  cardDiv.appendChild(cardKeyDiv);

  //create all the remaining columns with their database names. Start at 1 (the key reference number was item 0)
  i = 1;
  while (i < headers.length) {
    let cardDivj = document.createElement('div');
    let cardDivTitle = document.createElement('h8');
    cardDivTitle.style.padding = '3px';
    cardDivTitle.textContent = [headers[i]];
    cardDivj.appendChild(cardDivTitle);

    // add the values from the database under the database column names   
    let cardDivContent = document.createElement('div');
    cardDivContent.classList.add = 'cardContent';
    cardDivContent.textContent = rowData[headers[i]];
    cardDivj.appendChild(cardDivContent);
    cardDiv.appendChild(cardDivj);
    i++;
  }

  //nav table to click through the other records


  //                      dynamic Card nav buttons & display

  cardDivNav = document.createElement('div');
  cardDivNav.id = 'cardDivNav';
  cardDivNav.className = 'stageNumber-info';
  //cardDivNav.textContent = "cardDivNav";
  cardDiv.appendChild(cardDivNav);



  const tableNav = document.createElement('table');
  tableNav.classList.add('tableNav');

  cardDivNav.appendChild(tableNav);

  tableTopRow = tableNav.insertRow();
  tableTopRow.classList.add('tableTopRow');

  cell = tableTopRow.insertCell(); 
  cell.classList.add('table-cell');

  cardKeyTitle = document.createElement('h6');
  cardKeyTitle.id = "cardName";
  cardKeyTitle.style.color = 'black';
  cardKeyTitle.className = 'h6';
  cardKeyTitle.innerText = 'item';
  cell.appendChild(cardKeyTitle);
  rowKey = rowData[headers[0]];

  cell = tableTopRow.insertCell(); 
  cell.classList.add('table-cell'); 
  cell.textContent = rowKey;

  table2ndRow = tableNav.insertRow();
  table2ndRow.classList.add('table2ndRow');
  cell = table2ndRow.insertCell();
  cell.classList.add('table-cell');
  cell.colSpan = 2;

  previousItemButton = document.createElement('button');
  previousItemButton.innerText = 'Previous';
  previousItemButton.classList.add('btn');
  cell.appendChild(previousItemButton);
  previousItemButton.id = "previousItem";


  table3rdRow = tableNav.insertRow();
  table3rdRow.classList.add('table3rdRow');
  cell = table3rdRow.insertCell();
  cell.classList.add('stageNumber');
  cell.innerText = rowKey;
  cell.colSpan = 2;
  cell.id = "displayItem";

  table4thRow = tableNav.insertRow();
  table4thRow.classList.add('table4thRow');
  cell = table4thRow.insertCell();
  cell.classList.add('table-cell');
  cell.colSpan = 2;
  nextItemButton = document.createElement('button');
  nextItemButton.innerText = 'Next';
  nextItemButton.id = "nextItem";
  nextItemButton.classList.add('btn');
  cell.appendChild(nextItemButton);

  /* Close button */

  let itemNumber = rowKey;
  let currentItem = itemNumber;
  showTaskColor(currentItem, itemNumber);
  keyHeader = headers[0]; //the unique key for the stage
  buildStagesCardIfNeeded(keyHeader, rowKey, 1); //start with stage 0
  //if the display is tasks need to build stages card to show the stages of the task

  ///////////////////////////////////////                         event listeners for buttons & number on dynamic card

  /*                    Previous          change item number*/
  //const previousItem = document.querySelector('#previousItem');
  previousItemButton.addEventListener('click', () => {
    console.log('clicked previous');
    itemNumber--;
    if (itemNumber < 1) itemNumber = 1;
    /*Large task number on right*/
    document.getElementById('displayItem').innerHTML = itemNumber;
    /*small ? number on left*/

    /*don't change the small itemId until the task being displayed changes*/
    /* document.getElementById('taskId').innerHTML=taskNumber;*/

    /*Change color when displaying the current item */
    showTaskColor(currentItem, itemNumber);
  })


  ///////////////////////////////////////////////////////////                Click item number

  /* If click the item number, the display should now display this item.  Can click previous/next to choose a task number, but clicking the number confirms the choice and then displays that task  */

  const displayItem = document.querySelector('#displayItem');
  displayItem.addEventListener('click', () => {
    // console.log('clicked displayed number');
    /*click the displayed page number to deliver data*/
    /* Need call a php pagination script*/
    currentItem = itemNumber;
    document.getElementById("displayItem").innerHTML = "*" + itemNumber;
    showTaskColor(currentItem, itemNumber);
    //call the function to reread the database
    //currentShowListFunc(); //this is a list function if card displayed after clicking list.
    //buildDisplayCardMain(rowData);//is rowData available here? Yes, but is not incremented. Need to call db

    // memberById(currentItem); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<needs to be generic not just members
    console.log(currentTableByIdFunction);
    currentTableByIdFunction(currentItem); //This variable calls the last function used

    //     document.getElementById('cardKey').innerHTML="Awaiting db for "+taskNumber;

  });


  /*                    Next          change task number*/
  nextItemButton.addEventListener('click', () => {
    // console.log('clicked next');
    itemNumber++;
    document.getElementById('displayItem').innerHTML = itemNumber;/*Large task number on right*/
    /*don't change the taskId until the page change is confirmed*/
    /*document.getElementById('taskId').innerHTML=taskNumber;	*/
    showTaskColor(currentItem, itemNumber);
  })
};  /////////////////////////                                         end of buildDisplayCardMain(rowData)




///////////////////////////////////////////////////                     Create a card (persons) with nav & listeners

function createCardThisNumberOfHeaders(headersLength) { 

  if(logToConsole) console.log('createCardThisNumberOfHeaders(' + headersLength + ')');

  cardDiv = document.createElement('div');
  cardDiv.id = 'CardPerson';
  cardDiv.className = 'course';
  cardSlider.appendChild(cardDiv);

  //div 1 of top card - for row key
  let cardKeyDiv = document.createElement('div');
  cardKeyDiv.id = 'cardPersonLeft';
  cardKeyDiv.className = 'stage-left';


  cardKeyTitle = document.createElement('h6');
  cardKeyTitle.style.color = 'black';
  cardKeyTitle.className = 'h6';
  cardKeyTitle.id='cardKeyTitle';  
  cardKeyTitle.textContent = 'student'; // needs to be variable

  cardKeyDiv.appendChild(cardKeyTitle);

  // Create the left reactangle with the database column name 
  cardKeyTitle = document.createElement('div');
  cardKeyTitle.id = "cardPersonId";
  cardKeyTitle.textContent = 'cardPersonId';
  //cardKeyDiv.style.display='flex'; //put elements side by side
  cardKeyDiv.appendChild(cardKeyTitle);
  
  cardKeyTitle = document.createElement('h6');
  cardKeyTitle.style.color = 'black';
  cardKeyTitle.className = 'h6';
  cardKeyTitle.textContent = 'task';

  cardKeyDiv.appendChild(cardKeyTitle);

  cardDiv.appendChild(cardKeyDiv);


  //create columns based on the size of the data received in the array
  i = 2;
  while (i < headersLength) {
    let cardDivj = document.createElement('div');
    let cardDivTitle = document.createElement('h8');
    cardDivTitle.style.padding = '3px';
    cardDivTitle.textContent = 'column ' + i;
    cardDivTitle.id = 'column' + i;
    cardDivj.appendChild(cardDivTitle);

    // add the values from the database under the database column names   
    let cardDivContent = document.createElement('div');
    cardDivContent.classList.add = 'cardContent';
    cardDivContent.textContent = 'content'+i;
   // console.log('content'+i);
    cardDivContent.id = 'PersonContent'+i;
    console.log(cardDivContent.id);
    cardDivj.appendChild(cardDivContent);
    cardDiv.appendChild(cardDivj);
    i++;
  }
  addNavBox();
  addEventListenersToNav();
}

function addNavBox() {
if(logToConsole) console.log('addNavBox');
//  cardKeyDiv.style.display = 'initial'; //reset to vertical stacking
  stagesDivNav = document.createElement('div');
  stagesDivNav.id = 'personDivNav';
  stagesDivNav.className = 'stageNumber-info';
  cardDiv.appendChild(stagesDivNav);

  const tableNavStages = document.createElement('table');
  tableNavStages.classList.add('tableNav');
  stagesDivNav.appendChild(tableNavStages);

  tableTopRow = tableNavStages.insertRow();
  tableTopRow.classList.add('tableTopRow');

  cell = tableTopRow.insertCell();
  cell.classList.add('table-cell');
  cell.id = "thisStep";

  cell = tableTopRow.insertCell();
  cell.classList.add('table-cell');
  cell.innerText = "of";

  cell = tableTopRow.insertCell();
  cell.classList.add('table-cell');
  cell.id = "totalSteps";

  table2ndRow = tableNavStages.insertRow();
  table2ndRow.classList.add('table2ndRow');
  cell = table2ndRow.insertCell();
  cell.classList.add('table-cell');
  cell.colSpan = 3;

  previousButtonStages = document.createElement('button');
  previousButtonStages.innerText = 'Previous';
  previousButtonStages.classList.add('btn');
  cell.appendChild(previousButtonStages);
  previousButtonStages.id = "personPrevious";

  table3rdRow = tableNavStages.insertRow();
  table3rdRow.classList.add('table3rdRow');
  cell = table3rdRow.insertCell();
  cell.classList.add('stageNumber');
  cell.colSpan = 3;
  cell.id = "personStep";
  cell.textContent = currentStage;

  table4thRow = tableNavStages.insertRow();
  table4thRow.classList.add('table4thRow');
  cell = table4thRow.insertCell();
  cell.classList.add('table-cell');
  cell.colSpan = 3;
  nextButtonStages = document.createElement('button');
  nextButtonStages.innerText = 'Next';
  nextButtonStages.id = "personNext";
  // button.setAttribute('onclick', 'function()');
  nextButtonStages.classList.add('btn');
  cell.appendChild(nextButtonStages);

  document.getElementById('cardPersonLeft').appendChild(tableNavStages);
}

function addEventListenersToNav() {
  if(logToConsole) console.log('addEventListenersToNav');  
  const previous_button = document.querySelector('#personPrevious');
  const personStep = document.querySelector('#personStep');
  const next_button = document.querySelector('#personNext');
  /*                    Previous          change stage number*/
  previous_button.addEventListener('click', () => {
    console.log('previous_button');
    stepNumber--;
    if (stepNumber < 1) stepNumber = 1;
    /*Large stage number on right*/
    document.getElementById('personStep').innerHTML = stepNumber;
    /*small stage number on left*/
    /*document.getElementById('SLId').innerHTML=stageNumber;*/

    /*Change color when displaying the current stage */
    showStepColor();
  })

  personStep.addEventListener('click', () => { //step through the array not calling db
    if(logToConsole) console.log('personStep eventListener');
    /*click the displayed page number to deliver data*/
    /* Need call a php pagination script*/
    currentStep = stepNumber;
    document.getElementById("personStep").innerHTML = "*" + stepNumber;
    showStepColor();

    console.log(currentTableByIdFunction);
    populateCardFromArray(currentStep);
//    currentTableByIdFunction(currentStep);//This variable calls the last function used

    //  showStageColor();
    //  document.getElementById('stageDesc').innerHTML = "Awaiting db for " + stageNumber;
    // document.getElementById('stageName').innerHTML = "Awaiting db for " + stageNumber;
    //   buildStagesCardIfNeeded(keyHeader, rowKey, stageNumber);
  });

  

  /*                    Next          change step number*/
  next_button.addEventListener('click', () => {
    console.log('next_button');
    stepNumber++; document.getElementById('personStep').innerHTML = stepNumber;/*Large stage number*/
    /*document.getElementById('SLId').innerHTML=stageNumber;*/
    showStepColor();
  })

}

function showStepColor() {                             /////   Stages Color
  
  if(logToConsole) console.log('showStepColor() ', currentStep, stepNumber); //this is limited, but nav display isn't lñimited

  if (stepNumber == currentStep) {
    personStep.style.backgroundColor = 'lightgreen';
  } else personStep.style.backgroundColor = '#ffd';
}



function populateCard(dataById, headers, headersLength, thisStep) {
  if(logToConsole) console.log('populateCard() length=' + dataById.length); //
  console.log(dataById);
  let item = headers[0];
  let value = dataById[thisStep][item];  // don't use . dot notation for variables
  console.log(item + value);

  const KeyRef = dataById[thisStep][headers[0]];
  const name = dataById[thisStep][headers[1]];

document.getElementById('cardKeyTitle').innerHTML =item;
document.getElementById("cardPersonId").innerHTML ='<b>'+ name +'</b> '+'['+KeyRef + ']';

  for (i = 2; i < headersLength; i++) {
    item = headers[i];
    //console.log(item); //correct StudentId
    let value = item;  // don't use . dot notation for variables
    document.getElementById('column' + i).innerText = value;

    item = headers[i];
    value = dataById[thisStep][item];  // don't use . dot notation for variables
   // console.log(value); //correct
    document.getElementById('PersonContent' + i).innerText = value;
  }

  populateCardNav(thisStep, dataById.length);
}


function   populateCardNav(thisStep, dataByIdLength) {
  document.getElementById('thisStep').innerText = thisStep+1;//actual array starts at 0
  document.getElementById('totalSteps').innerText = dataByIdLength;

}



function populateCardFromArray(stepToDisplay){
  if(logToConsole) console.log('populateCardFromArray()');
  console.log(dataByIdGlobal);
//if (dataById == 0) {
//  console.log("No rows found")
//  document.getElementById('thisstep').innerHTML = '0'; //?
//  document.getElementById('totalsteps').innerHTML ='0'; 
//} else {
  //console.log(dataByIdGlobal);

  stepToDisplay = Math.min(dataByIdGlobal.length, stepToDisplay);
  stepNumber= Math.min(dataByIdGlobal.length, stepNumber);
  //document.getElementById('step').innerHTML = stepToDisplay;
  currentstep = stepToDisplay;
  console.log(stepToDisplay);
document.getElementById('thisStep').innerHTML = '<b>'+ stepToDisplay;
document.getElementById('totalSteps').innerHTML = dataByIdGlobal.length;

value=dataByIdGlobal[stepToDisplay - 1].TaskId;
console.log('value=',value);
document.getElementById('PersonContent2' ).innerText = value;//ok

value=dataByIdGlobal[stepToDisplay - 1].TaskName;
console.log('value=',value);
document.getElementById('PersonContent3').innerText = value;//fails

value=dataByIdGlobal[stepToDisplay - 1].Stage;
console.log('value=',value);
document.getElementById('PersonContent4').innerText = value;

value=dataByIdGlobal[stepToDisplay - 1].ManagerId;
console.log('value=',value);
document.getElementById('PersonContent5').innerText = value;

value=dataByIdGlobal[stepToDisplay - 1].ManagerName;
console.log('value=',value);
document.getElementById('PersonContent6').innerText = value;

value=dataByIdGlobal[stepToDisplay - 1].TLId;
console.log('value=',value);
document.getElementById('PersonContent7').innerText = value;

  //stageNumber=stageToDisplay;
showStageColor();
  //need to limit the dispalye number to dataById.length
}  // need the array index to be incremented by the stage nav buttons- can't use [0]

//}



async function readDbForThisStudentId(studentId){
  if(logToConsole) console.log('readDbForThisStudentId()');
  str = 'keyId=' + studentId; 
  try {
    const dataById = await fetchDbSingle('../QueryDb/QueryDbStudentById.php', str);
    //console.log(dataById); // This should now log the actual data
    return dataById;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Or handle the error differently
  }
}

/* this php sends all the rows...
    $dbData = [];
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $dbData[$i] = $row;
        $i++;
    }
    echo json_encode($dbData);
*/


/*
let studentId=3;

readDbForThisStudentId(studentId).then(dataById => {
  console.log("Received data:", dataById);

  headers = Object.keys(dataById[0]);
//  lengthOfHeaders=headers.length;
console.log(headers);
//document.getElementById('panel').innerHTML += 'The headers are: ' + headers;

//createCardThisNumberOfHeaders(headers.length);
//populateCard(dataById, headers, headers.length, 0);

  // Use the data here
}).catch(error => {
  console.error("Error:", error);
});
*/


async function buildDisplayCardPersons(headersLength, personType) {
  if(logToConsole) console.log('buildDisplayCardPersons()');
  //keyHeader = studentId or managerId which are memberId
  //makeCardsVisible();
  str = 'keyId=' + memberId; 
  dataById = await fetchDbSingle('../QueryDb/QueryDbStudentById.php', str);
//return an array of the studnet/manager entries in tasklist as objects or '0' if none found
//may need to return 1 if only one found

    console.log(memberId, personType, itemToDisplay, dataById);
    // rowData is an object  { label: 'value' , label:'value'...   }

    headers = Object.keys(dataById);
    console.log("DisplayPersonCard()  Number of columns=", headers.length);
    document.getElementById('panel').innerHTML = 'The headers are: ' + headers;
  //may need to display card -  document.getElementById('jscardStages').style.display = '';//displays card
    ////////// try to remove old card if it exists
    itemToDisplay = Math.min(dataById.length, itemToDisplay);
console.log(typeof(itemToDisplay));
    //itemNumber= Math.min(dataById.length, itemNumber); 


    headerElement = document.getElementById('cardTopLeft???');
    if (headerElement) { //if there is a headerRow that means a table has already been built & displayed
      // Table exists, therefore remove it
      const card = headerElement.parentNode; // Get the parent table element
      card.parentNode.removeChild(card); // Remove the old stuff appended to the table
      //the html table seems to still exist after this
    }
    //////////
  
    cardDiv = document.createElement('div');
    cardDiv.id = 'dynamicCardPerson';
    cardDiv.className = 'course';
    cardSlider.appendChild(cardDiv);
  
  
    //div 1 of top card - for row key
    let cardKeyDiv = document.createElement('div');
    cardKeyDiv.id = 'cardTopLeftPerson';
    cardKeyDiv.className = 'task-left';
  
    // Create the left reactangle with the database column name 
    cardKeyTitle = document.createElement('h8');
    cardKeyTitle.style.color = 'white';
    cardKeyTitle.className = 'h8';
    cardKeyTitle.id = "cardKeyRefPerson";
    cardKeyTitle.textContent = headers[0];
  
    cardKeyDiv.appendChild(cardKeyTitle);
  
    // add the unique key reference number 
    let keyContent = document.createElement('div');
    keyContent.id = 'cardKeyTitlePerson';
    currentValue = itemToDisplay[headers[0]];
    keyContent.textContent = currentValue;
    cardKeyDiv.appendChild(keyContent);
    cardDiv.appendChild(cardKeyDiv);
  
    //create all the remaining columns with their database names. Start at 1 (the key reference number was item 0)
    i = 1;
    while (i < headers.length) {
      let cardDivj = document.createElement('div');
      let cardDivTitle = document.createElement('h8');
      cardDivTitle.style.padding = '3px';
      cardDivTitle.textContent = [headers[i]];
      cardDivj.appendChild(cardDivTitle);
  
      // add the values from the database under the database column names   
      let cardDivContent = document.createElement('div');
      cardDivContent.classList.add = 'cardContent';
      cardDivContent.textContent = itemToDisplay[headers[i]];
      cardDivj.appendChild(cardDivContent);
      cardDiv.appendChild(cardDivj);
      i++;
    }
  
    //nav table to click through the other records
  
  
    //                      dynamic Card nav buttons & display
  
    cardDivNav = document.createElement('div');
    cardDivNav.id = 'cardDivNavPerson';
    cardDivNav.className = 'stageNumber-info';
    //cardDivNav.textContent = "cardDivNav";
    cardDiv.appendChild(cardDivNav);
  
  
  
    const tableNav = document.createElement('table');
    tableNav.classList.add('tableNav');
  
    cardDivNav.appendChild(tableNav);
  
    tableTopRow = tableNav.insertRow();
    tableTopRow.classList.add('tableTopRow');
  
    cell = tableTopRow.insertCell(); 
    cell.classList.add('table-cell');
  
    cardKeyTitle = document.createElement('h6');
    cardKeyTitle.id = "cardNamePerson";
    cardKeyTitle.style.color = 'black';
    cardKeyTitle.className = 'h6';
    cardKeyTitle.innerText = 'item';
    cell.appendChild(cardKeyTitle);
   
  
    cell = tableTopRow.insertCell(); 
    cell.classList.add('table-cell'); 
    cell.innerText = itemToDisplay; //NaN !!!
  
    table2ndRow = tableNav.insertRow();
    table2ndRow.classList.add('table2ndRow');
    cell = table2ndRow.insertCell();
    cell.classList.add('table-cell');
    cell.colSpan = 2;
  
    previousItemButton = document.createElement('button');
    previousItemButton.innerText = 'Previous';
    previousItemButton.classList.add('btn');
    cell.appendChild(previousItemButton);
    previousItemButton.id = "previousItemPerson";
  
  
    table3rdRow = tableNav.insertRow();
    table3rdRow.classList.add('table3rdRow');
    cell = table3rdRow.insertCell();
    cell.classList.add('stageNumber');
    console.log(typeof(itemToDisplay)); //logs number
    cell.innerText = itemToDisplay; //display NaN
    cell.colSpan = 2;
    cell.id = "displayItemPerson";
  
    table4thRow = tableNav.insertRow();
    table4thRow.classList.add('table4thRow');
    cell = table4thRow.insertCell();
    cell.classList.add('table-cell');
    cell.colSpan = 2;
    nextItemButton = document.createElement('button');
    nextItemButton.innerText = 'Next';
    nextItemButton.id = "nextItemPerson";
    nextItemButton.classList.add('btn');
    cell.appendChild(nextItemButton);
  
    /* Close button */
    rowKey = itemToDisplay[headers[0]];
    let itemNumber = rowKey;
    let currentItem = itemNumber;
//    showTaskColor(currentItem, itemNumber);
    keyHeader = headers[0]; //the unique key for the stage
  //  buildStagesCardIfNeeded(keyHeader, rowKey, 1); //start with stage 0
    //if the display is tasks need to build stages card to show the stages of the task
  
    ///////////////////////////////////////                         event listeners for buttons & number on dynamic card
  
    /*                    Previous          change item number*/
    //const previousItem = document.querySelector('#previousItem');
    previousItemButton.addEventListener('click', () => {
      console.log('clicked previous');
      itemNumber--;
      if (itemNumber < 1) itemNumber = 1;
      /*Large task number on right*/
      document.getElementById('displayItem').innerHTML = itemNumber;
      /*small ? number on left*/
  
      /*don't change the small itemId until the task being displayed changes*/
      /* document.getElementById('taskId').innerHTML=taskNumber;*/
  
      /*Change color when displaying the current item */
      showTaskColor(currentItem, itemNumber);
    })
  
  
    ///////////////////////////////////////////////////////////                Click item number
  
    /* If click the item number, the display should now display this item.  Can click previous/next to choose a task number, but clicking the number confirms the choice and then displays that task  */
  
    const displayItem = document.querySelector('#displayItemPerson');
    displayItem.addEventListener('click', () => {
      // console.log('clicked displayed number');
      /*click the displayed page number to deliver data*/
      /* Need call a php pagination script*/
      currentItem = itemNumber;
      document.getElementById("displayItem").innerHTML = "*" + itemNumber;
  //    showTaskColor(currentItem, itemNumber);
      //call the function to reread the database
      //currentShowListFunc(); //this is a list function if card displayed after clicking list.
      //buildDisplayCard(rowData);//is rowData available here? Yes, but is not incremented. Need to call db
  
      // memberById(currentItem); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<needs to be generic not just members
      console.log(currentTableByIdFunction);
      currentTableByIdFunction(currentItem);//This variable calls the last function used
  
      //     document.getElementById('cardKey').innerHTML="Awaiting db for "+taskNumber;
  
    });
  
  
    /*                    Next          change task number*/
    nextItemButton.addEventListener('click', () => {
      // console.log('clicked next');
      itemNumber++;
      document.getElementById('displayItemPerson').innerHTML = itemNumber;/*Large task number on right*/
      /*don't change the taskId until the page change is confirmed*/
      /*document.getElementById('taskId').innerHTML=taskNumber;	*/
    //  showTaskColor(currentItem, itemNumber);
    })
  
  
    makeCardsVisible();
  
  };  /////////////////////////                                         end of buildDisplayCardPerson()
  
  






//////////////////////////////                                         display on list            ////////////////////

function makeListVisible(){
  if(logToConsole) console.log('makeListVisible()');
  if (!list_sliding_panel_container.classList.contains('visible')) {
    list_sliding_panel_container.classList.add('visible');
  }
}


function displayOnList(dataForList) {
  if(logToConsole) console.log('displayOnList()');
  //check if a table has already been built (use the id='headerRow' that was applied for this purpose)
  headerElement = document.getElementById('headerRow');

  if (headerElement) { //if there is a headerRow that means a table has already been built & displayed
    // Table exists, therefore remove it
    const table = headerElement.parentNode; // Get the parent table element
    table.parentNode.removeChild(table); // Remove the old stuff appended to the table
    //the html table seems to still exist after this
  }

  //build the headers row which has a different style to rest of rows
  let headerRow = table.insertRow();
  headerRow.classList.add('headerRow');
  headerRow.id = 'headerRow'; //this id is to be able to identify if a list has already been shown on the table 

  //HEADER get the lables of the headers from the data
  let headers = Object.keys(dataForList[0]);
  //console.log("Headers = " + headers);
  //HEADER create cells in the table and insert the header names
  for (var head in headers) {
    cell = headerRow.insertCell(); cell.textContent = headers[head];
  }

  // Data ROWS - outer loop is for the number of rows there are in dataForList     
  console.log("Length of rowData:", dataForList.length, "currentPage= ", currentPage);//if length < limit, this is final page
  if (dataForList.length < limit) { finalPage = true; console.log('Loop finalPage=', finalPage) } else finalPage = false;
  for (const rowData of dataForList) {
    //console.log("currentPage= ", currentPage);
    const row = table.insertRow();
    row.classList.add('table-row'); // need a listener for each row

    //row.addEventListener('click',() => { console.log("clicked", rowData[0]);})

    row.addEventListener('click', () => { //rowKey=row.cells[0].textContent;
      //copy the entire row with headers for later processing
      const rowData = {};
      for (let i = 0; i < row.cells.length; i++) {
        rowData[headers[i]] = row.cells[i].textContent;
      }
      //console.log("Clicked row data:", rowData);
      chooseWhichCardToUse(rowData);
    });

    //Inner loop is for how many columns there are in each row
    for (const header in rowData) {
      const cell = row.insertCell();
      cell.textContent = rowData[header]; // how this works is beyond me
    }
  }
  //add the pageDisplayed & totalPages to left of nav buttons  "Page X of Y Pages" Bad 3 Nov 2024
  //the js doesn't know the potential totla number of pages. It doesn't know the total number of rows. Should be possible for the PHP to include that in the result, but not sure how to do this
  document.getElementById('pageDisplayed').innerHTML = offset / limit + 1;
  document.getElementById('pageTotal').innerHTML = limit;
} /////////////////////////////////////////////////////////////////                     end of displayOnList()










/*                                                                        OLD   utility connect & send request for a php file                                */
function XMLRequest($fileURL, str) {  //OLD
  if(logToConsole) console.log('XMLRequest()');
  document.getElementById("panel").innerHTML += "js XMLRequest()$fileURL: " + $fileURL + "<br>";
  document.getElementById("panel").innerHTML += "js XMLRequest()str: " + str + "<br>";
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("panel").innerHTML = " Db call, this.responseText: " + request.responseText + "<br>";
    }
    else { document.getElementById("panel").innerHTML += "Else " + this.request.responseText + "<br>" };
  }
  //the request is now to be started with method POST, the url of where the PHP script is, & asynchronous=true
  request.open("POST", $fileURL, true);
  //the server needs some extra data
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //??????
  request.send(str);
}

/*                                                                            Student Db display             ////////////////////                            */



function listByStudent() {
  if(logToConsole) console.log('listByStudent()');
  /* Can be called with studentId from student section or memberId from personal section. Problem of several forms on 1 page */
  var studentId = encodeURIComponent(document.getElementById("studentId").value);
  if (studentId == "") { studentId = encodeURIComponent(document.getElementById("MemberId").value) };
  document.getElementById("panel").innerHTML += "listByStudent() str=" + str + "<br>";
  var str = "studentId=" + studentId;
  document.getElementById("panel").innerHTML += "listByStudent()str: " + str + "<br>";
  if (studentId == "") {
    document.getElementById("panel").innerHTML += "Can't send to database because of lack of input(BAD null)<br>  ";
  } else {
    document.getElementById("panel").innerHTML += "js reports has no nullS=<br>  ";
    XMLRequest("../queryDb/QueryDbTasklistByStudent.php", str);
  }
}

function listByMember() {
  if(logToConsole) console.log('listByMember()');
  document.getElementById("panel").innerHTML += "js listByMember()<br>";
  var MId = encodeURIComponent(document.getElementById("MemberId").value);
  var str = "MemberId=" + MId;
  document.getElementById("panel").innerHTML += "listByMemberId()str: " + str + "<br>";
  if (MId == "") {
    document.getElementById("panel").innerHTML += "Can't send to database because of lack of input(BAD null)<br>  ";
  } else {
    document.getElementById("panel").innerHTML += "js reports has no nullS=<br>  ";
    XMLRequest("../queryDb/QueryDbMemberById.php", str);
  }
}


/*
async function taskById(){//need get the MId? and pass it on?
  const memberId = encodeURIComponent(document.getElementById("MemberId").value);
    const str="TaskId="+ memberId;
    console.log(str);

  const data= await fetchDbSingle('../QueryDb/QueryDbMemberById.php',str);
  console.log(data);
} */

function listByTaskAssigned() {  //OLD
  if(logToConsole) console.log('listByTaskAssigned()');
  var TaskId = encodeURIComponent(document.getElementById("taskId").value);
  var str = "taskId=" + TaskId;
  document.getElementById("panel").innerHTML += "listByTaskAssigned()taskID: " + TaskId + "<br>";
  document.getElementById("panel").innerHTML += "listByTaskAssigned()str: " + str + "<br>";
  if (TaskId == "") {
    document.getElementById("panel").innerHTML += "Can't send to database because of lack of input(BAD null)<br>  ";
  } else {
    document.getElementById("panel").innerHTML += "js reports has no nullS=<br>  ";
    XMLRequest("../QueryDb/QueryDBTasklistByTask.php", str);
  }
}

/*                                                                             Manager Db display                                         */

function dbAssignedKeys() {
  if(logToConsole) console.log('dbAssigenedKeys()');
  fetchDb('../queryDb/QueryDbTasklistKeys.php');
}

function dbAssignedDetails() {
  if(logToConsole) console.log('debAssignedDetails()');
  fetchDb('../queryDb/QueryDbTasklistFull.php');
}

async function dbTaskHeaders() { //but this data already collected in summary
  if(logToConsole) console.log('dbTaskHeaders()');
  const data = await fetchDb('../QueryDb/QueryDbTaskHeaders.php');
  console.log(data);
}

function dbTaskStages() {
  if(logToConsole) console.log('dbTaskStages()');
  //  XMLRequest("../queryDb/QueryDbStages.php");  
  fetchDb('../QueryDb/QueryDbStages.php');
}

async function dbMembers() {
  if(logToConsole) console.log('dbMembers');
  data = await fetchDb('../queryDb/QueryDbMembers.php');
}


/*                                                                         Tasks                                                     */


async function dbTaskHeader() {
  if(logToConsole) console.log('dbTaskHeaders()');
  var taskId = encodeURIComponent(document.getElementById("taskTHId").value);
  var str = "taskId=" + taskId;
  document.getElementById("panel").innerHTML += "listByTask()taskID: " + taskId + "<br>";
  document.getElementById("panel").innerHTML += "listByTask()str: " + str + "<br>";
  if (taskId == "") {
    document.getElementById("panel").innerHTML += "Can't send to database because of lack of input(BAD null)<br>  ";
  } else { document.getElementById("panel").innerHTML += "js reports has no nullS=<br>  "; }


  const data = await fetchDbSingle('../QueryDb/QueryDbTaskById.php', str);
  console.log(data);
}


async function dbTaskStage() {
  if(logToConsole) console.log('dbTaskStage()');
  var Id = encodeURIComponent(document.getElementById("stageTSId").value);
  var str = "stageTSId=" + Id;
  document.getElementById("panel").innerHTML += "listByTask()taskID: " + Id + "<br>";
  document.getElementById("panel").innerHTML += "listByTask()str: " + str + "<br>";
  if (Id == "") {
    document.getElementById("panel").innerHTML += "Can't send to database because of lack of input(BAD null)<br>  ";
  } else { document.getElementById("panel").innerHTML += "js reports has no nullS<br>  "; }


  const data = await fetchDbSingle('../QueryDb/QueryDbTaskStageById.php', str);
  console.log(data);
}


async function dbAssignedTask() {
  if(logToConsole) console.log('dbAssignedTask()');
  var Id = encodeURIComponent(document.getElementById("tasklistTLId").value);
  var str = "tasklistTLId=" + Id;
  document.getElementById("panel").innerHTML += "listByTask()taskID: " + Id + "<br>";
  document.getElementById("panel").innerHTML += "listByTask()str: " + str + "<br>";
  if (Id == "") {
    document.getElementById("panel").innerHTML += "Can't send to database because of lack of input(BAD null)<br>  ";
  } else { document.getElementById("panel").innerHTML += "js reports has no nullS<br>  "; }


  const data = await fetchDbSingle('../QueryDb/QueryDbTasklistById.php', str);
  console.log(data);
}


function dbTaskStagesById() {
  if(logToConsole) console.log('dbTaskStagesById()');
  var TaskId = encodeURIComponent(document.getElementById("taskTHId").value);
  var str = "taskId=" + TaskId;
  document.getElementById("panel").innerHTML += "listByTask()taskID: " + TaskId + "<br>";
  document.getElementById("panel").innerHTML += "listByTask()str: " + str + "<br>";
  if (TaskId == "") {
    document.getElementById("panel").innerHTML += "Can't send to database because of lack of input(BAD null)<br>  ";
  } else {
    document.getElementById("panel").innerHTML += "js reports has no nullS=<br>  ";
    XMLRequest("../queryDb/QueryDbTaskStagesById.php", str);
  }
}

/*                                                                              Personal Db display                                       */

function myDbDetails() {
  if(logToConsole) console.log('myDeatils()');
  /* need to pass the value in the MemberId input box */
  //XMLRequest("../queryDb/QueryDbMyDetails.php");
}





////////////////////////////////                                                  List panel & table  ////////////////////

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
tableListNav.id = "list-nav";


row = tableListNav.insertRow(); row.classList.add('nav-row');
cell = row.insertCell(); cell.classList.add('nav-cell');

let cardKeyTitle = document.createElement('h6');
cardKeyTitle.style.color = 'black';
cardKeyTitle.className = 'h6';
cardKeyTitle.textContent = "Page";
cell.appendChild(cardKeyTitle);

cell = row.insertCell(); cell.classList.add('nav-cell'); cell.id = 'pageDisplayed';
cell.textContent = 'X';
cell = row.insertCell(); cell.classList.add('nav-cell');
cardKeyTitle = document.createElement('h6');
cardKeyTitle.style.color = 'black';
cardKeyTitle.className = 'h6';
cardKeyTitle.textContent = "of";
cell.appendChild(cardKeyTitle);

cell = row.insertCell(); cell.classList.add('nav-cell'); cell.id = 'pageTotal';
cell.textContent = 'Y';
cell = row.insertCell();
cell.classList.add('nav-cell');

cardKeyTitle = document.createElement('h6');
cardKeyTitle.style.color = 'black';
cardKeyTitle.className = 'h6';
cardKeyTitle.textContent = "Rows";
cell.appendChild(cardKeyTitle);

cell = row.insertCell();
cell.classList.add('nav-cell');
cardDiv = document.createElement('button');
cardDiv.className = 'btn';
cardDiv.id = 'PageSkipBack100';
cardDiv.textContent = 'Skip back <<<< 100 pages';
cell.appendChild(cardDiv);

cell = row.insertCell();
cell.classList.add('nav-cell');
cardDiv = document.createElement('button');
cardDiv.className = 'btn';
cardDiv.id = 'PageSkipBack10';
cardDiv.textContent = 'Skip back << 10 pages';
cell.appendChild(cardDiv);

cell = row.insertCell();
cell.classList.add('nav-cell');
cardDiv = document.createElement('button');
cardDiv.className = 'btn';
cardDiv.id = 'PreviousPage';
cardDiv.textContent = 'Previous page';
cell.appendChild(cardDiv);


cell = row.insertCell();
cell.classList.add('nav-cell');
cardDiv = document.createElement('div');
cardDiv.className = 'stageNumber';
cardDiv.id = 'page';
cardDiv.textContent = '1';
cell.appendChild(cardDiv);


cell = row.insertCell();
cell.classList.add('nav-cell');
cardDiv = document.createElement('button');
cardDiv.className = 'btn';
cardDiv.id = 'NextPage';
cardDiv.textContent = 'Next page';
cell.appendChild(cardDiv);

cell = row.insertCell();
cell.classList.add('nav-cell');
cardDiv = document.createElement('button');
cardDiv.className = 'btn';
cardDiv.id = 'PagesSkipAhead10';
cardDiv.textContent = 'Skip ahead >> 10 pages';
cell.appendChild(cardDiv);

cell = row.insertCell();
cell.classList.add('nav-cell');
cardDiv = document.createElement('button');
cardDiv.className = 'btn';
cardDiv.id = 'PagesSkipAhead100';
cardDiv.textContent = 'Skip  ahead >>>> 100 pages';
cell.appendChild(cardDiv);


document.getElementById('listSlider').appendChild(tableListNav);



/////////////////////////////////////                                            LIST nav buttons eventListeners
/*                                Table  Pages   
Click [Previous]  [Next] to choose which page of database rows to display.
Click the displayed [number] to confirm. 
When page on display is the same as the number displayed the background becomes green */

const PagesSkipBack100 = document.querySelector('#PageSkipBack100');
PagesSkipBack100.addEventListener('click', () => {
  if (pageNumber > 100) { pageNumber -= 100 } else { pageNumber = 1 };
  document.getElementById("page").innerHTML = pageNumber;
  showPageColor();
});
const PagesSkipBack10 = document.querySelector('#PageSkipBack10');
PagesSkipBack10.addEventListener('click', () => {
  if (pageNumber > 10) { pageNumber -= 10 } else { pageNumber = 1 };
  document.getElementById("page").innerHTML = pageNumber;
  showPageColor();
});
PreviousPage.addEventListener('click', () => {
  if (pageNumber > 1) pageNumber--;
  document.getElementById("page").innerHTML = pageNumber;
  showPageColor();

});

/*                                                                               Click the page number 
confirmation to display that page of data. The background color changes & a php script is called to deliver that page of table rows */

const page = document.querySelector('#page');
page.addEventListener('click', () => {
  /*click the displayed page number to deliver data*/
  /* Need call a php pagination script*/
  console.log('Click NUMBER  finalPage=', finalPage, 'pageNumber=', pageNumber);
  if (finalPage && (pageNumber > currentPage)) { pageNumber = currentPage; document.getElementById("page").innerHTML = pageNumber; } else {
    currentPage = pageNumber;
    document.getElementById("page").innerHTML = "*" + pageNumber;
  }
  showPageColor();
  currentShowListFunc(); //Re-run the most recent show function as soon as the page number is clicked on to update the list
});

const NextPage = document.querySelector('#NextPage');
NextPage.addEventListener('click', () => {
  pageNumber++;
  document.getElementById("page").innerHTML = pageNumber;
  showPageColor();
});
const PagesSkipAhead10 = document.querySelector('#PagesSkipAhead10');
PagesSkipAhead10.addEventListener('click', () => {
  pageNumber += 10;
  document.getElementById("page").innerHTML = pageNumber;
  showPageColor();
});
const PagesSkipAhead100 = document.querySelector('#PagesSkipAhead100');
PagesSkipAhead100.addEventListener('click', () => {
  pageNumber += 100;
  document.getElementById("page").innerHTML = pageNumber;
  showPageColor();
});


function showPageColor() {
  if (currentPage == pageNumber) { page.style.backgroundColor = 'lightgreen'; } else page.style.backgroundColor = "rgb(203, 199, 170)";
}
showPageColor();




///////////////////////////////////////                                               Stages card



async function buildStagesCardIfNeeded(keyHeader, rowKey, stageToDisplay) {
  if(logToConsole) console.log('buildStagesCardIfNeeded');
  //console.log('buildSatgesCardIfNeeded');
  //console.log("buildDisplayCardMain():"+currentShowListFunc);
  //console.log("CARD:"+currentTableByIdFunction);
  //console.log(keyHeader,rowKey);
  if (keyHeader == 'THId') {
    console.log("yes, need build stages");
    str = 'rowKey=' + rowKey;
    dataById = await fetchDbSingle('../QueryDb/QueryDbTaskStagesByTaskId.php', str);
    //returns an array of the stages as objects or '0' if none found
    document.getElementById('jscardStages').style.display = '';//displays card
    if (dataById == 0) {
      console.log("No rows found")
      document.getElementById('thisStage').innerHTML = '0'; //?
      document.getElementById('totalStages').innerHTML ='0'; 
      document.getElementById('stageName').innerHTML = '<i>No stage found</i>';
      document.getElementById('stageDesc').innerHTML = '<b>This task needs stages</b>';
      //could turn off the clickable parts Or make nav invisible
    } else {
      console.log(dataById);

      stageToDisplay = Math.min(dataById.length, stageToDisplay);
      stageNumber= Math.min(dataById.length, stageNumber);
      //document.getElementById('stage').innerHTML = stageToDisplay;
      currentStage = stageToDisplay;
      document.getElementById("stage").innerHTML = "*" + stageNumber;
      document.getElementById('thisStage').innerHTML = '<b>' + dataById[stageToDisplay - 1].StageNum ;
      document.getElementById('totalStages').innerHTML = dataById.length;
      document.getElementById('stageName').innerHTML = dataById[stageToDisplay - 1].StageName;
      document.getElementById('stageDesc').innerHTML = dataById[stageToDisplay - 1].StageDesc;
      //stageNumber=stageToDisplay;
showStageColor();
      //need to limit the dispalye number to dataById.length
    }  // need the array index to be incremented by the stage nav buttons- can't use [0]
    //} else console.log("No stages required");

  } else document.getElementById('jscardStages').style.display = 'none';;//no stages needed
}


///////////////////////////////////////////                      Stages card (Name, desc, + nav)

cardDiv = document.createElement('div');
cardDiv.id = 'jscardStages';
cardDiv.className = 'course';
//courseDiv.textContent = 'stages';
//document.body.appendChild(cardDiv);  

cardSlider.appendChild(cardDiv);


//stage name title & actual stage name
cardKeyDiv = document.createElement('div');
cardKeyDiv.id = 'cardKeyStages';
cardKeyDiv.className = 'stage-left';

cardKeyTitle = document.createElement('h6');
cardKeyTitle.style.color = 'black';
cardKeyTitle.className = 'h6';
cardKeyTitle.style.position = 'absoloute';
cardKeyTitle.id = "cardKeyStages";
cardKeyTitle.textContent = "stageName";
cardKeyDiv.appendChild(cardKeyTitle);

keyContent = document.createElement('div');
keyContent.id = 'stageName';
keyContent.textContent = "Insert stage name from db";

cardKeyDiv.appendChild(keyContent);

cardDiv.appendChild(cardKeyDiv);


//            description div of stages card

let cardDivj = document.createElement('div');

cardDivTitle = document.createElement('h6');
cardDivTitle.style.padding = '3px';
//cardDivj.id='stageDescription';
cardDivTitle.textContent = 'Stage Description';
cardDivTitle.className = 'h6';;
//cardDivTitle.style.color='black';
//cardDivTitle.className = 'h6';
cardDivj.appendChild(cardDivTitle);

cardDivContent = document.createElement('div');
cardDivContent.id = 'stageDesc';
cardDivContent.className = "stage-info";
cardDivContent.textContent = "Insert stage Description (stageDecs)...with an unknown amount of text. Where will it go?";

cardDivj.appendChild(cardDivContent);

cardDiv.appendChild(cardDivj);

//end of description div of stages car


//////////////////                                                       stage nav buttons & display

stagesDivNav = document.createElement('div');
stagesDivNav.id = 'stagesDivNav';
//cardDivNav.textContent = "cardDivNav";
stagesDivNav.className = 'stageNumber-info';
cardDivj.appendChild(stagesDivNav);


const tableNavStages = document.createElement('table');
tableNavStages.classList.add('tableNav');

stagesDivNav.appendChild(tableNavStages);

tableTopRow = tableNavStages.insertRow();
tableTopRow.classList.add('tableTopRow');

cell = tableTopRow.insertCell();
cell.classList.add('table-cell');
cell.id = "thisStage";

cell = tableTopRow.insertCell();
cell.classList.add('table-cell');
cell.innerText = "of";

cell = tableTopRow.insertCell();
cell.classList.add('table-cell');
cell.id = "totalStages";


/*
cardKeyTitle = document.createElement('h6');
cardKeyTitle.id = 'stageName';
cardKeyTitle.className = 'h6';
cardKeyTitle.innerText = 'stage';
cell.appendChild(cardKeyTitle);

cell = tableTopRow.insertCell(); //it has moved outside the table or moves into "STAGE"
cell.classList.add('table-cell');
cell.textContent ='test';
cell.id = "SLId";
//cell.style.backgroundColor='red';
*/
//cell = tableTopRow.insertCell(); 
//cell.classList.add('table-cell');
//cell.id="SLIdTotal";

/////////////////////////////////////                                                 stages nav buttons

table2ndRow = tableNavStages.insertRow();
table2ndRow.classList.add('table2ndRow');
cell = table2ndRow.insertCell();
cell.classList.add('table-cell');
cell.colSpan = 3;

previousButtonStages = document.createElement('button');
previousButtonStages.innerText = 'Previous';
// button.setAttribute('onclick', 'function()');
previousButtonStages.classList.add('btn');
cell.appendChild(previousButtonStages);
previousButtonStages.id = "Previous";

table3rdRow = tableNavStages.insertRow();
table3rdRow.classList.add('table3rdRow');
cell = table3rdRow.insertCell();
cell.classList.add('stageNumber');
cell.colSpan = 3;
cell.id = "stage";
cell.textContent = currentStage;

table4thRow = tableNavStages.insertRow();
table4thRow.classList.add('table4thRow');
cell = table4thRow.insertCell();
cell.classList.add('table-cell');
cell.colSpan = 3;
nextButtonStages = document.createElement('button');
nextButtonStages.innerText = 'Next';
nextButtonStages.id = "Next";
// button.setAttribute('onclick', 'function()');
nextButtonStages.classList.add('btn');
cell.appendChild(nextButtonStages);

//end of stagesCard nav
document.getElementById('cardKeyStages').appendChild(tableNavStages);
//document.getElementById('stagesDivNav').appendChild(tableNavStages);

//////////////////////////////                                           end of stagesCard


/*                                                                             Stages  buttons  
Click [Previous]  [Next] to choose which stage to display. Click the displayed [number] to confirm. When stage on display is the same as the number displayed the background becomes green */

/*                    Previous/Next buttons          change stage number*/
const previous_btn = document.querySelector('#Previous');
const stage = document.querySelector('#stage');
const next_btn = document.querySelector('#Next');


////////////////////////////////////////////////                                     


function showTaskColor(currentItem, itemNumber) {       /////  TASK color	
  if(logToConsole) console.log('showTaskColor()');
  if (currentItem == itemNumber) {
    displayItem.style.backgroundColor = 'lightgreen';
  } else displayItem.style.backgroundColor = '#ffd';

}

function showStageColor() {                             /////   Stages Color
  //console.log(currentStage, stageNumber); //this is limited, but nav display isn't lñimited
  if(logToConsole) console.log('showStageColor()');
  if (stageNumber == currentStage) {
    stage.style.backgroundColor = 'lightgreen';
  } else stage.style.backgroundColor = '#ffd';
}

showStageColor();

/*                    Previous          change stage number*/
previous_btn.addEventListener('click', () => {
  stageNumber--;
  if (stageNumber < 1) stageNumber = 1;
  /*Large stage number on right*/
  document.getElementById('stage').innerHTML = stageNumber;
  /*small stage number on left*/
  /*document.getElementById('SLId').innerHTML=stageNumber;*/

  /*Change color when displaying the current stage */
  showStageColor();
})

//                                                                     Click stage nav number
/* If click the stage number, the display should now display this stage.  Can click previous/next to choose a stage number, but clicking the number confirms the choice and then displays that stage  */

const stageDisplay = document.querySelector('#stage');
stageDisplay.addEventListener('click', () => {
  /*click the displayed page number to deliver data*/
  /* Need call a php pagination script*/
  currentStage = stageNumber;
  document.getElementById("stage").innerHTML = "*" + stageNumber;
  showStageColor();
  document.getElementById('stageDesc').innerHTML = "Awaiting db for " + stageNumber;
  document.getElementById('stageName').innerHTML = "Awaiting db for " + stageNumber;
   buildStagesCardIfNeeded(keyHeader, rowKey, stageNumber);
 
});


/*                    Next          change stage number*/
next_btn.addEventListener('click', () => {
  stageNumber++; document.getElementById('stage').innerHTML = stageNumber;/*Large stage number*/
  /*document.getElementById('SLId').innerHTML=stageNumber;*/
  showStageColor();
})


/*react to button to make panel visible / invisible. css animates it*/
card_floating_btn.addEventListener('click', () => {
  sliding_panel_container.classList.toggle('visible')
});


/* open/close task card */
const list_floating_btn = document.querySelector('.list-floating-btn');
/*react to button to make panel visible / invisible. css animates it*/
list_floating_btn.addEventListener('click', () => {
  list_sliding_panel_container.classList.toggle('visible')
});
