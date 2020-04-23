/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope
  let submitNewUserFunction = async (callback, username, password) => {
    try {
      const values = [username, password];
      let query = "INSERT INTO users(name,password) VALUES($1,$2) RETURNING *";
      const result = await dbPoolInstance.query(query, values);
      callback(null, result.rows);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let submitLoginFunction = async (callback, username, password) => {
    try {
      const values = [username];
      let query = "SELECT * FROM users WHERE name=$1";
      const result = await dbPoolInstance.query(query, values);
      callback(null, result.rows);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let tasksReceivedFunction = async (callback, id) => {
    const values = [id];

    // This query returns the tasks assigned to this user, with mapping of the board details, and assignor's name.
    let query = `SELECT task_id, yourid, taskname, name AS reqbyusername, requestid, board_id, boardname, createdat, duedate, doneyet FROM users INNER JOIN (SELECT requestedbyuser, yourid, requestid, board_id, task_id, name AS boardname,taskname, createdat, duedate, doneyet FROM boards INNER JOIN
(SELECT user_id AS requestedbyuser, yourid, requestid, board_id, task_id, name AS taskname, createdat, duedate, doneyet FROM tasks INNER JOIN
(SELECT user_id AS yourid, id AS requestID, task_id, doneyet FROM requests WHERE user_id = $1) AS x ON x.task_id = tasks.id) AS y ON y.board_id = boards.id) AS z ON z.requestedbyuser =  users.id`;
    let query2 = "SELECT * FROM boards";
    let query3 = "SELECT name FROM users WHERE id=$1";

    try {
      const queryForAllTasksReceivedByUser = await dbPoolInstance.query(query, [
        id,
      ]);
      const queryForAllBoards = await dbPoolInstance.query(query2);
      const queryForCurrentUser = await dbPoolInstance.query(query3, [id]);

      const callbackObject = {
        allTasks: queryForAllTasksReceivedByUser.rows,
        allBoards: queryForAllBoards.rows,
        currentUser: queryForCurrentUser.rows,
      };

      callback(null, callbackObject);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let tasksGivenFunction = async (callback, id) => {
    const values = [id];
    // This query returns the tasks given by the user, including the names of the assignees, and the board name of the board.
    let query = `SELECT task_id, taskname, ownerid,tobedoneby, requestid, name AS boardname, createdat, duedate, doneyet FROM
boards 
INNER JOIN
(SELECT name AS taskname, task_id, createdat, duedate, user_id AS ownerid, board_id, tobedoneby, doneyet, requestid FROM tasks
INNER JOIN
(SELECT task_id, name AS tobedoneby, doneYet, requests.id AS requestID FROM requests
INNER JOIN users 
ON users.id = requests.user_id) AS x
ON tasks.id = x.task_id
WHERE user_id = $1) AS y
ON y.board_id = boards.id`;
    try {
      const result = dbPoolInstance.query(query, values);
      callback(null, result.rows);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let toggleDoneFunction = async (requestid, callback) => {
    try {
      const values = [requestid];
      let currentRequestQueryString = `SELECT * FROM requests WHERE id=$1`;
      let setToYesQueryString = `UPDATE requests SET doneyet='Yes' WHERE id=$1 RETURNING *`;
      let setToNoQueryString = `UPDATE requests SET doneyet='No' WHERE id=$1 RETURNING *`;

      const queryForCurrentRequest = await dbPoolInstance.query(
        currentRequestQueryString,
        values
      );
      const currentRequest = queryForCurrentRequest.rows[0];

      if (currentRequest.doneyet === "No") {
        const queryForSetToYes = await dbPoolInstance.query(
          setToYesQueryString,
          values
        );
        callback(null, queryForSetToYes.rows);
      }

      if (currentRequest.doneyet === "Yes") {
        const queryForSetToNo = await dbPoolInstance.query(
          setToNoQueryString,
          values
        );
        callback(null, queryForSetToNo.rows);
      }
    } catch (e) {
      console.log(e.stack);
    }
  };

  let editTaskFunction = async (taskid, callback) => {
    try {
      const values = [taskid];
      let currentTaskQueryString = `SELECT * FROM tasks WHERE id=$1`;
      let allBoardsQueryString = `SELECT * FROM boards`;
      const queryForCurrentTask = await dbPoolInstance.query(
        currentTaskQueryString,
        values
      );
      const queryForAllBoards = await dbPoolInstance.query(
        allBoardsQueryString
      );

      const callbackObject = {
        currentTask: queryForCurrentTask.rows,
        allBoards: queryForAllBoards.rows,
      };
      callback(null, callbackObject);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let submitEditTaskFunction = async (callback, formObject) => {
    try {
      const values = [
        formObject.task_id,
        formObject.taskname,
        formObject.dueDate,
        formObject.project,
      ];

      let taskUpdateQueryString = `UPDATE tasks 
      SET name =$2,
      dueDate =$3,
      board_id =$4
      WHERE id=$1 RETURNING *
      `;

      const queryForSubmitTask = await dbPoolInstance.query(
        taskUpdateQueryString,
        values
      );
      callback(null, queryForSubmitTask.rows);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let findLatestTaskFunction = async (callback) => {
    // Get the latest task, to display the id of the new task by adding 1.
    try {
      let latestTaskQueryString = `SELECT * FROM tasks ORDER BY id DESC LIMIT 1`;
      let allBoardsQueryString = `SELECT * FROM boards`;

      const queryForLatestTask = await dbPoolInstance.query(
        latestTaskQueryString
      );
      if (queryForLatestTask.rows.length == 0) {
        queryForLatestTask.rows = [[]];
      }

      const queryForAllBoards = await dbPoolInstance.query(
        allBoardsQueryString
      );

      const callbackObject = {
        latestTask: queryForLatestTask.rows[0],
        allBoards: queryForAllBoards.rows,
      };

      callback(null, callbackObject);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let submitCreatedTaskFunction = async (callback, taskObject) => {
    try {
      const values = [
        taskObject.taskname,
        taskObject.createdAt,
        taskObject.dueDate,
        taskObject.user_id,
        taskObject.project,
      ];

      let insertNewTaskQueryString =
        "INSERT INTO tasks(name,createdAt,dueDate,user_id,board_id) VALUES($1,$2,$3,$4,$5) RETURNING *";

      const queryForTaskSubmission = await dbPoolInstance.query(
        insertNewTaskQueryString,
        values
      );
      callback(null, queryForTaskSubmission.rows);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let selectAllUsersFunction = async (callback) => {
    try {
      let allUsersQueryString = "SELECT * FROM users";
      const queryForAllUsers = await dbPoolInstance.query(allUsersQueryString);
      callback(null, queryForAllUsers.rows);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let submitRequestFunction = async (callback, requestObj) => {
    try {
      const task_id = requestObj.task_id;
      let userchoices = requestObj.userchoices;
      if (!userchoices) {
        callback(null, []);
      }

      //Inserting multiple assignees using one query string.
      let insertionQueryString =
        "INSERT INTO requests(task_id,user_id,doneYet) VALUES ";

      for (let i = 0; i < userchoices.length; i++) {
        if (i == userchoices.length - 1) {
          insertionQueryString +=
            "(" + task_id + "," + userchoices[i] + ",'No')";
        } else {
          insertionQueryString +=
            "(" + task_id + "," + userchoices[i] + ",'No'), ";
        }
      }

      const queryForInsertion = await dbPoolInstance.query(
        insertionQueryString
      );
      callback(null, queryForInsertion.rows);
    } catch (e) {
      console.log(e.stack);
    }
  };


  let displayEditRequestFunction = async (callback, taskid) => {
    try {
      let allUsersQueryString = "SELECT * FROM users";
      let requestsOfCurrentTaskQueryString =
        "SELECT * FROM requests WHERE task_id=$1";
      const values = [taskid];

      const queryForAllUsers = await dbPoolInstance.query(allUsersQueryString);
      const queryForRequestsOfCurrentTask = await dbPoolInstance.query(
        requestsOfCurrentTaskQueryString,
        values
      );

      const callbackObject = {
        requestsOfCurrentTask: queryForRequestsOfCurrentTask.rows,
        allUsers: queryForAllUsers.rows,
      };

      callback(null, callbackObject);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let submitEditRequestFunction = async (callback, reqObj) => {
    try {
      const values = [reqObj.task_id];
      let task_id = reqObj.task_id;
      let userchoices = reqObj.userchoices;
      let deleteRequestsOfTaskQueryString =
        "DELETE FROM requests WHERE task_id=$1";
      let insertNewRequestsQueryString =
        "INSERT INTO requests(task_id,user_id,doneYet) VALUES ";
      // Inserting multiple assignees using one query string.
      for (let i = 0; i < userchoices.length; i++) {
        if (i == userchoices.length - 1) {
          insertNewRequestsQueryString +=
            "(" + task_id + "," + userchoices[i] + ",'No')";
        } else {
          insertNewRequestsQueryString +=
            "(" + task_id + "," + userchoices[i] + ",'No'), ";
        }
      }

      const queryForDeleteRequests = await dbPoolInstance.query(
        deleteRequestsOfTaskQueryString,
        values
      );
      const queryForInsertingNewRequests = await dbPoolInstance.query(
        insertNewRequestsQueryString
      );
      callback(null, queryForInsertingNewRequests.row);
    } catch (e) {
      console.log(e);
    }
  };

  let createNewProjectFunction = async (callback, projObj, userid) => {
    try {
      const values = [projObj.projname, projObj.description, userid];
      let newProjectQueryString =
        "INSERT INTO boards(name,description,user_id) VALUES($1,$2,$3) RETURNING *";
      const queryForNewProject = await dbPoolInstance.query(
        newProjectQueryString,
        values
      );
      callback(null, queryForNewProject.rows);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let seeAllTasksFromProjectFunction = async (callback) => {
    // This query returns all tasks from the task table including the name of the task owner
    let queryStringAllTasks =
      "SELECT tasks.id AS task_id, tasks.name AS taskname, tasks.user_id AS ownerid,createdat, duedate, users.name AS username, board_id FROM tasks INNER JOIN users ON users.id = tasks.user_id";
    // This query returns all the boards which exists, including the name of the user who created the project.
    let queryStringAllBoards =
      "SELECT boards.id AS id, boards.name AS name, boards.description AS description, boards.user_id AS user_id, users.name AS projownername FROM boards INNER JOIN users ON boards.user_id = users.id";
    // This query returns all requests (i.e. users assigned to complete a certain tasks) including their names
    let queryStringAllRequests =
      "SELECT task_id, user_id, name, doneYet FROM requests INNER JOIN users ON requests.user_id = users.id";
    // This query returns the all details of the current users of the app.
    let queryStringAllUsers = "SELECT * FROM users";

    try {
      const queryForAllTasks = await dbPoolInstance.query(queryStringAllTasks);
      const queryForAllBoards = await dbPoolInstance.query(
        queryStringAllBoards
      );
      const queryForAllRequests = await dbPoolInstance.query(
        queryStringAllRequests
      );
      const queryForAllUsers = await dbPoolInstance.query(queryStringAllUsers);
      const callbackObject = {
        allTasks: queryForAllTasks.rows,
        allBoards: queryForAllBoards.rows,
        allRequests: queryForAllRequests.rows,
        allUsers: queryForAllUsers.rows,
      };
      callback(null, callbackObject);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let deleteTaskFunction = async (callback, taskid) => {
    try {
      const values = [taskid];
      let deleteTasksQueryString = "DELETE FROM tasks WHERE id=$1";
      let deleteRequestsOfTaskQueryString =
        "DELETE FROM requests WHERE task_id=$1";

      const queryForTaskDelete = await dbPoolInstance.query(
        deleteTasksQueryString,
        values
      );
      const queryForRequestDelete = await dbPoolInstance.query(
        deleteRequestsOfTaskQueryString,
        values
      );
      callback(null, queryForRequestDelete.rows);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let cascadingDeleteFunction = async (callback, boardid) => {
    try {
      const values = [boardid];
      let deleteRequestsQueryString = `DELETE FROM requests WHERE task_id IN (SELECT id FROM tasks WHERE board_id=$1)`;
      let deleteTasksQueryString = `DELETE FROM tasks WHERE board_id=$1`;
      let deleteBoardQueryString = `DELETE FROM boards WHERE id=$1`;
      const queryForDeleteRequests = await dbPoolInstance.query(
        deleteRequestsQueryString,
        values
      );
      const queryForDeleteTasks = await dbPoolInstance.query(
        deleteTasksQueryString,
        values
      );
      const queryForDeleteBoards = await dbPoolInstance.query(
        deleteBoardQueryString,
        values
      );
      callback(null, queryForDeleteBoards);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let retrieveProjectDataFunction = async (callback, boardid) => {
    try {
      const values = [boardid];

      let getBoardQueryString = `SELECT * FROM boards WHERE id=$1`;
      const queryForBoard = await dbPoolInstance.query(
        getBoardQueryString,
        values
      );

      callback(null, queryForBoard.rows[0]);
    } catch (e) {
      console.log(e.stack);
    }
  };

  let submitEditProjFunction = async (callback, projObj, projId) => {
    try {
      const values = [projObj.projname, projObj.description, projId];
      let submitProjectQueryString = `UPDATE boards SET name=$1, description=$2 WHERE id=$3`;
      const queryForSubmitProj = await dbPoolInstance.query(
        submitProjectQueryString,
        values
      );
      callback(null, queryForSubmitProj.rows);
    } catch (e) {
      console.log(e.stack);
    }
  };

  return {
    tasksReceived: tasksReceivedFunction,
    submitLogin: submitLoginFunction,
    tasksGiven: tasksGivenFunction,
    submitNewUser: submitNewUserFunction,
    toggleDone: toggleDoneFunction,
    editTask: editTaskFunction,
    submitEditTask: submitEditTaskFunction,
    findLatestTask: findLatestTaskFunction,
    submitCreatedTask: submitCreatedTaskFunction,
    selectAllUsers: selectAllUsersFunction,
    submitRequest: submitRequestFunction,
    displayEditRequest: displayEditRequestFunction,
    submitEditRequest: submitEditRequestFunction,
    createNewProject: createNewProjectFunction,
    seeAllTasksFromProject: seeAllTasksFromProjectFunction,
    deleteTask: deleteTaskFunction,
    cascadingDelete: cascadingDeleteFunction,
    retrieveProjectData: retrieveProjectDataFunction,
    submitEditProj: submitEditProjFunction,
  };
};
