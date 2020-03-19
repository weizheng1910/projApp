## ProjApp

### Background:

After working in Banking Operations for a year, I realised that it is difficult to stay on top of the tasks we have to do. Sometimes we can only work on a task after a team member has completed his or her part, and vice versa.

In Banking Operations where there are multiple trade issues from different counterparties going on at any point in time, such instances of task interdependence are many, and noting them down on pen and paper is tedious and messy. 

A manager, or any team member for that matter, is also not able to stay up to date of the pressing issues going on, relying on weekly team meetings to keep everyone updated.

ProjApp is a task management app which aims to resolve this issue. It serves as a central platform where team members can notify the tasks they have for each other, categorised according to the trading counterparty. They can also highlight pertinent issues they have, or give notifications of the things others have to be mindful about when dealing with a particular counterparty.

All of these tasks and issues are condensed into a single page so that every team member (not only the manager) can be instantly updated of everything which is going on. Any team member will be able to easily step in and deal with a client, when the go-to person isn't around. Less meetings or phone calls will be necessary.  

To sum up, this app aims to address information failure, reducing key person risk within the team.  

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
* Conditional Rendering, using React.js
* Using Express.js as the web framework, using npm packages (Moment.js) to support my application
 
