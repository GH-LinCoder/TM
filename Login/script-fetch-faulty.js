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

async function signUp(){//top
/** need to insert in members */
  document.getElementById("panel").innerHTML="Thanks";

  const email = (document.getElementById("email").value);
  const name =  (document.getElementById("name").value);

    const str={
      name: name,
      email: email
    };
    
    console.log(str);
    try {
      const response = await fetch('QueryDbSignUp.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(str)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');   
  
      }
  
      const result = await response.json();
      console.log(result); // Handle the response from the server
    } catch (error) {
      console.error('Error:', error);   
  
      // Handle errors, e.g., display an error message to the user
    }
  }



    // fetchDbSingle('../QueryDb/QueryDbSignUp.php',str);




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

