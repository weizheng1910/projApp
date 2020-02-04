var React = require("react");
var Layout = require('./layout.jsx')

class Received extends React.Component {
  render() {

      var boards = this.props.boards;

      var res = this.props.resultArray.filter(tk => tk.length > 0);
      
     
    
    var list = res.map(function(tasks,index) {

      let boardid = tasks[0].board_id;
      let selectedBoardArray = boards.filter(bd => bd.id == boardid);
      let selectedBoard = selectedBoardArray[0]


      return <div class="card m-3" style={{width: 50 + 'rem'}} >
          <div class="card-header">
        
          <h3>{selectedBoard.name}</h3>
          <p>{selectedBoard.description}</p>
        </div>
        <table class="table">
        <thead>
          <tr>
            <th scope="col">Task ID</th>
            <th scope="col">Task Name</th>
            <th scope="col">Assigned By</th>
            <th scope="col">Client</th>
            <th scope="col">Created At</th>
            <th scope="col">Due Date</th>
            <th scope="col">Done yet</th>
          </tr>
        </thead>
          <tbody>
      {tasks.map(x => { 

          var doneyet;

                    if(x.doneyet == "Yes"){
                    doneyet = <form action={`/toggleDone/${x.requestid}`} method='GET'>
                      <button type='submit' className="btn text-white font-weight-bold" style={{backgroundColor:'#3b5998'}} id= {x.requestid}  >Yes</button>
                    </form>
                    } else {
                        doneyet = 
                      <form action={`/toggleDone/${x.requestid}`} method='GET'>
                      <button type='submit' className="btn btn-secondary text-white font-weight-bold " id= {x.requestid}  >No</button>
                    </form>
                    }

        return <tr>
                  <td>{x.task_id}</td>  
                  <td>{x.taskname}</td>
                  <td>{x.reqbyusername}</td>
                  <td>{x.boardname}</td>
                  <td>{x.createdat}</td>
                  <td>{x.duedate}</td>
                  
                  <td>
                  {doneyet}
                  </td>
                </tr>
    })}
    </tbody>
    </table>
    </div>
  })
      



    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
        
        <Layout userid={this.props.userid}>
            <div class="mx-3">
            <h3>Welcome, {this.props.username}</h3>
            <h4>These are the tasks assigned to you</h4>
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

module.exports = Received;
