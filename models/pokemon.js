/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope
  let submitNewUser = (callback,username,password) => {
    const values = [username,password]
    let query = 'INSERT INTO users(name,password) VALUES($1,$2) RETURNING *'
    dbPoolInstance.query(query,values,(error,queryResult) => {
      callback(null,queryResult.rows)
    })
  }

  let submitLogin = (callback,username,password) => {
    const values = [username]
    console.log("submit username is "+username)
    let query = 'SELECT * FROM users WHERE name=$1'
    dbPoolInstance.query(query,values,(error,queryResult) => {
      if(error){
        callback(error,"Query error")
      } else {

        if(queryResult.rows.length == 0){
          callback(error,"No results found")
        } else {
          callback(null,queryResult.rows)
        }

      }
    })
  }
 

  let tasksReceived = (callback,id) => {
    const values = [id]
    let query = `SELECT task_id, yourid, taskname, name AS reqbyusername, requestid, board_id, boardname, createdat, duedate, doneyet FROM users INNER JOIN (SELECT requestedbyuser, yourid, requestid, board_id, task_id, name AS boardname,taskname, createdat, duedate, doneyet FROM boards INNER JOIN
(SELECT user_id AS requestedbyuser, yourid, requestid, board_id, task_id, name AS taskname, createdat, duedate, doneyet FROM tasks INNER JOIN
(SELECT user_id AS yourid, id AS requestID, task_id, doneyet FROM requests WHERE user_id = $1) AS x ON x.task_id = tasks.id) AS y ON y.board_id = boards.id) AS z ON z.requestedbyuser =  users.id`

  dbPoolInstance.query(query,values,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        let query2 = 'SELECT * FROM boards'
        dbPoolInstance.query(query2,(error,queryResult2) => {
          queryResult.rows.unshift(queryResult2.rows)

          let query3 = 'SELECT name FROM users WHERE id=$1'
          dbPoolInstance.query(query3,values,(error,queryResult3) => {
            queryResult.rows.unshift(queryResult3.rows)
          callback(null, queryResult.rows);

          })
        })
      }
    })
  }

  let tasksGiven = (callback,id) => {
    const values = [id]
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
ON y.board_id = boards.id`

  dbPoolInstance.query(query,values,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
          callback(null, queryResult.rows);        
      }
    })
  }

  let toggleDone = (requestid,callback) => {
    const values = [requestid]
    let query = `SELECT * FROM requests WHERE id=$1`

    dbPoolInstance.query(query,values,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){
          // callback(null, queryResult.rows);
          if(queryResult.rows[0].doneyet === 'No'){
            let query2 = `UPDATE requests SET doneyet='Yes' WHERE id=$1 RETURNING *`
              dbPoolInstance.query(query2,values,(err, queryResult2) => {
                callback(null,queryResult2.rows)
                console.log('Result is'+queryResult.rows[0].user_id)
                console.log('What is this: '+queryResult2.rows)
              })
            } else if(queryResult.rows[0].doneyet === 'Yes'){
              let query3 = `UPDATE requests SET doneyet='No' WHERE id=$1 RETURNING *`
              dbPoolInstance.query(query3,values,(err, queryResult3) => {
                callback(null,queryResult3.rows)
                console.log('Result is'+queryResult.rows[0].user_id)
                console.log('What is this: '+queryResult3.rows)
              })
            }
          }
        }
      })

    }

  let editTask = (taskid,callback) => {
    const values = [taskid]
    let query = `SELECT * FROM tasks WHERE id=$1`
    dbPoolInstance.query(query,values,(error ,queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){
          let query = `SELECT * FROM boards`
          dbPoolInstance.query(query,(error,queryResult2) => {
            queryResult.rows.push(queryResult2.rows)
            callback(null, queryResult.rows);
          })
        }else{
          callback(null, null);
        }
      }
    })
  }

  let submitEditTask = (callback,formObject) => {
    const values = [formObject.task_id,formObject.taskname,formObject.dueDate,formObject.project]

    let query = `UPDATE tasks 
    SET name =$2,
    dueDate =$3,
    board_id =$4
    WHERE id=$1 RETURNING *
    `
    dbPoolInstance.query(query,values,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        callback(null, queryResult.rows)
      }
    })
  }

  let findLatestTask = (callback) => {

    let query = `SELECT * FROM tasks ORDER BY id DESC LIMIT 1`

    dbPoolInstance.query(query,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if(queryResult.rows.length == 0){
         queryResult.rows = [[]] 
        }
          let query2 = `SELECT * FROM boards`
          dbPoolInstance.query(query2,(error,queryResult2) => {
            queryResult.rows.push(queryResult2.rows)
            callback(null, queryResult.rows)
          })
        }
      })
    }
  

  let submitCreatedTask = (callback,taskObject) => {
    const values = [taskObject.taskname,taskObject.createdAt,taskObject.dueDate,taskObject.user_id,taskObject.project]

    console.log(values)

    let query = 'INSERT INTO tasks(name,createdAt,dueDate,user_id,board_id) VALUES($1,$2,$3,$4,$5) RETURNING *'

    dbPoolInstance.query(query,values,(error,queryResult) => {
      if(error){
        callback(error,"Error")
      } else {  
        callback(null,queryResult.rows)
        console.log("Success at query")
      }
    })
  }

  let selectAllUsers = (callback) => {
    let query = 'SELECT * FROM users'

    dbPoolInstance.query(query,(error,queryResult) => {
       if(error){
        callback(error,"Error")
      } else {  
        callback(null,queryResult.rows)
      }
    })
  }

  let submitRequest = (callback,requestObj) => {
    const task_id = requestObj.task_id
    let userchoices = requestObj.userchoices
    if(!userchoices){
      callback(null,[])
    }

    let query = 'INSERT INTO requests(task_id,user_id,doneYet) VALUES '

    for(let i = 0; i < userchoices.length; i++){
      if(i == userchoices.length - 1){
        query+='('+task_id+','+userchoices[i]+',\'No\')'
      } else {
        query+='('+task_id+','+userchoices[i]+',\'No\'), '
      }
    }

    //Check query language
    console.log(query)

    dbPoolInstance.query(query,(error,queryResult) => {
      if(error){
        callback(error,"Error")
      } else {
        callback(null,queryResult.rows)
      }
    })
  }

  let displayEditRequest = (callback,taskid) => {
    
    let query = 'SELECT * FROM users'

    dbPoolInstance.query(query,(error,queryResult) => {
      if(error){
        console.log("Error stage 1")
      } else {
        const values = [taskid]
        let query2 = 'SELECT * FROM requests WHERE task_id=$1'
        dbPoolInstance.query(query2, values,(error,queryResult2) => {
          if(error){
            console.log("Error stage 2")
          }
          queryResult2.rows.unshift(queryResult.rows)
          callback(null,queryResult2.rows)
        })
      }
    })
  }

  let submitEditRequest = (callback,reqObj) => {
    
    const values = [reqObj.task_id]
    let query = 'DELETE FROM requests WHERE task_id=$1'

    dbPoolInstance.query(query,values,(error,queryResult) => {

      let query2 = 'INSERT INTO requests(task_id,user_id,doneYet) VALUES '
      let task_id = reqObj.task_id
      let userchoices = reqObj.userchoices

      for(let i = 0; i < userchoices.length; i++){
        if(i == userchoices.length - 1){
          query2+='('+task_id+','+userchoices[i]+',\'No\')'
        } else {
          query2+='('+task_id+','+userchoices[i]+',\'No\'), '
        }
      }

      dbPoolInstance.query(query2,(error,queryResult) => {
        if(error){
          callback(error,"QueryError")
        } else {
          callback(null,queryResult.rows)
        }
      })//end query2
    })//end query1
  }

  let createNewProject = (callback,projObj,userid) => {
    const values = [projObj.projname,projObj.description,userid]
    let query = 'INSERT INTO boards(name,description,user_id) VALUES($1,$2,$3) RETURNING *'
    dbPoolInstance.query(query,values,(error,queryResult) => {
      if(error){
        callback(error,"QueryError")
      } else {
        callback(null,queryResult.rows)
      }
    })
  }

  let seeAllTasksFromProject = (callback) => {
    
    let query = 'SELECT tasks.id AS task_id, tasks.name AS taskname, tasks.user_id AS ownerid,createdat, duedate, users.name AS username, board_id FROM tasks INNER JOIN users ON users.id = tasks.user_id'

    dbPoolInstance.query(query,(error,queryResult) => {
      if(error){
        callback(error,"QueryError")
      } else {
        let query2 = 'SELECT boards.id AS id, boards.name AS name, boards.description AS description, boards.user_id AS user_id, users.name AS projownername FROM boards INNER JOIN users ON boards.user_id = users.id'
        dbPoolInstance.query(query2,(error,queryResult2) => {
          queryResult.rows.unshift(queryResult2.rows)

          let query3 = 'SELECT task_id, user_id, name, doneYet FROM requests INNER JOIN users ON requests.user_id = users.id'
          dbPoolInstance.query(query3,(error,queryResult3) => {
            queryResult.rows.unshift(queryResult3.rows)

            let query4 = 'SELECT * FROM users'
            dbPoolInstance.query(query4,(error,queryResult4) => {
              queryResult.rows.unshift(queryResult4.rows)
              callback(null,queryResult.rows)
            })
          })
        })        
      }
    })
  }

  let deleteTask = (callback,taskid) => {
    const values= [taskid]
    let query = 'DELETE FROM tasks WHERE id=$1'
    dbPoolInstance.query(query,values,(error,queryResult) => {
      
      let query2 = 'DELETE FROM requests WHERE task_id=$1'
      dbPoolInstance.query(query2,values,(error,queryResult2) => {
        callback(null,queryResult.rows)
      })
    })
  }

  let cascadingDelete = (callback,boardid) => {

    const values = [boardid]

    let query = `DELETE FROM requests WHERE task_id IN (SELECT id FROM tasks WHERE board_id=$1)`

    dbPoolInstance.query(query,values,(error,queryResult) => {
      
      if(error){
        callback(error,"Query Error Stage 1")
      } else {

        let query2 = `DELETE FROM tasks WHERE board_id=$1`
        dbPoolInstance.query(query2,values,(error,queryResult2) => {
          
          if(error){
            callback(error,"Query Error Stage 2")
          } else {

            let query3 = `DELETE FROM boards WHERE id=$1`
            dbPoolInstance.query(query3,values,(error,queryResult3) => {
              
              if(error){
                callback(error,"Query Error Stage 3")
              } else {
                callback(error,queryResult3)
              }
            })
          }
        })
      }
    })
  }

  let retrieveProjectData = (callback,boardid) => {
    const values = [boardid]

    let query = `SELECT * FROM boards WHERE id=$1`

    dbPoolInstance.query(query,values,(error,queryResult) => {
      if(error){
        callback(error,"Query Error")
      } else {
        callback(null,queryResult.rows)
      }
    })
  }

  let submitEditProj = (callback,projObj,projId)=> {

    const values = [projObj.projname,projObj.description,projId]

    let query = `UPDATE boards SET name=$1, description=$2 WHERE id=$3`

    dbPoolInstance.query(query,values,(error,queryResult) => {
      if(error){
        callback(error,"Query error")
      } else {
        callback(null,queryResult.rows)
      }
    })
  }

  return {
    
    tasksReceived: tasksReceived,
    submitLogin: submitLogin,
    tasksGiven: tasksGiven,
    submitNewUser: submitNewUser,
    toggleDone: toggleDone,
    editTask: editTask,
    submitEditTask: submitEditTask,
    findLatestTask: findLatestTask,
    submitCreatedTask: submitCreatedTask,
    selectAllUsers: selectAllUsers,
    submitRequest: submitRequest,
    displayEditRequest: displayEditRequest,
    submitEditRequest: submitEditRequest,
    createNewProject: createNewProject,
    seeAllTasksFromProject: seeAllTasksFromProject,
    deleteTask: deleteTask,
    cascadingDelete: cascadingDelete,
    retrieveProjectData: retrieveProjectData,
    submitEditProj: submitEditProj
  };
};
