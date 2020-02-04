module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const pokemonControllerCallbacks = require('./controllers/pokemon')(allModels);

  app.get('/', pokemonControllerCallbacks.home)
  
  app.get('/user/:id/received', pokemonControllerCallbacks.received);
  app.get('/user/:id/given', pokemonControllerCallbacks.given);
  app.get('/toggleDone/:id', pokemonControllerCallbacks.toggleDone);

  app.get('/user/:userid/editTask/:taskid', pokemonControllerCallbacks.editTask)
  app.get('/user/:id/createTask', pokemonControllerCallbacks.createTask)
  app.get('/user/:userid/task/:taskid/setRequest', pokemonControllerCallbacks.setRequest)
  
  app.get('/user/:userid/task/:taskid/editRequest', pokemonControllerCallbacks.displayEditRequest)

  app.get('/user/:userid/projectOverview/', pokemonControllerCallbacks.projOverview)

  app.get('/user/:userid/createProject', pokemonControllerCallbacks.displayProjectForm)

  app.get('/logout', pokemonControllerCallbacks.logout)

  app.post('/login',pokemonControllerCallbacks.submitLogin)
  app.post('/createNewUser', pokemonControllerCallbacks.submitNewUser)


  app.post('/user/:userid/createProject', pokemonControllerCallbacks.submitNewProject)

  app.post('/user/:userid/task/:taskid/submitRequest', pokemonControllerCallbacks.submitRequest)

  app.post('/user/:userid/task/:taskid/submitEditRequest',pokemonControllerCallbacks.submitEditRequest)
  
  app.get('/user/:userid/editProj/:boardid',pokemonControllerCallbacks.displayEditProj)

  app.put('/user/:userid/editProject/:boardid',pokemonControllerCallbacks.submitEditProj)

  app.put('/user/:userid/editTask/:taskid', pokemonControllerCallbacks.submitEditTask)
  app.put('/createTask', pokemonControllerCallbacks.submitCreatedTask)

  app.delete('/user/:userid/deleteTask/:taskid', pokemonControllerCallbacks.deleteTask)
  app.delete('/user/:userid/deleteProj/:boardid', pokemonControllerCallbacks.deleteProj)


};
