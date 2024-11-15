let prism = document.querySelector(".rec-prism");
const logToConsole=true;
//const logToConsole=false; 

function showSignup(){ //right
  if(logToConsole) console.log('showSignup()');
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  document.getElementById("panel").innerHTML="Pleased to meet you";
}
function showLogin(){ //front
  if(logToConsole) console.log('showLogin()');
  prism.style.transform = "translateZ(-100px)";
  document.getElementById("panel").innerHTML="Welcome back";

}
function showForgotPassword(){ //back
  if(logToConsole) console.log('showAPassword()');
  prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
  document.getElementById("panel").innerHTML="Memory not what it used to be";
}

function showSubscribe(){ //right
  if(logToConsole) console.log('showSubscribe()');
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
  document.getElementById("panel").innerHTML="Newsletters could end up in spam";
}

function showContactUs(){ //Left
  if(logToConsole) console.log('showContactUs()');
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  document.getElementById("panel").innerHTML="What have we done now?";
}

function showManage(){//bottom
  if(logToConsole) console.log('showManage()');
  prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
  document.getElementById("panel").innerHTML="Get busy";
}


function showThankYou(){//top
  if(logToConsole) console.log('showThankYou()');
  document.getElementById("panel").innerHTML="Thanks for submitting";
}

async function signUp(){//top
/** need to insert in members */
if(logToConsole) console.log('showSignUp()');
  document.getElementById("panel").innerHTML="Thanks";

  inputName= encodeURIComponent(document.getElementById("name").value) ;
  inputEmail= encodeURIComponent(document.getElementById("email").value);

//inputName = inputName.replace(/[^a-zA-Z]+/, '');
//let regex=/^(?=.*[a-zA-Z])[!£%a-zA-Z0-9-_ ]+$/; /*requires at least one a-z or A-Z, and accepts 0-9 ! £ % - _ */
//regex.test(text) //true or false
//document.getElementById("panel").innerHTML = "<b>Input:</b>"+"<i>"+"accepts a-z or A-Z or 0-9  ! £ % - _"+"</i><br>";


//inputEmail = inputEmail.replace(/[^a-zA-Z]+[0-9]+/, '@', '.','');
console.log(inputName + " "+inputEmail);



  document.getElementById("panel").innerHTML="js sign up "; 
 var request= new XMLHttpRequest();
 

 //build a string of the above inputs from the web page form. Format it like an indexed array. Separate with &. "label1=" value1 +"&label2=" value2
 str="name="+ inputName;
 str+="&email="+ inputEmail;
 
 document.getElementById("panel").innerHTML="js createStage has str=<br>  "+str +"<p>"; //developer feedback FAILS here but works in other function stage<<<<<<<<<<<<<<
 
 //the call to the server will be asynchronous & checked for notification of completion. readystate starts at 0 & goes to 4 when complete
 //the server returns a ststus of 200 if the task was run or an error code of 400, 401, 403 
 //it may print on screen later than the below instructions
 request.onreadystatechange = function() {
 
   if (this.readyState == 4 && this.status == 200){
   //must call response text?  Have I left something out? Wierd, if I comment this like out the script fails
   document.getElementById("panel").innerHTML+="<br> SignUp(), this.responseText:<br> "+ request.responseText +"<br>";
 
  } 
    
 }
 
 //need to prevent send if missing input (need to validate the input NOT YET IMPLEMENTED)
 if (inputName.length=="" || inputEmail=="") { 
   document.getElementById("panel").innerHTML="Can't send to database because of lack of input(BAD nulls)<br>  ";  
 } else {document.getElementById("panel").innerHTML="js signup() has no nullS=<br>  ";
 
 request.open("POST", "insert_member.php", true);
 //the serve needs some extra data
 request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //??????
 //the data is sent in str which is formatted like an indexed array  label1=" value1 +"&label2=" value2
 request.send(str);  
 
  }



    // fetchDbSingle('../QueryDb/QueryDbSignUp.php',str);




async function fetchDbSingle(url,str) {
  if(logToConsole) console.log('fetchDbSingle()');
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

}