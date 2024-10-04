Task and Member: A quirky combination of membership management and tracking simple tasks.

A database driven website to manage a membership system with task management (based on my use of Nationbuilder & Trello, but much more basic.)
[The task management is for training and organising of the members to create a self managed community.]

Discussion between members is in a linked Discord server


**Functions**
Assign members to various tasks & track & manage their advancement through the task

** General**
Login

**Task management**
Create a task name & description
Create stages in the task by name & description
Assign a task to specific member & assign someone to help/manage the process

Reports: Search the database & display as a list or a card the relevant details
         Be able to click any part of the list to go to other data or select / assign members

**Member management**
Invite to reply to polls to help determine interests
Allow to join groups
Manage groups
Link to Discord for discussions
         

**Tech stack**
Html, css, javascript
php
MariaDb (mySQL)
all running on Xampp

file by function 
(html + css + js for each function)
Each action has its own folder, html, css & js but not sure if they do all have their own css

**Contribution Credits**
Using forms forked from 'Prismatic' by Nour Saud on codepen.io
Using a card design from ???      om codepen.io


Started Sept 13 2024

==========================

htdocs/projects/t&m/

Connect_T&M.php  
Connects the webpage to the T&M database & leaves the connection open.
It can be used in any page that needs to connect

          "include('Connect_T&M.php');"

The using web page should end by closing the connection
         // Close the connection
            mysqli_close($conn);

============================
 
file by function 
(html + css + js for each function) <---------------- choosing this
not 
file by code 
(html of all the webpages by functions)
(css of all the webpages by functions)
(js of all the webpages of functions)

