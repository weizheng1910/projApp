var React = require("react");

class Home extends React.Component {
  render() {

    
    
    
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
        <nav class="navbar navbar-expand-lg navbar-light text-white" style={{backgroundColor:'#3b5998'}}>
          <div class="d-flex justify-content-between w-100">
            <div class="m-3">
              <h3>ProjApp</h3>
            </div>

            <div>
              <form class="form-inline" action={`/login`} method="POST">
                
                <div class="row">

                  <div class="col">
                    <div class="form-group col-md-6">
                      <label>User Name</label>
                      <input type="text" name="username" class="form-control"/>
                    </div>
                  </div>

                  <div class = "col">
                    <div class="form-group col-md-6">
                      <label>Password</label>
                      <input type="password" class="form-control"/>
                    </div>
                  </div>

                  <div class="col d-flex align-items-end p-0 m-0">
                    <button type="submit" class="btn btn-primary">Login</button>                  
                  </div>

                </div>

              </form>
            </div>
          </div>
          
          </nav>

          <div id="main-container" class="w-100 h-50 bg-light clearfix">
            <div class="float-right w-50">
              <div class="m-3">
                <h3>Create a new account</h3>
                <h4>It's quick and easy</h4>
              </div>
                <form action = {`/createNewUser`} method="POST">

                  <div class="form-group col-md-6">
                    <label>User Name</label>
                    <input type="text" name="username" class="form-control"/>
                  </div>

                  <div class="form-group col-md-6">
                    <label>Password</label>
                    <input type="password" class="form-control"/>
                  </div>

                  <div class="m-3">
                  <button type="submit" class="btn btn-success">Register</button>
                  </div>
                </form>
              </div>
            </div>
          

          <footer class="page-footer blue pt-4">
            <div class="footer-copyright text-center py-3">© 2020 weizheng. All rights reserved.</div>
          </footer>
          
          
        </body>
      </html>
    );
  }
}


module.exports = Home;
