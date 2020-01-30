var React = require("react");

class Given extends React.Component {
  render() {

    console.log(this.props.result)
    var list = this.props.result.map(task => {
      return <tr>
                <td>{task.boardname}</td>
                <td>{task.taskname}</td>
                <td>{task.task_id}</td>
                <td>{task.tobedoneby}</td>
                <td>{task.requestid}</td>
                <td>{task.createdat}</td>
                <td>{task.duedate}</td>
                <td>{task.doneyet}</td>
                <td>
                  <form action={`/editTask/${task.task_id}`} method='GET'>
                    <button type='submit' id= {task.task_id} >Edit Task</button>
                  </form>
                </td>                
             </tr>
    })
    console.log(this.props.result);
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
          <h3>Task Given</h3>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Project Name</th>
                <th scope="col">Task Name</th>
                <th scope="col">Task ID</th>
                <th scope="col">To Be Done By</th>
                <th scope="col">Request ID</th>
                <th scope="col">Date Created</th>
                <th scope="col">Date Due</th>
                <th scope="col">Done yet</th>
                <th scope="col"> - </th>
              </tr>
            </thead>
            <tbody>
              {list}
            </tbody>
          </table>
          
        </body>
      </html>
    );
  }
}

module.exports = Given;
