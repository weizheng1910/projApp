var React = require("react");
var moment = require('moment');

class EditRequest extends React.Component {
  render() {
    var asigneesArray = this.props.requests.map(req => req.user_id)
    
    var userArray = this.props.users.map(user => {
      if(asigneesArray.includes(user.id) == true){
        return <option selected value={user.id}>{user.name}</option>
      } else {
        return <option value={user.id}>{user.name}</option>
      }
    })


    /*Do a list of */

    var list = this.props.users.map(user => {
      return <option value={user.id}>{user.name}</option>
    })
    
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
          <h3>Add Assignees</h3>
          <form action = {`/abc/`} method="POST">

            <div className="form-group col-md-6">
              <label>Task ID</label>
              <input type="text" name="task_id" readOnly value={this.props.taskid} className="form-control"/>
            </div>

            <div class="form-group">
              <label>Choose Assignees</label>
              <select name='userchoices'multiple class="form-control">
                {userArray}
              </select>
            </div>
            
            <button type="submit" className="btn btn-success">Submit Assignees</button>
          </form>
          
          
        </body>
      </html>
    );
  }
}

module.exports = EditRequest;
