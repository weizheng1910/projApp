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
    let query = `SELECT name AS reqbyusername, requestid, task_id, boardname, taskname, createdat, duedate, doneyet FROM users INNER JOIN
(SELECT requestedbyuser,requestid, board_id, task_id, name AS boardname,taskname, createdat, duedate, doneyet FROM boards INNER JOIN
(SELECT user_id AS requestedbyuser, requestid, board_id, task_id, name AS taskname, createdat, duedate, doneyet  
FROM 
tasks
INNER JOIN
(SELECT user_id AS yourid, id AS requestID, task_id, doneyet FROM requests WHERE user_id = $1) AS x
ON x.task_id = tasks.id) AS y 
ON y.board_id = boards.id) AS z
ON z.requestedbyuser =  users.id`

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

  return {
    getAll:getAll,
    tasksReceived: tasksReceived
  };
};
