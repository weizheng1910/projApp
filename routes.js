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

  app.get('/editTask/:id', pokemonControllerCallbacks.editTask)

  app.put('/editTask/:id', pokemonControllerCallbacks.submitEditTask)
};
