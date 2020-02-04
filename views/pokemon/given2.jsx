var React = require("react");
var Layout = require('./layout.jsx');
var moment = require('moment');


class Project extends React.Component {
  render() {

   var boards = this.props.boards;
   var userid = this.props.userid;
   var username = this.props.theName;
   var requestsWithAssigneeName = this.props.requestsWithAssigneeName;

   var dateNow = new Date()

   var x = this.props.result.filter(tasks => tasks.length > 0)

    var list = x.map(function(tasks,index) {


      let boardid = tasks[0].board_id
      let selectedBoardArray = boards.filter(bd => bd.id == boardid)
      let selectedBoard = selectedBoardArray[0]

      var chunk; 

      if (userid == selectedBoard.user_id){
        chunk = <div class="w-25 d-flex justify-content-between">

                <div class="mx-1">
                  <form action = {`/user/${userid}/editProj/${selectedBoard.id}`} method="GET">
                    <button type="submit" className="btn text-white font-weight-bold" style={{backgroundColor:'#3b5998'}}>Edit</button>
                  </form>
                </div>
              
                <div class="mx-1">
                  <form action = {`/user/${userid}/deleteProj/${selectedBoard.id}?_method=delete`} method="POST">
                    <button type="submit" className="btn btn-outline-secondary font-weight-bold">Delete</button>
                  </form>
                </div>

              </div>
      } 



      return (
        <div class="card m-3" style={{width: 40 + 'rem'}} >
          <div class="card-header">
            <div class="d-flex justify-content-between">

              <div class="text-secondary font-weight-bold">
              {selectedBoard.name}
              </div>

              
             


            </div>
            <br></br>
            <small>{selectedBoard.description}</small>
          </div>

          <div class="card-body">
            {tasks.map(task => { 
              
              let currentId = task.task_id
               
              
              let requestsWithAssigneeNameOfTaskId = requestsWithAssigneeName.filter(tk => currentId == tk.task_id);
              let y = requestsWithAssigneeNameOfTaskId.map(tsk => tsk.name);
              let z = requestsWithAssigneeNameOfTaskId.map(tsk => tsk.doneyet);
              let p = requestsWithAssigneeNameOfTaskId.map(function(tsk){ return {
                name: tsk.name,
                doneyet: tsk.doneyet,
              }})

              let p2 = p.filter(t => t.doneyet == "No")
              
              let string = "";

              if (y.length == 1){
                string += y[0]
              } else {

                for(let i = 0; i < y.length; i++){
                  if(i == y.length - 1){
                    string += "and "+y[i]
                  } else {
                    string += y[i]+", "
                  }
                }
              }

              let string2 = ""

              if (p2.length == 1){
                string2 += p2[0].name
              } else {

                for(let i = 0; i < p2.length; i++){
                  if(i == p2.length - 1){
                    string2 += "and "+p2[i].name
                  } else {
                    string2 += p2[i].name+", "
                  }
                }
              }



              if (string === "") {
                return <div class="m-3 d-flex justify-content-between"> 
                    
                    <div class="w-75">
                      {task.taskname}
                      <br></br>                     
                      <small>Created on: {task.createdat} </small>
                      <br></br>
                      <small>Unassigned </small>                    
                      <br></br>
                      
                      <small>Due by: {task.duedate}</small>
                    </div>

                    <div>
                      <p class="font-weight-bold text-warning">UNTAGGED</p>
                      <div>
                          <form action={`/user/${task.ownerid}/editTask/${task.task_id}`} method='GET'>
                              <button id= {task.task_id} type="submit" className="btn btn-outline-primary" >Edit Task</button>   
                            </form>
                      </div>
                    </div>

                    </div>   
              }


              if(z.includes("No") == false){
                return <div class="m-3 d-flex justify-content-between"> 
                    
                    <div class="w-75">
                      {task.taskname}
                      <br></br>                     
                      <small>Created on: {task.createdat} </small>
                      <br></br>
                      <small>Assigned to: {string} </small>                    
                      <br></br>
                      
                      <small>Due by: {task.duedate}</small>
                    </div>

                    <div>
                      <p class="font-weight-bold text-success">COMPLETED</p>
                      <div>
                          <form action={`/user/${task.ownerid}/editTask/${task.task_id}`} method='GET'>
                              <button id= {task.task_id} type="submit" className="btn btn-outline-primary" >Edit Task</button>   
                            </form>
                      </div>
                    </div>

                    </div>      
              }else if(moment(task.duedate).toDate() < dateNow){
                  return <div class="m-3 d-flex justify-content-between"> 
                      
                      <div class="w-75">
                        {task.taskname}
                        <br></br>                        
                        <small>Created on: {task.createdat} </small>
                        <br></br>
                        <small>Assigned to: {string} </small>                    
                        <br></br>
                        <small>Unattempted: {string2}</small>
                      <br></br>
                        <small class="font-weight-bold">Due by: {task.duedate}</small>
                      </div>

                      <div>
                        <p class="font-weight-bold text-danger">OVERDUE</p>
                        <div>
                          <form action={`/user/${task.ownerid}/editTask/${task.task_id}`} method='GET'>
                              <button id= {task.task_id} type="submit" className="btn btn-outline-primary" >Edit Task</button>   
                            </form>
                      </div>
                      </div>

                      </div> 
                } else {

                  return <div class="m-3 d-flex justify-content-between"> 
                      
                      <div class="w-75">
                        {task.taskname}
                        <br></br>                        
                        <small>Created on: {task.createdat} </small>
                        <br></br>
                        <small>Assigned to: {string} </small>                    
                        <br></br>
                        <small>Unattempted: {string2}</small>
                         <br></br>
                        <small>Due by: {task.duedate}</small>
                      </div>

                      <div>
                      <p class="font-weight-bold text-secondary">ONGOING</p>
                          <form action={`/user/${task.ownerid}/editTask/${task.task_id}`} method='GET'>
                              <button id= {task.task_id} type="submit" className="btn btn-outline-primary" >Edit Task</button>   
                            </form>
                      </div>

                      </div>

                }

                })
              }

              

          </div>
        </div>)
    })
    
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>

        <Layout userid={this.props.userid}>

          <div class="mx-4">
          <h3>Welcome, {username}</h3>
          <h4>These are the tasks you have assigned others to do</h4>
          </div>
          
          <div class="d-flex justify-content-around flex-wrap">
          {list}
          </div>

          </Layout>
          
          
        </body>
      </html>
    );
  }
}

module.exports = Project;
