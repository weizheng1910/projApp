## ProjApp

### Tech stack
PostgreSQL </br>
Express.js </br>
Node.js </br>
React.js


### Brief description of ERD and Schema
See [ERD](./erd.png) here. </br>
Each trading counterparty is represented by a **board**, which has many **tasks** belonging to it.</br>
You can assign a **task** to many users. The act of assigning a task is a **request**. So, a **task** can have many **requests**.</br>
A user will create a new **board**, whenever there is a trading counterparty has been onboarded. A user can create many **boards**.

### Brief explanation of how the app works

Users can create a task for other users, including themselves. The task has to have a deadline set and the trading counterparty specified.

There is another page for the users to see the tasks assigned to them, grouped according to the trading counterparty they are under. They can mark it as done when they have completed the task. 

There is an overview page to see all tasks which are ongoing. So every user has a overview of the current situation just by looking at this page.

### Process:

1. Drawing up the ERD.
2. Coming up with UX WireFrames for the App. 
3. Planning out complex SQL Queries based on what is required in the wireframes.
4. Planning out MVC Logic.


### Key Takeaways 

* MVC design pattern, which separates the code into Model, View, Controller, where :
  * Model is responsible for the database queries
  * View is responsible for displaying data
  * Controller is the logic responsible for responding to the client's input
* Using callback functions and creating modules to organise and orchestrate code 
* Performing SQL Queries which involves multiple INNER JOIN
* Conditional Rendering
* Using Express.js as the web framework, using npm packages (Moment.js) to support my application

### Reflections
* Nested callbacks can be avoided by using promises.

 
