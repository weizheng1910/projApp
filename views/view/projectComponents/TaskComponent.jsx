var React = require("react");
var moment = require("moment");

class TaskComponent extends React.Component {
  render(){

    let requesteeNames = this.props.requesteeNames;
    let currentTask = this.props.task;
    let arrayOfRequestsCompletionStatus = this.props.arrayOfRequestsCompletionStatus;
    let dateNow = this.props.dateNow;

    let returnTaskStatus = () => {
      if (requesteeNames === "") {
        return <p class="font-weight-bold text-warning">UNASSIGNED</p>

      } else if (arrayOfRequestsCompletionStatus.includes("No") == false){
        return <p class="font-weight-bold text-success">COMPLETED</p>

      } else if (moment(currentTask.duedate).toDate() < dateNow) {
        return <p class="font-weight-bold text-danger">OVERDUE</p>

      } else {
        return <p></p>
      }
    }

    return(<div class="m-3 d-flex justify-content-between">
      <div>
        {currentTask.taskname}
        <br></br>
        <small>
          Assigned by {currentTask.username} on {currentTask.createdat}{" "}
        </small>
        <br></br>
        <small>Unassigned </small>
        <br></br>
        <small>Due by: {currentTask.duedate}</small>
      </div>

      <div>
        {returnTaskStatus()}
      </div>
    </div>)
  }
}

module.exports = TaskComponent