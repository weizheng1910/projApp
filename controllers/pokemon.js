var sha256 = require('js-sha256');
var moment = require('moment');

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
   const SALT = "strawberries are blue"

   let home = (request,response) => {
    response.render('pokemon/home')
   }

   let logout = (request,response) => {
    // Clear cookies and redirect back to homepage
    response.clearCookie('loggedin')
    response.redirect("/")
   }

  let submitLogin = (request,response) => {
    let username = request.body.username
    let password = request.body.password

    const callback = (err,result) => {
      if(result == "No results found"){
        // If no username found, re-render homepage
        console.log("No username found")
        response.redirect("/")
      } else if( result == "Query error") {
        // If password not found, re-render homepage
        console.log("query error")
        response.redirect("/")
      } else {
        // If username and password is present, verify password
        // Login if password matches, if not redirect to homepage
        if (result[0].password == sha256(password)){
          let id = result[0].id
          //Once registered, set cookies.
          response.cookie('loggedin',sha256(id + SALT))
          // And redirect to projectOverview page.
          response.redirect('/user/'+id+'/projectOverview/')
        } else {
          response.redirect("/")
        }
      }
    }
    db.pokemon.submitLogin(callback,username,password)
  }

  // Registering a new user.
  let submitNewUser = (request,response) => {
    let username = request.body.username
    let password = sha256(request.body.password)

    const callback = (err,result) => {
      let id = result[0].id
      //Once registered, set cookies.
      response.cookie('loggedin',sha256(id + SALT))
      response.redirect('/user/'+id+'/projectOverview/')
    }
    db.pokemon.submitNewUser(callback,username,password)
  }



  let received = (request, response) => {
    // Authenticate user
    let id = request.params.id
    let currentSessionCookie = request.cookies['loggedin']

    if(sha256(id + SALT) == currentSessionCookie){
    const callback = (err,result) => {
      // This username is to display the name of the current user.
      let username = result[0][0].name
      // boards is used to arrange tasks according to the board id it belongs to
      let boards = result[1]
      // results are the tasks assigned to this user, including information of the board, and information on the user which requested the task.
      let results = result.slice(2)

      // The below algorithm will arrange tasks according to its board_id
      // The results will be in resultArray which is an array of arrays.
      // Each element of the master array will be an array of tasks with the same id.
      let boardArray = boards.map(board => {return board.id})
      let filteredResults = results.filter(e => e.yourid == id)
      let resultArray = []
      for(let i = 0; i < boardArray.length; i++){
        let subArray = filteredResults.filter(el => el.board_id == boardArray[i])
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
  } else{
    response.redirect("/")
  }
}

  let given = (request, response) => {
    // Authenticate user
    let id = request.params.id
    let currentSessionCookie = request.cookies['loggedin']

    if(sha256(id + SALT) == currentSessionCookie){
      const callback = (err,result) => {
        // result[0] is the array of all users
        // result[1] is the array of all requests, with assignees name included
        // result[2] is the array of all returns all boards which exists.
        // result[3] is the array of all tasks, including the name of the task owner.

        // The below 2 lines gets the name of the current user logged in.
        let currentUserObject = result[0].filter( f => f.id == id)
        let theName = currentUserObject[0].name

        let requestsWithAssigneeName = result[1]

        // Using board array, transform it into board which exists.
        let boards = result[2]
        let boardArray = boards.map(board => {return board.id})
        let tasks = result.slice(3)

        // tasks is an array of all tasks
        // To get the tasks own by the current user, we filter the array by his user_id
        // Then we arrange it according to the board the tasks is in,
        // By making an array of array with a for-loop
        let tasksOfThisUserId = tasks.filter(tk => tk.ownerid == id) 
        let resultArray = []
        for(let i = 0; i < boardArray.length; i++){
          let subArray = tasksOfThisUserId.filter(el => el.board_id == boardArray[i])
          resultArray.push(subArray)
        }

        // Push the data we want into the views file.
        const data = {
          result: resultArray,
          boards: boards,
          userid: id,
          requestsWithAssigneeName: requestsWithAssigneeName,
          theName: theName
        }
        response.render('pokemon/given2',data)
      }

      db.pokemon.seeAllTasksFromProject(callback)
      } else {
        console.log("You are not allowed.")
        response.redirect('/')
      }

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

    // request.body comes from the form 
    // It has the following fields:
    //  task_id
    //  taskname
    //  dueDate
    //  project

    // Converting dueDate into a readable format
    request.body.dueDate = moment(request.body.dueDate).format('LLL')
    const callback = (err,result) => {
      response.redirect(`/user/${userid}/task/${taskid}/editRequest`)
    }   
    db.pokemon.submitEditTask(callback,request.body)
  }

  let createTask = (request,response) => {
    // Verify authentication
    let userid = request.params.id 
    let currentSessionCookie = request.cookies['loggedin']
    if(sha256(userid + SALT) == currentSessionCookie){ 
        const callback = (err,result) => {
          // task is the latest task to get the id of the new task by adding 1
          // allBoards is to display the dropdown.
          const data = {
            task: result[0],
            allBoards: result[1],
            userid: userid
          }
          response.render('pokemon/createTask',data)
        }
        db.pokemon.findLatestTask(callback)
      } else {
        response.redirect("/")
      }
  }

  let submitCreatedTask = (request,response) => {
    // request.body contains:
    // taskname
    // createdAt
    // dueDate
    // user_id
    // project

    //Change date into proper format
    request.body.dueDate = moment(request.body.dueDate).format('LLL')
    const callback = (err,result) => {
    // Upon successful insertion of the task, 
    // Redirect to the page where the task owner can assign the task to others.

    const data = {
      taskid: result[0].id,
      userid: result[0].user_id
    }

    response.redirect(`/user/${data.userid}/task/${data.taskid}/setRequest`)

    }
    db.pokemon.submitCreatedTask(callback,request.body)
  }
  
  let setRequest = (request,response) => {
    // Displays the form which allow task owner to choose its assignees 
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
    //After assignees are selected, redirect it to the the 'given' page
     response.redirect('/user/'+userid+'/given')
    }
    db.pokemon.submitRequest(callback,request.body)
  }

  let displayEditRequest = (request,response) => {
    // This controller is for displaying the edit page
    // for the task owner to edit assignees

    // requests is an array of requests of a specific task.
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
    let currentSessionCookie = request.cookies['loggedin']

    if(sha256(userid + SALT) == currentSessionCookie){ 
      const data = {
        userid:userid
      }
      response.render('pokemon/createProj',data)
    } else {
      response.render('/')
    }
  }

  let submitNewProject = (request,response) => {
    let userid = request.params.userid
    const callback = (err,result) => {
      response.redirect('/user/'+userid+'/projectOverview')
    }
    db.pokemon.createNewProject(callback,request.body,userid)
  }

  let projOverview = (request,response) => {
    let userid = request.params.userid
    
    // Authentication of user
    let currentSessionCookie = request.cookies['loggedin']
    if(sha256(userid + SALT) == currentSessionCookie){
      // The query result is an array of 4 elements.
      // result[0] is an array of User objects.
      // result[1] is an array of Request objects with the assignees's name.
      // result[2] is an array of Board objects with the board owner's name.
      // result[3] is an array of Task objects with the task owner's name
      const callback = (err,result) => {
        console.log(result)
        let names = result[0]
        let requestsWithAssigneeName = result[1]
        let boards = result[2]
        let boardArray = boards.map(board => {return board.id})
        let tasks = result.slice(3)

        // The below code returns the name of the current user logged in.
        let username = names.filter(n => n.id == userid)
        let theName = username[0].name

        // The below code separates the tasks into an array of arrays
        // Each array containing an array of tasks with the same board id.
        let resultArray = []
        for(let i = 0; i < boardArray.length; i++){
          let subArray = tasks.filter(el => el.board_id == boardArray[i])
          resultArray.push(subArray)
        }

        const data = {
          result: resultArray,
          boards: boards,
          userid: userid,
          requestsWithAssigneeName: requestsWithAssigneeName,
          theName: theName
        }
        response.render('pokemon/project',data)     
      }
      
      db.pokemon.seeAllTasksFromProject(callback)
    } else {
      response.redirect("/")
      }
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

    // When a project is deleted, all the tasks and requests associated with it has to be deleted as well.
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
    logout: logout,
    received: received,
    submitNewUser: submitNewUser,
    submitLogin: submitLogin,
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