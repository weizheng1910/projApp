var React = require("react");
var Layout = require('./layout.jsx')
var moment = require('moment');

class Given extends React.Component {
  render() {

    let dateNow = new Date()

    
    var list = this.props.result.map(task => {

      let tasksWithTheSameId = this.props.result.filter(el => el.task_id == task.task_id)

      let arrayOfDoneYets = tasksWithTheSameId.map(em => em.doneyet)

      if(arrayOfDoneYets.includes("No") == true) {
        console.log("Tasks is not ready Yet")
      } else {
        return <tr>
                <td><p className="text-success">{task.boardname}</p></td>
                <td><p className="text-success">{task.taskname}</p></td>
                <td><p className="text-success">{task.task_id}</p></td>
                <td><p className="text-success">{task.tobedoneby}</p></td>
                
                <td><p className="text-success">{task.createdat}</p></td>
                <td><p className="text-success">{task.duedate}</p></td>
                <td><p className="text-success font-weight-bold">{task.doneyet}</p></td>
                <td>
                  <form action={`/user/${task.ownerid}/editTask/${task.task_id}`} method='GET'>
                  <button id= {task.task_id} type="submit" className="btn text-white font-weight-bold" style={{backgroundColor:'#3b5998'}}>Edit</button>   
                  </form>
                </td>                
             </tr>
      }



      if(moment(task.duedate).toDate() < dateNow){
        
        return <tr>
                <td><p className="text-danger">{task.boardname}</p></td>
                <td><p className="text-danger">{task.taskname}</p></td>
                <td><p className="text-danger">{task.task_id}</p></td>
                <td><p className="text-danger">{task.tobedoneby}</p></td>
                
                <td><p className="text-danger">{task.createdat}</p></td>
                <td><p className="text-danger font-weight-bold">{task.duedate}</p></td>
                <td><p className="text-danger">{task.doneyet}</p></td>
                <td>
                  <form action={`/user/${task.ownerid}/editTask/${task.task_id}`} method='GET'>
                  <button id= {task.task_id} type="submit" className="btn text-white font-weight-bold" style={{backgroundColor:'#3b5998'}}>Edit</button>   
                  </form>
                </td>                
             </tr>
      } else {
        
        return <tr>
                  <td>{task.boardname}</td>
                  <td>{task.taskname}</td>
                  <td>{task.task_id}</td>
                  <td>{task.tobedoneby}</td>
                  
                  <td>{task.createdat}</td>
                  <td>{task.duedate}</td>
                  <td>{task.doneyet}</td>
                  <td>
                    <form action={`/user/${task.ownerid}/editTask/${task.task_id}`} method='GET'>
                  <button id= {task.task_id} type="submit" className="btn text-white font-weight-bold" style={{backgroundColor:'#3b5998'}}>Edit</button>   
                  </form>
                  </td>                
               </tr>
      }
    })
    
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
          
          <Layout userid={this.props.userid}>

          <div className="mx-3">
          <h3>Task Given</h3>
          </div>
          <div className="overflow-auto">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Project Name</th>
                <th scope="col">Task Name</th>
                <th scope="col">Task ID</th>
                <th scope="col">To Be Done By</th>
                
                <th scope="col">Date Created</th>
                <th scope="col">Date Due</th>
                <th scope="col">Done yet</th>
                <th scope="col"></th>
              </tr>
            </thead>
            
            <tbody>
              {list}
            </tbody>
            
          </table>
          </div>
          
          </Layout>

        </body>
      </html>
    );
  }
}

module.exports = Given;
