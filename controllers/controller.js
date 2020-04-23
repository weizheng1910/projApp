var sha256 = require("js-sha256");
var moment = require("moment");

module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const SALT = "strawberries are blue";

  let homeFunction = (request, response) => {
    if (request.params) {
    }

    response.render("view/home");
  };

  let logoutFunction = (request, response) => {
    // Clear cookies and redirect back to homepage
    response.clearCookie("loggedin");
    response.redirect("/");
  };

  let submitLoginFunction = (request, response) => {
    let username = request.body.username;
    let password = request.body.password;

    const callback = (err, result) => {
      if (result == "No results found") {
        // If no username found, re-render homepage
        console.log("No username found");
        response.redirect("/");
      } else if (result == "Query error") {
        // If password not found, re-render homepage
        console.log("query error");
        response.redirect("/");
      } else {
        // If username and password is present, verify password
        // Login if password matches, if not redirect to homepage
        if (result[0].password == sha256(password)) {
          let id = result[0].id;
          //Once registered, set cookies.
          response.cookie("loggedin", sha256(id + SALT));
          // And redirect to projectOverview page.
          response.redirect("/user/" + id + "/projectOverview/");
        } else {
          console.log("password mismatch");
          response.redirect("/");
        }
      }
    };
    db.moduleObjectOfAllModels.submitLogin(callback, username, password);
  };

  // Registering a new user.
  let submitNewUserFunction = (request, response) => {
    let username = request.body.username;
    let password = sha256(request.body.password);

    const callback = (err, result) => {
      let id = result[0].id;
      //Once registered, set cookies.
      response.cookie("loggedin", sha256(id + SALT));
      response.redirect("/user/" + id + "/projectOverview/");
    };
    db.moduleObjectOfAllModels.submitNewUser(callback, username, password);
  };

  let receivedFunction = (request, response) => {
    // Authenticate user
    let id = request.params.id;
    let currentSessionCookie = request.cookies["loggedin"];

    if (sha256(id + SALT) == currentSessionCookie) {
      const callback = (err, result) => {
        // This username is to display the name of the current user.
        let username = result.currentUser[0].name;
        let boards = result.allBoards;
        let allTasks = result.allTasks;

        let boardArray = boards.map((board) => {
          return board.id;
        });
        // The below algorithm will arrange tasks according to its board_id
        // The results will be in resultArray which is an array of arrays.
        // Each element of the master array will be an array of tasks with the same id.
        let resultArray = [];
        for (let i = 0; i < boardArray.length; i++) {
          let subArray = allTasks.filter((el) => el.board_id == boardArray[i]);
          resultArray.push(subArray);
        }
        const data = {
          boards: boards,
          resultArray: resultArray,
          userid: id,
          username: username,
        };
        response.render("view/received", data);
      };
      db.moduleObjectOfAllModels.tasksReceived(callback, id);
    } else {
      response.redirect("/");
    }
  };

  let givenFunction = (request, response) => {
    // Authenticate user
    let currentUserId = request.params.id;
    let currentSessionCookie = request.cookies["loggedin"];

    if (sha256(request.params.id + SALT) == currentSessionCookie) {
      const callback = (err, result) => {
        let currentUserObject = result.allUsers.filter(
          (user) => user.id == currentUserId
        );
        let currentUserName = currentUserObject[0].name;

        let requestsWithAssigneeName = result.allRequests;

        // Using board array, transform it into board which exists.
        let boards = result.allBoards;
        let boardArray = boards.map((board) => {
          return board.id;
        });

        let allTasks = result.allTasks;

        // resultArray contains the tasks owned by the current user,
        // grouped according to their board id in an array of arrays
        let tasksOwnedByThisUser = allTasks.filter(
          (task) => task.ownerid == currentUserId
        );
        let resultArray = [];
        for (let i = 0; i < boardArray.length; i++) {
          let subArray = tasksOwnedByThisUser.filter(
            (eachBoard) => eachBoard.board_id == boardArray[i]
          );
          resultArray.push(subArray);
        }

        // Push the data we want into the views file.
        const data = {
          result: resultArray,
          boards: boards,
          userid: currentUserId,
          requestsWithAssigneeName: requestsWithAssigneeName,
          currentUserName: currentUserName,
        };
        response.render("view/given2", data);
      };

      db.moduleObjectOfAllModels.seeAllTasksFromProject(callback);
    } else {
      console.log("You are not allowed.");
      response.redirect("/");
    }
  };

  let toggleDoneFunction = (request, response) => {
    let requestid = request.params.id;
    const callback = (err, result) => {
      response.redirect("/user/" + result[0].user_id + "/received");
    };
    db.moduleObjectOfAllModels.toggleDone(requestid, callback);
  };

  let editTaskFunction = (request, response) => {
    let userid = request.params.userid;
    let taskid = request.params.taskid;
    const callback = (err, result) => {
      const data = {
        currentUser: userid,
        task: result.currentTask[0],
        allBoards: result.allBoards,
      };
      response.render("view/editTask", data);
    };
    db.moduleObjectOfAllModels.editTask(taskid, callback);
  };

  let submitEditTaskFunction = (request, response) => {
    let userid = request.params.userid;
    let taskid = request.params.taskid;

    // request.body comes from the form
    // It has the following fields:
    //  task_id
    //  taskname
    //  dueDate
    //  project

    // Converting dueDate into a readable format
    request.body.dueDate = moment(request.body.dueDate).format("LLL");
    const callback = (err, result) => {
      response.redirect(`/user/${userid}/task/${taskid}/editRequest`);
    };
    db.moduleObjectOfAllModels.submitEditTask(callback, request.body);
  };

  let createTaskFunction = (request, response) => {
    // Verify authentication
    let userid = request.params.id;
    let currentSessionCookie = request.cookies["loggedin"];
    if (sha256(userid + SALT) == currentSessionCookie) {
      const callback = (err, result) => {
        // task is the latest task to get the id of the new task by adding 1
        // allBoards is to display the dropdown.
        const data = {
          task: result.latestTask,
          allBoards: result.allBoards,
          userid: userid,
        };
        response.render("view/createTask", data);
      };
      db.moduleObjectOfAllModels.findLatestTask(callback);
    } else {
      response.redirect("/");
    }
  };

  let submitCreatedTaskFunction = (request, response) => {
    // request.body contains:
    // taskname
    // createdAt
    // dueDate
    // user_id
    // project

    //Change date into proper format
    request.body.dueDate = moment(request.body.dueDate).format("LLL");
    const callback = (err, result) => {
      // Upon successful insertion of the task,
      // Redirect to the page where the task owner can assign the task to others.

      const data = {
        taskid: result[0].id,
        userid: result[0].user_id,
      };

      response.redirect(`/user/${data.userid}/task/${data.taskid}/setRequest`);
    };
    db.moduleObjectOfAllModels.submitCreatedTask(callback, request.body);
  };

  let setRequestFunction = (request, response) => {
    // Displays the form which allow task owner to choose its assignees
    let userid = request.params.userid;
    let taskid = request.params.taskid;

    const callback = (err, result) => {
      const data = {
        taskowner: userid,
        taskid: taskid,
        users: result,
      };
      response.render("view/addRequest", data);
    };
    db.moduleObjectOfAllModels.selectAllUsers(callback);
  };

  let submitRequestFunction = (request, response) => {
    let userid = request.params.userid;

    const callback = (err, result) => {
      //After assignees are selected, redirect it to the the 'given' page
      response.redirect("/user/" + userid + "/given");
    };
    db.moduleObjectOfAllModels.submitRequest(callback, request.body);
  };

  let displayEditRequestFunction = (request, response) => {
    // This controller is for displaying the edit page
    // for the task owner to edit assignees

    // requests is an array of requests of a specific task.
    let userid = request.params.userid;
    let taskid = request.params.taskid;

    const callback = (err, result) => {
      const data = {
        userid: userid,
        taskid: taskid,
        users: result.allUsers,
        requests: result.requestsOfCurrentTask,
      };
      response.render("view/editRequest", data);
    };
    db.moduleObjectOfAllModels.displayEditRequest(callback, taskid);
  };

  let submitEditRequestFunction = (request, response) => {
    let userid = request.params.userid;
    let taskid = request.params.taskid;

    const callback = (err, result) => {
      response.redirect("/user/" + userid + "/given");
    };
    db.moduleObjectOfAllModels.submitEditRequest(callback, request.body);
  };

  let displayProjectFormFunction = (request, response) => {
    let userid = request.params.userid;
    let currentSessionCookie = request.cookies["loggedin"];

    if (sha256(userid + SALT) == currentSessionCookie) {
      const data = {
        userid: userid,
      };
      response.render("view/createProj", data);
    } else {
      response.render("/");
    }
  };

  let submitNewProjectFunction = (request, response) => {
    let userid = request.params.userid;
    const callback = (err, result) => {
      response.redirect("/user/" + userid + "/projectOverview");
    };
    db.moduleObjectOfAllModels.createNewProject(callback, request.body, userid);
  };

  let projOverviewFunction = (request, response) => {
    let currentUserId = request.params.userid;

    // Authentication of user
    let currentSessionCookie = request.cookies["loggedin"];
    if (sha256(currentUserId + SALT) == currentSessionCookie) {
      const callback = (err, result) => {
        console.log(result);
        let names = result.allUsers;
        let requestsWithAssigneeName = result.allRequests;
        let boards = result.allBoards;
        let boardArray = boards.map((board) => {
          return board.id;
        });
        let tasks = result.allTasks;

        let currentUserNameObject = names.filter(
          (user) => user.id == currentUserId
        );
        let currentUserName = currentUserNameObject[0].name;

        // The below code separates the tasks into an array of arrays
        // Each array containing an array of tasks with the same board id.
        let resultArray = [];
        for (let i = 0; i < boardArray.length; i++) {
          let subArray = tasks.filter((el) => el.board_id == boardArray[i]);
          resultArray.push(subArray);
        }

        const data = {
          result: resultArray,
          boards: boards,
          userid: currentUserId,
          requestsWithAssigneeName: requestsWithAssigneeName,
          currentUserName: currentUserName,
        };
        response.render("view/project", data);
      };

      db.moduleObjectOfAllModels.seeAllTasksFromProject(callback);
    } else {
      response.redirect("/");
    }
  };

  let deleteTaskFunction = (request, response) => {
    let userid = request.params.userid;
    let taskid = request.params.taskid;

    const callback = (err, result) => {
      response.redirect("/user/" + userid + "/given");
    };
    db.moduleObjectOfAllModels.deleteTask(callback, taskid);
  };

  let deleteProjFunction = (request, response) => {
    let userid = request.params.userid;
    let boardid = request.params.boardid;

    const callback = (err, result) => {
      response.redirect(`/user/${userid}/projectOverview/`);
    };

    // When a project is deleted, all the tasks and requests associated with it has to be deleted as well.
    db.moduleObjectOfAllModels.cascadingDelete(callback, boardid);
  };

  let displayEditProjFunction = (request, response) => {
    let boardid = request.params.boardid;
    let userid = request.params.userid;

    const callback = (err, result) => {
      const data = {
        project: result,
        userid: userid,
        boardid: boardid,
      };
      console.log(data.project);
      response.render("view/editProject", data);
    };
    db.moduleObjectOfAllModels.retrieveProjectData(callback, boardid);
  };

  let submitEditProjFunction = (request, response) => {
    let userid = request.params.userid;
    let projId = request.params.boardid;
    let projObj = request.body;

    const callback = (error, result) => {
      response.redirect("/user/" + userid + "/projectOverview");
    };

    db.moduleObjectOfAllModels.submitEditProj(callback, projObj, projId);
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    home: homeFunction,
    logout: logoutFunction,
    received: receivedFunction,
    submitNewUser: submitNewUserFunction,
    submitLogin: submitLoginFunction,
    given: givenFunction,
    toggleDone: toggleDoneFunction,
    editTask: editTaskFunction,
    submitEditTask: submitEditTaskFunction,
    createTask: createTaskFunction,
    submitCreatedTask: submitCreatedTaskFunction,
    setRequest: setRequestFunction,
    submitRequest: submitRequestFunction,
    displayEditRequest: displayEditRequestFunction,
    submitEditRequest: submitEditRequestFunction,
    displayProjectForm: displayProjectFormFunction,
    submitNewProject: submitNewProjectFunction,
    projOverview: projOverviewFunction,
    deleteTask: deleteTaskFunction,
    deleteProj: deleteProjFunction,
    displayEditProj: displayEditProjFunction,
    submitEditProj: submitEditProjFunction,
  };
}; // End module export
