let prism = document.querySelector(".rec-prism");

/* Display the summary first */
prism.style.transform = "translateZ(-100px) rotateX( 90deg)";


function showTasks(){//display tasks
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
}
function showStudents(){//display students
  prism.style.transform = "translateZ(-100px)";
}

function showManagers(){//display managers
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
}

function showMembers(){//display user details
  prism.style.transform = "translateZ(-100px) rotateY( 180deg)"; 
}

function showThankYou(){ /* SUMMARY end face*/
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
}

function showManage(){//links to tasks
  prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
}