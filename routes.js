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

  app.get('/pokemons', pokemonControllerCallbacks.index);
  //app.get('/pokemons/:id', pokemons.getPokemon);
  app.get('/user/:id/received', pokemonControllerCallbacks.received);
  app.get('/user/:id/given', pokemonControllerCallbacks.given);
  app.get('/toggleDone/:id', pokemonControllerCallbacks.toggleDone);

  app.get('/user/:userid/editTask/:taskid', pokemonControllerCallbacks.editTask)
  app.get('/user/:id/createTask', pokemonControllerCallbacks.createTask)
  app.get('/user/:userid/task/:taskid/setRequest', pokemonControllerCallbacks.setRequest)
  
  app.get('/user/:userid/task/:taskid/editRequest', pokemonControllerCallbacks.displayEditRequest)
  app.get()
  app.post('/user/:userid/task/:taskid/submitRequest', pokemonControllerCallbacks.submitRequest)

  app.put('/user/:userid/editTask/:taskid', pokemonControllerCallbacks.submitEditTask)
  app.put('/createTask', pokemonControllerCallbacks.submitCreatedTask)
};
