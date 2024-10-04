let prism = document.querySelector(".rec-prism");

function showSignup(){ //right
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  document.getElementById("panel").innerHTML="Pleased to meet you";
}
function showLogin(){ //front
  prism.style.transform = "translateZ(-100px)";
  document.getElementById("panel").innerHTML="Welcome back";

}
function showForgotPassword(){ //back
  prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
  document.getElementById("panel").innerHTML="Memory not what it used to be";
}

function showSubscribe(){ //right
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
  document.getElementById("panel").innerHTML="Newsletters could end up in spam";
}

function showContactUs(){ //Left
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  document.getElementById("panel").innerHTML="What have we done now?";
}

function showManage(){//bottom
  prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
  document.getElementById("panel").innerHTML="Get busy";
}


function showThankYou(){//top

  document.getElementById("panel").innerHTML="Thanks for submitting";
}

function signUp(){//top
/** need to insert in members */
  document.getElementById("panel").innerHTML="Thanks";
}