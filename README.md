## ProjApp

### Background:

After working in Banking Operations for a year, I realised that it is difficult to stay on top of the tasks we have to do. Sometimes we can only work on a task after a team member has completed his or her part, and vice versa.

In Banking Operations where there are multiple trade issues from different counterparties going on at any point in time, such instances of task interdependence are many, and noting them down on pen and paper is tedious and messy. 

A manager, or any team member for that matter, is also not able to stay up to date of the pressing issues going on, relying on weekly team meetings to keep everyone updated.

ProjApp is a task management app which aims to resolve this issue. It serves as a central platform where team members can notify the tasks they have for each other, categorised according to the trading counterparty. They can also highlight pertinent issues they have, or give notifications of the things others have to be mindful about when dealing with a particular counterparty.

All of these tasks and issues are condensed into a single page so that every team member (not only the manager) can be instantly updated of everything which is going on. Any team member will be able to easily step in and deal with a client, when the go-to person isn't around. Less meetings or phone calls will be necessary.  

To sum up, this app aims to address information failure, reducing key person risk within the team.  

### Brief description of ERD and Schema
[ERD](./erd.png)</br>
Each trading counterparty is represented by a _board_, which has many _tasks_ belonging to it.

You can assign a _task_ to many users. The act of assigning a task is a _request_. So, a _task_ can have many _requests_.

A user will create a new board, whenever there is a new trading counterparty on board. A user can create many _boards_.

### Brief explanation of how it works

Users can create a task, for any other users, including themselves. They have to set a deadline and also the trading counterparty the task is under.

There is another page for the users to see the tasks assigned to them, organised by the trading counterparty they are under. Once they have completed the tasks, they will be able to check the tasks of the list, by clicking on a button.

There is an overview page to see the ongoing tasks. So every user has a sensing of the current situation just by referring to this page.

### Process:

1. Drawing up the ERD.
2. Coming up with UX WireFrames for the App. 
3. Planning out complex SQL Queries based on what is required in the wireframes.
4. Coding and testing. 

### Key Takeaways 

* MVC design pattern, which separates the code into Model, View, Controller, where :
  * Model is responsible for the database queries
  * View is responsible for displaying data
  * Controller is the logic responsible for responding to the client's input
* Using callback functions and creating modules to organise and orchestrate code 
* Performing SQL Queries which involves multiple INNER JOIN
* Conditional Rendering, using React.js
* Using Express.js as the web framework for this application 

I am confident in displaying 

### Things which I can improve on: 

1. Planning the User Flow. Feedback from my instructors and TAs were that the User Flow was messy. This is because I have not given thought to it.
2. Theme originality. Color theme was a replica of Facebook's. I copied Facebook because it looks neat and vibrant. In the future, I will put in more effort on the color theme. 
4. Features. Features on hindsight could be improved upon to better suit the needs of the end-user. 
  Additional features could include:
 - A separate category to display only reminders of the things to look out for when dealing with a particular client. 
 - For task reminders like meetings,  the task could be automatically cleared from the application when it reaches the deadline. 
 
 More thought should be given to the features and how it caters to the end user. 
