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

  let given = (request, response) => {
    let id = request.params.id
    const callback = (err,result) => {
      const data = {
        result: result
      }
        response.render('pokemon/given',data)
      }
    db.pokemon.tasksGiven(callback,id)
  }



  let toggleDone = (request,response) => {
    let requestid = request.params.id
    const callback = (err,result) => {
        response.redirect('/user/'+result[0].user_id+'/received')
      }
    db.pokemon.toggleDone(requestid,callback)
  }

  let editTask = (request,response) => {
    let taskid = request.params.id
    const callback = (err,result) => {
        const data = {
          task: result[0],
          allBoards: result[1]
        }
        response.render('pokemon/editTask',data)
    }    
    db.pokemon.editTask(taskid,callback)
  }

  let submitEditTask = (request,response) => {
    //task_id
    //taskname
    //dueDate
    //project
    const callback = (err,result) => {
      
        response.send(result)
    }   
    db.pokemon.submitEditTask(callback,request.body)
  }

  


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index: indexControllerCallback,
    received: received,
    given: given,
    toggleDone: toggleDone,
    editTask: editTask,
    submitEditTask: submitEditTask
  };


} // End module export