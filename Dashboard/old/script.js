//                           table display

//create a table and give it a class for css to use
const table = document.createElement('table');
table.classList.add('table');

//headers
let headerRow = table.insertRow();
headerRow.classList.add('headerRow');
let cell = headerRow.insertCell(); cell.textContent = "THId";
cell = headerRow.insertCell(); cell.textContent ="TaskName";
cell = headerRow.insertCell(); cell.textContent ="TaskDesc";

//rows of data
row = table.insertRow();row.classList.add('table-row');
cell = row.insertCell();cell.classList.add('table-cell'); cell.textContent = "1";
cell = row.insertCell(); cell.classList.add('table-cell'); cell.textContent = "Taskie una";
cell = row.insertCell(); cell.classList.add('table-cell'); cell.textContent = "The long road to learning";

row = table.insertRow();row.classList.add('table-row');

cell = row.insertCell();cell.classList.add('table-cell'); cell.textContent = "2";
cell = row.insertCell(); cell.classList.add('table-cell'); cell.textContent = "Dos de tarea";
cell = row.insertCell(); cell.classList.add('table-cell'); cell.textContent = "El camino largo";

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
cardKeyTitle.textContent="Pages";
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





//                          Card display (jsCard columns + nav)

var taskNumber=37, currentTask=37;//arbitrary test numbers
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

cardKeyTitle = document.createElement('h6');
//cardKeyTitle.textContent = 'Key';
cardKeyTitle.style.color='white';
cardKeyTitle.className = 'h6';
cardKeyTitle.style.position='absoloute';
cardKeyTitle.id="cardKey";

cardKeyDiv.appendChild(cardKeyTitle);



let keyContent = document.createElement('div');
keyContent.id='cardKey';
keyContent.textContent="Key from db";

cardKeyDiv.appendChild(keyContent);

cardDiv.appendChild(cardKeyDiv);     
//here

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
	
	
let rowLength=5; //test to create columns in card
for (var i = 2; i < rowLength+1; i++) {
	createCardDiv(i);
 //console.log(i);
 // more statements
}



//                        jsCard nav buttons & display

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
cell.appendChild( cardKeyTitle);

document.getElementById('cardName').innerHTML='Task';
//this name could be "TASK" or something else based on context


cell = tableTopRow.insertCell(); cell.classList.add('table-cell'); cell.textContent = currentTask;



table2ndRow= tableNav.insertRow();
table2ndRow.classList.add('table2ndRow');
cell = table2ndRow.insertCell(); 
cell.classList.add('table-cell'); 
cell.colSpan = 2;

let previousButton = document.createElement('button');
previousButton.innerText = 'Previous';
       // button.setAttribute('onclick', 'function()');
previousButton.classList.add('btn');
cell.appendChild(previousButton);
previousButton.id="PreviousTask";


table3rdRow= tableNav.insertRow();
table3rdRow.classList.add('table3rdRow');
cell = table3rdRow.insertCell(); 
cell.classList.add('stageNumber'); 
cell.colSpan = 2;
cell.id="task";

//cell.textContent = "4";

table4thRow= tableNav.insertRow();
table4thRow.classList.add('table4thRow');
cell = table4thRow.insertCell(); 
cell.classList.add('table-cell'); 
cell.colSpan = 2;
let nextButton = document.createElement('button');
nextButton.innerText = 'Next';
nextButton.id="NextTask";
       // button.setAttribute('onclick', 'function()');
nextButton.classList.add('btn');
cell.appendChild(nextButton);

document.getElementById('cardDivNav').appendChild(tableNav);


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

cardDivNav.appendChild(tableNav);

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
Click [Previous]  [Next] to choose which task to display. Click the displayed [number] to confirm.
When task on display is the same as the number displayed the background becomes green */ 


/*                    Previous/Next buttons          change task number*/
const previousTask_btn = document.querySelector('#PreviousTask');
const task= document.querySelector('#task');
const nextTask_btn = document.querySelector('#NextTask');

document.getElementById('task').innerHTML=taskNumber;/*Large stage number on right*/

document.getElementById('cardKey').innerHTML=taskNumber;/*small stage number on right*/

function showTaskColor(){
	
		if(taskNumber==currentTask){task.style.backgroundColor = 'lightgreen';
} else task.style.backgroundColor = '#ffd';			  

}

showTaskColor();


/*                    Previous          change stage number*/
previousTask_btn.addEventListener('click', () => {
 taskNumber--;
 if(taskNumber<1)taskNumber=1;
	/*Large task number on right*/
 document.getElementById('task').innerHTML=taskNumber;
	/*small task number on left*/

	/*don't change the small taskId until the task being displayed changes*/
/* document.getElementById('taskId').innerHTML=taskNumber;*/

	/*Change color when displaying the current task */
showTaskColor();
})


/* If click the task number, the display should now display this task.  Can click previous/next to choose a task number, but clicking the number confirms the choice and then displays that task  */

const taskDisplay = document.querySelector('#task');
taskDisplay.addEventListener('click', () => {
	/*click the displayed page number to deliver data*/
	/* Need call a php pagination script*/
	currentTask=taskNumber;
	document.getElementById("task").innerHTML="*"+taskNumber;
showTaskColor();
/*	document.getElementById('taskId').innerHTML=taskNumber;*/
		document.getElementById('cardKey').innerHTML="Awaiting db for "+taskNumber;
		
});


/*                    Next          change task number*/
nextTask_btn.addEventListener('click', () => { taskNumber++; document.getElementById('task').innerHTML=taskNumber;/*Large task number on right*/
/*don't change the taskId until the page change is confirmed*/											  
/*document.getElementById('taskId').innerHTML=taskNumber;	*/
showTaskColor();		 })


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

/*                       floating panel for card         */
const list_sliding_panel_container = document.querySelector('.list-sliding-panel-container');

/* open/close task card */
const list_floating_btn = document.querySelector('.list-floating-btn');

/*react to button to make panel visible / invisible. css animates it*/
list_floating_btn.addEventListener('click', () => {
	list_sliding_panel_container.classList.toggle('visible')
});


/*                                Table  Pages   
Click [Previous]  [Next] to choose which page of database rows to display. Click the displayed [number] to confirm. When page on display is the same as the number displayed the background becomes green */ 

var pageNumber=1, currentPage=1;
function showPageColor(){
		if(currentPage==pageNumber){page.style.backgroundColor = 'lightgreen';} else page.style.backgroundColor = "rgb(203, 199, 170)";
	
}
showPageColor();

//event listeners for the list page nav buttons

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
	currentPage=pageNumber;
	document.getElementById("page").innerHTML="*"+pageNumber;	
showPageColor();
	/*Call for the php*/
	/* display the data */
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