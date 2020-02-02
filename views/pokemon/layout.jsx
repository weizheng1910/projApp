var React = require("react");



class Layout extends React.Component {
  render() {
    
    
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
              <nav class="navbar text-white" style={{backgroundColor:'#3b5998'}}>
                <a class="navbar-brand mx-1 px-1 font-weight-bold">ProjApp</a>
                <div class="d-flex justify-content-end text-white">
                
                  <form class="form-inline">
                    <a class="nav-link mx-1 px-1 text-white" href={`/user/${this.props.userid}/projectOverview`}>Overview</a>
                  </form>

                  <form class="form-inline">
                    <a class="nav-link mx-1 px-1 text-white" href={`/user/${this.props.userid}/createProject`}>Create Project</a>
                  </form>

                  <form class="form-inline">
                    <a class="nav-link mx-1 px-1 text-white" href={`/user/${this.props.userid}/createTask`}>Create Task</a>
                  </form>

                  <form class="form-inline">
                    <a class="nav-link mx-1 px-1 text-white" href={`/user/${this.props.userid}/given`}>Tasks Given</a>
                  </form>

                  <form class="form-inline">
                    <a class="nav-link mx-1 px-1 text-white" href={`/user/${this.props.userid}/received`}>Tasks Received</a>
                  </form>

                </div>
              </nav>          
          <br></br>
          <br></br>

          {this.props.children}
          <footer class="page-footer blue pt-4">
            <div class="footer-copyright text-center py-3">© 2020 weizheng. All rights reserved.</div>
          </footer>
        </body>
      </html>
    );
  }
}

module.exports = Layout;
/*style={{background-color: rgb(33,39,123)}}*/