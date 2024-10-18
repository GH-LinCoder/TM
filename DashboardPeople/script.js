var summaryData=[];//assuming the php returns an array of this kind
summaryData[0]={"countMembers":112,"countStudents":14, "countManagers":4, "countTasks":34, "countStages":82, "countTaskList":62}

let prism = document.querySelector(".rec-prism");

let memberSummary=document.querySelector("#memberSummary");
//document.getElementById("memberSummary").value="Members [114]  change [+12]";
document.getElementById("memberSummary").value="Members ["+ summaryData[0].countMembers  +"] change [+12]";

let studentSummary=document.querySelector("#studentSummary");
document.getElementById("studentSummary").value="Students ["+summaryData[0].countStudents+"]  change [+2]";

let managerSummary=document.querySelector("#managerSummary");
document.getElementById("managerSummary").value="Managers ["+summaryData[0].countManagers+"]  change [0]";

let taskSummary=document.querySelector("#taskSummary");
document.getElementById("taskSummary").value="Tasks ["+summaryData[0].countTasks+"]  change [+3]";

let stagesSummary=document.querySelector("#stagesSummary");
document.getElementById("stagesSummary").value="Stages ["+summaryData[0].countStages+"]  change [+96]";

let tasklistSummary=document.querySelector("#tasklistSummary");
document.getElementById("tasklistSummary").value="Tasklist ["+summaryData[0].countTaskList+"]  change [+6]";


/*                                  Summary database reads                      */
//Need an XML or fetch call to read the database to count all the summary items
//count members, taskheaders, tasksStages, tasklist. Put together in summary=json_encode;
// javascript fetch??
//Put lots of divs in the html or build the html in javascript?  

function fetchSummary() {
  const url = '../QueryDb/QueryDbFetchSumary.php';/* Need code the PHP */
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Process the fetched data (e.g., place the count numbers in the summary )
    //summaryData=response.json;//AI says this is wrong and suggested the following...
    summaryData=data;
      console.log(summaryData); // For debugging
      document.getElementById("panel").innerHTML=summaryData[0].countMembers;
    
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}



fetchSummary();







/*                                      Prism show faces                     */

/* Display the summary first */
showSummary();

function showStudents(){//display students
  prism.style.transform = "translateZ(-100px)";
  //need fetch data: students
}

function showManagers(){//display managers
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  //need fetch data: managers
}

function showMembers(){//display user details
  prism.style.transform = "translateZ(-100px) rotateY( 180deg)"; 
  //need fetch data: members
}


function showAuthors(){//display tasks
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  //need fetch data: tasks & stages 
}

function showSummary(){ /* SUMMARY end face   z axis much closer so bigger*/
  prism.style.transform = "translateZ(100px) rotateX( 90deg)";
  //need fetch data: summary counts
}

function showManage(){//links to tasks z axis much closer so bigger
  prism.style.transform = "translateZ(100px) rotateX( -90deg)";
}
