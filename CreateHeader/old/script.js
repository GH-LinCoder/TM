
let prism = document.querySelector(".rec-prism");

function showCreateHeader(){
prism.style.transform = "translateZ(-100px) "; 

}
function createHeader(){
  
var str;
var request= new XMLHttpRequest();


str="userName "+ document.getElementById("name").value;
str+=" desc "+ document.getElementById("describe").value;
str+=" author "+ document.getElementById("author").value;



document.getElementById("panel").innerHTML="js createHeader has str=  "+str; 

request.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200){
  document.getElementById("panel").innerHTML+="<br> CreateTaskheader, this.responseText: produces:<br> "+ this.responseText +" <br>";
}  
}
request.open("GET", "insert_taskheader.php?data=" + str, true);
//request.open("POST", "insert_taskheader.php", true);

request.send();  // <<<<<<<<<<<<<<<<<<<<<

}

function showCreateStage(){
prism.style.transform = "translateZ(-100px) rotateY( +90deg)";
}
function createStage(){
 ; 
}

function showEditHeader(){
  prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
}
function editHeader(){
 ; 
}

function showEditStage(){
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  
}
function editStage(){
 ; 
}


function showManage(){
  prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
}


function showThankYou(){
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
  //         trying next 2 line 
  //var result = '<?php CreateHeader.php; ?>';
  //document.write('message showthankyou()');  
  //document.write(result);  
}

function showThankYouSignup(){
  prism.style.transform = "translateZ(-50px) rotateX( 90deg)";
//echo ( getElementsByName("email"+"<<<"));
}

function showThankYouLogin(){
  prism.style.transform = "translateZ(+50px) rotateX( 90deg)";


}
