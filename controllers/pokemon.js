module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let indexControllerCallback = (request, response) => {
      db.pokemon.getAll((error, allPokemon) => {
        response.render('pokemon/index', { allPokemon });
      });
  };

  let received = (request, response) => {
    let id = request.params.id
    
    const callback = (err,result) => {
        response.send(result)
    }
    db.pokemon.tasksReceived(callback,id)
  }


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index: indexControllerCallback,
    received: received
  };

}
