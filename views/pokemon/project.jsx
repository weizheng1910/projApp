var React = require("react");
var Layout = require('./layout.jsx');
var moment = require('moment');


class Project extends React.Component {
  render() {

   var boards = this.props.boards;
   var userid = this.props.userid;
   var requestsWithAssigneeName = this.props.requestsWithAssigneeName;

   var dateNow = new Date()

    var list = this.props.result.map(function(tasks,index) {
      return (
        <div class="card m-3" style={{width: 35 + 'rem'}} >
          <div class="card-header">
            <div class="d-flex justify-content-between">

              <div class="text-secondary font-weight-bold">
              {boards[index].name}
              </div>

              <div class="w-25 d-flex justify-content-between">

                <div class="mx-1">
                  <form action = {`/user/${userid}/editProj/${boards[index].id}`} method="GET">
                    <button type="submit" className="btn text-white font-weight-bold" style={{backgroundColor:'#3b5998'}}>Edit</button>
                  </form>
                </div>
              
                <div class="mx-1">
                  <form action = {`/user/${userid}/deleteProj/${boards[index].id}?_method=delete`} method="POST">
                    <button type="submit" className="btn btn-outline-secondary font-weight-bold">Delete</button>
                  </form>
                </div>

              </div>



            </div>
            <br></br>
            <small>{boards[index].description}</small>
          </div>

          <div class="card-body">
            {tasks.map(task => { 
              
              let currentId = task.task_id
              
              let requestsWithAssigneeNameOfTaskId = requestsWithAssigneeName.filter(tk => currentId == tk.task_id);
              let y = requestsWithAssigneeNameOfTaskId.map(tsk => tsk.name);
              let z = requestsWithAssigneeNameOfTaskId.map(tsk => tsk.doneyet);
              
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

              if (string === "") {
                string = "Unassigned"
              }


              if(z.includes("No") == false){
                return <div class="m-3 d-flex justify-content-between"> 
                    
                    <div >
                      {task.taskname}
                      <br></br>                     
                      <small>Assigned by {task.username} on {task.createdat} </small>
                      <br></br>
                      <small>To {string} </small>                    
                      <br></br>
                      <small>Due by: {task.duedate}</small>
                    </div>

                    <div>
                      <p class="font-weight-bold text-success">COMPLETED</p>
                    </div>

                    </div>      
              }else if(moment(task.duedate).toDate() < dateNow){
                  return <div class="m-3 d-flex justify-content-between"> 
                      
                      <div>
                        {task.taskname}
                        <br></br>                        
                        <small>Assigned by {task.username} on {task.createdat} </small>
                        <br></br>
                        <small>To {string} </small>                    
                        <br></br>
                        <small class="font-weight-bold">Due by: {task.duedate}</small>
                      </div>

                      <div>
                        <p class="font-weight-bold text-danger">OVERDUE</p>
                      </div>

                      </div> 
                } else {

                  return <div class="m-3"> 
                      
                      <div>
                        {task.taskname}
                        <br></br>                        
                        <small>Assigned by {task.username} on {task.createdat} </small>
                        <br></br>
                        <small>To {string} </small>                    
                        <br></br>
                        <small>Due by: {task.duedate}</small>
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
          <h3>Project Overview</h3>
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
