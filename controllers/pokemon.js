
var moment = require('moment');
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
    let userid = request.params.userid
    let taskid = request.params.taskid
    const callback = (err,result) => {
        const data = {
          owner: userid,
          task: result[0],
          allBoards: result[1]
        }
        response.render('pokemon/editTask',data)
    }    
    db.pokemon.editTask(taskid,callback)
  }

  let submitEditTask = (request,response) => {

    let userid = request.params.userid
    let taskid = request.params.taskid

    //task_id
    //taskname
    //dueDate
    //project

    request.body.dueDate = moment(request.body.dueDate).format('LLL')
    const callback = (err,result) => {
        response.redirect(`/user/${userid}/task/${taskid}/editRequest`)
    }   
    db.pokemon.submitEditTask(callback,request.body)
  }

  let createTask = (request,response) => {
    let userid = request.params.id 
    const callback = (err,result) => {
      const data = {
        task: result[0],
        allBoards: result[1],
        user: userid
      }
      response.render('pokemon/createTask',data)
    }
    db.pokemon.findLatestTask(callback)
  }

  let submitCreatedTask = (request,response) => {
    //Change date into proper format
    request.body.dueDate = moment(request.body.dueDate).format('LLL')
    console.log(request.body)
    const callback = (err,result) => {
    console.log("success at callback")
    const data = {
      taskid: result[0].id,
      userid: result[0].user_id
    }

    response.redirect(`/user/${data.userid}/task/${data.taskid}/setRequest`)

    }
    db.pokemon.submitCreatedTask(callback,request.body)
  }
  
  let setRequest = (request,response) => {
    //Though not needed, use this to verify 
    let userid = request.params.userid

    let taskid = request.params.taskid 
    const callback = (err,result) => {
      const data = {
        taskowner: userid,
        taskid: taskid,
        users: result
      }
      response.render('pokemon/addRequest',data)
    }
    db.pokemon.selectAllUsers(callback)
  }

  let submitRequest = (request,response) => {
    let userid = request.params.userid;

    const callback = (err,result) => {
     response.redirect(`/user/${userid}/given`)
    }

    db.pokemon.submitRequest(callback,request.body)
  }

  let displayEditRequest = (request,response) => {

    let userid = request.params.userid
    let taskid = request.params.taskid

    const callback = (err,result) => {
      const data = {
        userid: userid,
        taskid: taskid,
        users: result[0],
        requests: result.slice(1)
      }
      response.render('pokemon/editRequest',data)
    } 

    db.pokemon.displayEditRequest(callback,taskid)
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
    submitEditTask: submitEditTask,
    createTask: createTask,
    submitCreatedTask: submitCreatedTask,
    setRequest: setRequest,
    submitRequest: submitRequest,
    displayEditRequest: displayEditRequest
  };


} // End module export