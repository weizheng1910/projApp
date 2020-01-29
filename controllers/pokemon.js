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
      const data = {
        result: result
      }
        response.render('pokemon/received',data)
      }
    db.pokemon.tasksReceived(callback,id)
  }

  let test = (request,response) => {
    let requestid = request.params.id

    const callback = (err,result) => {
      
        response.send(result[0].doneyet)
      }

    db.pokemon.toggleDone(requestid,callback)

    
  }


  


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index: indexControllerCallback,
    received: received,
    test: test
  };


} // End module export