
var moment = require('moment');
module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

   let home = (request,response) => {
    response.render('pokemon/home')
   }

  let received = (request, response) => {
    let id = request.params.id
    const callback = (err,result) => {

      let username = result[0][0].name
      let boards = result[1]
      let results = result.slice(2)


      let boardArray = boards.map(board => {return board.id})

      let resultArray = []

      for(let i = 0; i < boardArray.length; i++){
        let subArray = results.filter(el => el.board_id == boardArray[i])
        resultArray.push(subArray)
      }

      



      const data = {
        boards: boards,
        resultArray: resultArray,
        userid: id,
        username: username
      }
        
        response.render('pokemon/received',data)
      }
    db.pokemon.tasksReceived(callback,id)
  }

  let given = (request, response) => {
    let id = request.params.id
    const callback = (err,result) => {

        let requestsWithAssigneeName = result[0]
        let boards = result[1]
        let boardArray = boards.map(board => {return board.id})
        let tasks = result.slice(2)

        let tasksOfThisUserId = tasks.filter(tk => tk.ownerid == id) 
        let tasksUserName = tasksOfThisUserId[0].username
        
        let resultArray = []

        for(let i = 0; i < boardArray.length; i++){
          let subArray = tasksOfThisUserId.filter(el => el.board_id == boardArray[i])
          resultArray.push(subArray)
        }



        const data = {
          result: resultArray,
          boards: boards,
          userid: id,
          requestsWithAssigneeName: requestsWithAssigneeName,
          username: tasksUserName
        }
     response.render('pokemon/given2',data)
          
    }

    db.pokemon.seeAllTasksFromProject(callback)
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
        userid: userid
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
     response.redirect('/user/'+userid+'/given')
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

  let submitEditRequest = (request,response) => {
    let userid = request.params.userid;
    let taskid = request.params.taskid;

    const callback = (err,result) => {
      response.redirect('/user/'+userid+'/given')
    }
    db.pokemon.submitEditRequest(callback,request.body)
  }

  let displayProjectForm = (request,response) => {
    let userid = request.params.userid

    const data = {
      userid:userid
    }
    response.render('pokemon/createProj',data)
  }

  let submitNewProject = (request,response) => {
    let userid = request.params.userid

    const callback = (err,result) => {
      response.redirect('/user/'+userid+'/projectOverview')
    }

    db.pokemon.createNewProject(callback,request.body)
  }

  let projOverview = (request,response) => {
    let userid = request.params.userid
    
    const callback = (err,result) => {

        let requestsWithAssigneeName = result[0]
        let boards = result[1]
        let boardArray = boards.map(board => {return board.id})
        let tasks = result.slice(2)
        
        let resultArray = []

        for(let i = 0; i < boardArray.length; i++){
          let subArray = tasks.filter(el => el.board_id == boardArray[i])
          resultArray.push(subArray)
        }



        const data = {
          result: resultArray,
          boards: boards,
          userid: userid,
          requestsWithAssigneeName: requestsWithAssigneeName
        }

        response.render('pokemon/project',data)
          
    }

    db.pokemon.seeAllTasksFromProject(callback)
  }

  let deleteTask = (request,response) => {
    let userid = request.params.userid
    let taskid = request.params.taskid

    const callback = (err,result) => {
      response.redirect('/user/'+userid+'/given')
    }

    db.pokemon.deleteTask(callback,taskid)
  }

  let deleteProj = (request,response) => {
    let userid = request.params.userid
    let boardid = request.params.boardid

    const callback = (err,result) => {

      response.redirect(`/user/${userid}/projectOverview/`)
    }

    db.pokemon.cascadingDelete(callback,boardid)
  }

  let displayEditProj = (request,response) => {

    let boardid = request.params.boardid
    let userid = request.params.userid

    const callback = (err,result) => {
      const data = {
        project: result[0],
        userid: userid,
        boardid: boardid
      }

      console.log(data.project)

      response.render('pokemon/editProject',data)
    }

    db.pokemon.retrieveProjectData(callback,boardid)
  }

  let submitEditProj = (request,response) => {

    let userid = request.params.userid
    let projId = request.params.boardid
    let projObj = request.body

    const callback = (error,result) => {
      response.redirect('/user/'+userid+'/projectOverview')
    }

    db.pokemon.submitEditProj(callback,projObj,projId)
  }

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    home:home,
    received: received,
    given: given,
    toggleDone: toggleDone,
    editTask: editTask,
    submitEditTask: submitEditTask,
    createTask: createTask,
    submitCreatedTask: submitCreatedTask,
    setRequest: setRequest,
    submitRequest: submitRequest,
    displayEditRequest: displayEditRequest,
    submitEditRequest: submitEditRequest,
    displayProjectForm: displayProjectForm,
    submitNewProject: submitNewProject,
    projOverview: projOverview,
    deleteTask: deleteTask,
    deleteProj: deleteProj,
    displayEditProj: displayEditProj,
    submitEditProj: submitEditProj
  };


} // End module export