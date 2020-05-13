var React = require("react");

class ProjButtonForTaskOwner extends React.Component {
  render(){
    let index = this.props.index;
    let boards = this.props.boards
    let currentUserId = this.props.currentUserId
    return (
      <div class="w-25 d-flex justify-content-between">
          <div class="mx-1">
            <form
              action={`/user/${currentUserId}/editProj/${boards[index].id}`}
              method="GET"
            >
              <button
                type="submit"
                className="btn text-white font-weight-bold"
                style={{ backgroundColor: "#3b5998" }}
              >
                Edit
              </button>
            </form>
          </div>

          <div class="mx-1">
            <form
              action={`/user/${currentUserId}/deleteProj/${boards[index].id}?_method=delete`}
              method="POST"
            >
              <button
                type="submit"
                className="btn btn-outline-secondary font-weight-bold"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
    )
  }
}

module.exports = ProjButtonForTaskOwner