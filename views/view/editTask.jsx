var React = require("react");
var Layout = require("./layout.jsx");

class EditTask extends React.Component {
  render() {
    var list = this.props.allBoards.map((board) => {
      if (board.id == this.props.task.board_id) {
        return (
          <option selected value={board.id}>
            {board.name}
          </option>
        );
      } else {
        return <option value={board.id}>{board.name}</option>;
      }
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
          <Layout userid={this.props.userid}>
            <div class="mx-3">
              <h3>Edit Task</h3>
            </div>
            <form
              action={`/user/${this.props.currentUser}/editTask/${this.props.task.id}?_method=put`}
              method="POST"
            >
              <div class="form-group col-md-6">
                <label>Task ID</label>
                <input
                  type="text"
                  name="task_id"
                  readOnly
                  value={this.props.task.id}
                  class="form-control"
                />
              </div>

              <div class="form-group col-md-6">
                <label>Task Name</label>
                <textarea
                  required
                  name="taskname"
                  value={this.props.task.name}
                  class="form-control"
                />
              </div>

              <div class="form-group col-md-6">
                <label>Date Due</label>
                <input
                  required
                  type="datetime-local"
                  name="dueDate"
                  class="form-control"
                />
              </div>

              <div class="form-group col-md-6">
                <label>Project </label>
                <br></br>
                <select name="project">{list}</select>
              </div>

              <div class="mx-3">
                <button type="submit" class="btn btn-success">
                  Edit Task
                </button>
              </div>
            </form>

            <br></br>

            <div class="mx-3">
              <form
                action={`/user/${this.props.currentUser}/deleteTask/${this.props.task.id}?_method=delete`}
                method="POST"
              >
                <button type="submit" class="btn btn-danger">
                  Delete Task
                </button>
              </form>
            </div>
          </Layout>
        </body>
      </html>
    );
  }
}

module.exports = EditTask;
