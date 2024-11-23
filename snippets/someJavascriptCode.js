let logToConsole=true;


var rowData={THId:'2', TaskName:'To climb a tree', TaskDesc:'Try using hands & feet'};
var remember=[];

function rememberProcess(remember){
    if(logToConsole) console.log('RememberProcess()');
for(i=0;i<remember.length;i+=2){
    console.log('Item ',i/2+1,' of ', remember.length/2,' items', 'Remember as ',remember[i], remember[i+1]);}        
}

function putDataIntoRemember(menuHeader,rowData){
    if(logToConsole) console.log('putDataIntoRemember()');
    remember.push(menuHeader);
    remember.push(rowData);
}

function deleteMenu(menuLu){
    if(logToConsole) console.log('deleteMenu()');
    //const menu = menuLu.parentNode; // Get the parent table element
    menuLu.parentNode.removeChild(menuLu);
}

function showRememberMenu(){
    if(logToConsole) console.log('showRememberMenu()');

 if(document.querySelector('#rememberMenu') ) return; //menu already exists

    const remember_button = document.querySelector('#remember');
    const menuHeaders=['EXIT no save', 'as Student', 'as Manager', 'as Author', 'as Task' , 'as Note'];
    menuLu=document.createElement('lu');
    menuLu.id='rememberMenu';

for(let i=0;i<menuHeaders.length;i++){
    li=document.createElement('li');               //  console.log(menuHeaders[i]);//ok
    li.innerText=menuHeaders[i]; // li.innerHTML = `Remember as ${menuHeaders[i]}`; //Gemini suggests this syntax 
    li.id=menuHeaders[i];
    li.classList.add('rememberLi');
    
    li.addEventListener('click', () => { //console.log('li button clicked', menuHeaders[i], rowData)
        if(menuHeaders[i]=='EXIT no save') {deleteMenu(menuLu);return};
    putDataIntoRemember(menuHeaders[i], rowData);//[header][rowData]       
    rememberProcess(remember);//do something with the stored data structure
    deleteMenu(menuLu);
      })

    menuLu.appendChild(li);
    }

remember_button.appendChild(menuLu);      
}

/* 
Gemini suggests this event delegation, which I don't understand

const remember_button = document.querySelector('#remember');
const menuLu = document.createElement('lu');
menuLu.id = 'rememberMenu';

remember_button.appendChild(menuLu);

// Create menu items once outside the loop
const menuItems = [];
for (let i = 0; i < menuHeaders.length; i++) {
  const li = document.createElement('li');
  li.innerHTML = `Remember as ${menuHeaders[i]}`;
  li.id = menuHeaders[i];
  menuItems.push(li);
}

// Add items to the list
menuItems.forEach(item => menuLu.appendChild(item));

// Attach event listener to the parent element (remember_button)
remember_button.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const clickedItem = event.target.textContent;
    console.log('Clicked item:', clickedItem);
    remember.push(clickedItem);
    remember.push(rowData);

    // ... other actions based on clicked item
  }
});

*/