# EmployeeTracker

## Assignment Instructions
We created a database with 3 tables. A department table, role table, and employee table. 

Here is an image of all our 3 tables created. 
<img src='/Media/capture1.png' width='300'/>

In our app.js file we mainly use the inquirer and mysql npm to build our application. Depending on the user selection we will run through a specific route of code the meet the requirements. 

In the example of adding an employee, we have a function called 'addEmployee' that will run. We will ask them for the first name, last name, role, and manager. The role selection is built fromt he existing map table which we will display the existing roles and also place the built-in 'id' that is associated with that role. The user is also able to choose an existing employee to be the manager of the newly created employee. We create an array of employees which also has a unique id that is associated with the selected manager employee. In the case of no existing employee we also created a name 'None' with a null value that we push onto the array of employees. Once that is done we use db.query to 'INSERT INTO' to push the new employee into the table of employees. 

This is just one of the many options that the user is able to do within this application. 

Side Note: I have removed the password from  line 5 for security reasons.