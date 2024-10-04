T&M = "Task & Management"

A database driven website to manage a membership system with task management (based on my use of Nationbuilder & Trello, but much more basic.)
[The task management is for training and organising if of the members to create a self managed community.]

Program on XAMPP PHP, Javascript, SQL using MariaDB

Using forms forked from 'Prismatic' by Nour Saud on codepen.io

==========================

htdocs/projects/t&m/

login/ login.html, css, js
createheader/ creatheader.html, css, js  (same css as login?)
createStage/ createstage.html  etc


Connect_T&M.php  Connects the webpage to the T&M database & leaves the connection open.
It can be used in any page that needs to connect

          include('Connect_T&M.php');

The using web page should end by closing the connection
         // Close the connection
            mysqli_close($conn);

============================
Question 
file by function 
(html + css + js for each function) <---------------- choosing this
or 
file by code 
(html of all the webpages by functions)
(css of all the webpages by functions)
(js of all the webpages of functions)

