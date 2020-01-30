/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let getAll = (callback) => {

    let query = 'SELECT * FROM pokemons';

    dbPoolInstance.query(query, (error, queryResult) => {
      if( error ){

        // invoke callback function with results after query has executed
        callback(error, null);

      }else{

        // invoke callback function with results after query has executed

        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);

        }else{
          callback(null, null);

        }
      }
    });
  };

  let tasksReceived = (callback,id) => {
    const values = [id]
    let query = `SELECT task_id, taskname, name AS reqbyusername, requestid, boardname, createdat, duedate, doneyet FROM users INNER JOIN (SELECT requestedbyuser,requestid, board_id, task_id, name AS boardname,taskname, createdat, duedate, doneyet FROM boards INNER JOIN
(SELECT user_id AS requestedbyuser, requestid, board_id, task_id, name AS taskname, createdat, duedate, doneyet FROM tasks INNER JOIN
(SELECT user_id AS yourid, id AS requestID, task_id, doneyet FROM requests WHERE user_id = $1) AS x ON x.task_id = tasks.id) AS y ON y.board_id = boards.id) AS z ON z.requestedbyuser =  users.id`

  dbPoolInstance.query(query,values,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    })
  }

  let tasksGiven = (callback,id) => {
    const values = [id]
    let query = `SELECT task_id, taskname, tobedoneby, requestid, name AS boardname, createdat, duedate, doneyet FROM
boards 
INNER JOIN
(SELECT name AS taskname, task_id, createdat, duedate, user_id, board_id, tobedoneby, doneyet, requestid FROM tasks
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
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
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

        
       
      

  return {
    getAll:getAll,
    tasksReceived: tasksReceived,
    tasksGiven: tasksGiven,
    toggleDone: toggleDone,
    editTask: editTask,
    submitEditTask: submitEditTask   
  };
};
