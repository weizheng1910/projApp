class ProjButtonForNonTaskOwner extends React.Component {
  render(){
    let index = this.props.index;
    let boards = this.props.boards
    return(
      <div class="w-25 m-0">
          <p align="right">Owned by {boards[index].projownername}</p>
      </div>
    )
  }
}

module.exports = ProjButtonForNonTaskOwner;