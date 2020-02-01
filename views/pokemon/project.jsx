var React = require("react");
var Layout = require('./layout.jsx')


class Project extends React.Component {
  render() {

   var boards = this.props.boards;
   var userid = this.props.userid
   

    var list = this.props.result.map(function(tasks,index) {
      return (
        <div class="card bg-light m-3 " style={{width: 20 + 'rem'}} >
          <div class="card-header">
            <div class="d-flex justify-content-between">

              <div>
              {boards[index].name}
              </div>
            
              <div>
                <form action = {`/user/${userid}/deleteProj/${boards[index].id}?_method=delete`} method="POST">
                  <button type="submit" className="btn btn-danger">Delete</button>
                </form>
              </div>

            </div>
            <br></br>
            <small>{boards[index].description}</small>
          </div>

          <div class="card-body">
            {tasks.map(task => { return <div> {task.name}</div>})}
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
