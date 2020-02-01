var React = require("react");
var moment = require('moment');
var Layout = require('./layout.jsx')

class CreateProject extends React.Component {
  render() {
    
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
          <body>
        <Layout userid={this.props.userid}>
          
          <div class="mx-3">
            <h3>Create Project</h3>
          </div>

          <form action = {`/user/${this.props.userid}/createProject`} method="POST">

            <div className="form-group col-md-6 mx-1">
              <label>Project Name</label>
              <input type="text" name="projname"  className="form-control"/>
            </div>

            <div className="form-group col-md-6 mx-1">
              <label>Description</label>
              <textarea rows="10" name="description" className="form-control"/>
            </div>

            <div class="mx-3">
            <button type="submit" className="btn btn-success">Create Project</button>
            </div>

          </form>
          
          </Layout>

        </body>
      </html>
    );
  }
}

module.exports = CreateProject;
