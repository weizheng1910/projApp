var React = require("react");
var moment = require("moment");

class AddRequest extends React.Component {
  render() {
    /*Do a list of */

    var list = this.props.users.map((user) => {
      return <option value={user.id}>{user.name}</option>;
    });

    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
        </head>
        <body>
          <h3>Add Assignees</h3>
          <form
            action={`/user/${this.props.taskowner}/task/${this.props.taskid}/submitRequest`}
            method="POST"
          >
            <div className="form-group col-md-6">
              <label>Task ID</label>
              <input
                type="text"
                name="task_id"
                readOnly
                value={this.props.taskid}
                className="form-control"
              />
            </div>

            <div class="form-group">
              <label>Choose Assignees</label>
              <select required name="userchoices" multiple class="form-control">
                {list}
              </select>
            </div>

            <button type="submit" className="btn btn-success">
              Submit Assignees
            </button>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = AddRequest;
