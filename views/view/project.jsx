var React = require("react");
var Layout = require("./layout.jsx");
var moment = require("moment");
var TaskComponent = require("./projectComponents/TaskComponent.jsx")
var ProjButtonForTaskOwner = require("./projectComponents/ProjButtonForTaskOwner.jsx")
var ProjButtonForNonTaskOwner = require("./projectComponents/ProjButtonForNonTaskOwner.jsx")

class Project extends React.Component {
  render() {
    var boards = this.props.allBoards;
    var currentUserId = this.props.currentUserId;
    var allRequests = this.props.allRequests;
    var dateNow = new Date();
    var editAndDeleteProjButton;
    
    var list = this.props.result.map(function (tasks, index) {
      if (boards[index].user_id == currentUserId) {
        editAndDeleteProjButton = (<ProjButtonForTaskOwner index={index} currentUserId={currentUserId} boards={boards} />);
      } else {
        editAndDeleteProjButton = (<ProjButtonForNonTaskOwner index={index} boards={boards} />);
      }

      return (
        <div class="card m-3" style={{ width: 35 + "rem" }}>
          <div class="card-header">
            <div class="d-flex justify-content-between">
              <div class="text-secondary font-weight-bold">
                {boards[index].name}
              </div>

              {editAndDeleteProjButton}
            </div>
            <br></br>
            <small>{boards[index].description}</small>
          </div>

          <div class="card-body">
            {tasks.map((task) => {
              let idOfCurrentTask = task.task_id;

              let allRequestsWithCurrentTaskId = allRequests.filter((request) => idOfCurrentTask == request.task_id);
              let nameOfRequestees = allRequestsWithCurrentTaskId.map((request) => request.name);
              let arrayOfRequestsCompletionStatus = allRequestsWithCurrentTaskId.map((request) => request.doneyet);

              let stringOfRequesteesNames = (namesOfRequestees) => {
                let string = "";
                if (namesOfRequestees.length == 1) {
                  string += namesOfRequestees[0];
                } else {
                  for (let i = 0; i < namesOfRequestees.length; i++) {
                    if (i == namesOfRequestees.length - 1) {
                      string += "and " + namesOfRequestees[i];
                    } else {
                      string += namesOfRequestees[i] + ", ";
                    }
                  }
                }
                return string
              }

              return <TaskComponent 
                requesteeNames={stringOfRequesteesNames(nameOfRequestees)} 
                task={task} 
                arrayOfRequestsCompletionStatus={arrayOfRequestsCompletionStatus}
                dateNow={dateNow}
              />
              

            })}
          </div>
        </div>
      );
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
          <Layout userid={this.props.currentUserId}>
            <div class="mx-4">
              <h3>Welcome, {this.props.currentUserName}</h3>
              <h3>Project Overview</h3>
            </div>

            <div class="d-flex justify-content-around flex-wrap">{list}</div>
          </Layout>
        </body>
      </html>
    );
  }
}

module.exports = Project;
