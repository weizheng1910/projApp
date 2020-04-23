var React = require("react");
var moment = require("moment");
var Layout = require("./layout.jsx");

class CreateTask extends React.Component {
  render() {
    var list = this.props.allBoards.map((board) => {
      return <option value={board.id}>{board.name}</option>;
    });

    var nextTaskId;
    if (this.props.task.id) {
      nextTaskId = parseInt(this.props.task.id) + 1;
    } else {
      nextTaskId = 1;
    }

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
          <Layout userid={this.props.userid}>
            <div class="mx-3">
              <h3>Create Task</h3>
            </div>
            <form action={`/createTask?_method=put`} method="POST">
              <div className="form-group col-md-6">
                <label>Task ID</label>
                <input
                  type="text"
                  name="task_id"
                  readOnly
                  value={nextTaskId}
                  className="form-control"
                />
              </div>

              <div className="form-group col-md-6">
                <label>Task Name</label>
                <textarea required name="taskname" className="form-control" />
              </div>

              <div className="form-group col-md-6">
                <label>User ID</label>
                <input
                  type="text"
                  name="user_id"
                  readOnly
                  value={this.props.userid}
                  className="form-control"
                />
              </div>

              <div className="form-group col-md-6">
                <label>Created At</label>
                <input
                  type="text"
                  name="createdAt"
                  readOnly
                  value={moment(new Date()).format("LLL")}
                  className="form-control"
                />
              </div>

              <div className="form-group col-md-6">
                <label>Date Due</label>
                <input
                  required
                  type="datetime-local"
                  name="dueDate"
                  className="form-control"
                />
              </div>

              <div className="form-group col-md-6">
                <label>Project </label>
                <br></br>
                <select name="project">{list}</select>
              </div>
              <div class="mx-3">
                <button type="submit" className="btn btn-success">
                  Create Task
                </button>
              </div>
            </form>
          </Layout>
        </body>
      </html>
    );
  }
}

module.exports = CreateTask;
