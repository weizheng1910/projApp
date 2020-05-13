var React = require("react");
var Layout = require("./layout.jsx");
var moment = require("moment");

class Project extends React.Component {
  render() {
    var allBoards = this.props.allBoards;
    var currentUserId = this.props.currentUserId;
    var username = this.props.currentUserName;
    var allRequests = this.props.allRequests;
    var dateNow = new Date();
    var boardsWithTasksPresent = this.props.allTasksOwnedByUserSplittedByBoard.filter((eachBoard) => eachBoard.length > 0);

    var list = boardsWithTasksPresent.map(function (eachBoard, index) {
      
      let boardId = eachBoard[0].board_id;
      let currentBoard = allBoards.filter((bd) => bd.id == boardId)[0];
      let userIdOfBoardOwner = currentBoard.user_id;

      let DomOfTasksInEachBoard = eachBoard.map((currentTaskOfEachBoard) => {
        let taskIdOfCurrentTask = currentTaskOfEachBoard.task_id;
        let allRequestsOfCurrentTask = allRequests.filter((request) => taskIdOfCurrentTask == request.task_id);
        let namesOfRequestees = allRequestsOfCurrentTask.map((request) => request.name);
        let arrayOfRequestsCompletionStatus = allRequestsOfCurrentTask.map((request) => request.doneyet);
        let arrayOfRequestsWithRequesteeAndCompletionStatus = allRequestsOfCurrentTask.map(function (request) {
          return {
            name: request.name,
            doneyet: request.doneyet,
          };
        });

        let requestsNotCompleted = arrayOfRequestsWithRequesteeAndCompletionStatus.filter((request) => request.doneyet == "No");


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

        let stringOfRequesteesWhoHaveNotCompleteTask = (requestsNotCompleted) => {
          let string = "";

          if (requestsNotCompleted.length == 1) {
            string += requestsNotCompleted[0].name;
          } else {
            for (let i = 0; i < requestsNotCompleted.length; i++) {
              if (i == requestsNotCompleted.length - 1) {
                string += "and " + requestsNotCompleted[i].name;
              } else {
                string += requestsNotCompleted[i].name + ", ";
              }
            }
          }
          return string
        }

        let returnTaskStatus = () => {
          if(stringOfRequesteesNames(namesOfRequestees) === ""){
            return <p class="font-weight-bold text-warning">UNTAGGED</p>
          } else  if (arrayOfRequestsCompletionStatus.includes("No") == false) {
            return <p class="font-weight-bold text-success">COMPLETED</p>
          } else if (moment(currentTaskOfEachBoard.duedate).toDate() < dateNow) {
            return <p class="font-weight-bold text-danger">OVERDUE</p>
          } else {
            return <p class="font-weight-bold text-secondary">ONGOING</p>
          }
        }

        return (
          <div class="m-3 d-flex justify-content-between">
              <div class="w-75">
                {currentTaskOfEachBoard.taskname}
                <br></br>
                <small>Created on: {currentTaskOfEachBoard.createdat} </small>
                <br></br>
                <small>Unassigned </small>
                <br></br>

                <small>Due by: {currentTaskOfEachBoard.duedate}</small>
            </div>

              <div>
                {returnTaskStatus()}
                <div>
                  <form
                    action={`/user/${currentTaskOfEachBoard.ownerid}/editTask/${currentTaskOfEachBoard.task_id}`}
                    method="GET"
                  >
                    <button
                      id={currentTaskOfEachBoard.task_id}
                      type="submit"
                      className="btn btn-outline-primary"
                    >
                      Edit Task
                    </button>
                  </form>
                </div>
              </div>
            </div>
        )
      })
      

      return (
        <div class="card m-3" style={{ width: 40 + "rem" }}>
          <div class="card-header">
            <div class="d-flex justify-content-between">
              <div class="text-secondary font-weight-bold">
                {currentBoard.name}
              </div>
            </div>
            <br></br>
            <small>{currentBoard.description}</small>
          </div>

          <div class="card-body">
            {DomOfTasksInEachBoard}
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
              <h3>Welcome, {username}</h3>
              <h4>These are the tasks you have assigned others to do</h4>
            </div>

            <div class="d-flex justify-content-around flex-wrap">{list}</div>
          </Layout>
        </body>
      </html>
    );
  }
}

module.exports = Project;
