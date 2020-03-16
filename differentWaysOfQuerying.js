// For queries dependent on the result of another query.

let thisFunction = (params1, params2) => {
  const values = [params1, params2]
  let query = `<Query here>`

  dbPoolInstance.query(query,values,(error, queryResult) => {
    if(error){
      callback(error,null)
    } else {
      if(queryResult.rows.length == 0){
        callback(error,'No results found')
      } else {
        anotherFunction(callback,queryResult.rows)
      }
    }
  })
}

let anotherFunction = (callback, params) => {
  const values = [params]
  let query = `<Insert Query Here>`

  dbPoolInstance.query(query,values,(error, queryResult) => {
    if(error){
      callback(error,null)
    } else {
      if(queryResult.rows.length == 0){
        callback(error, 'No results found')
      } else {
        callback(null, queryResult.rows)
      }
    }
  })
}

// To execute similar queries in one function.  

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

// To have the results of multiple queries in one controller. 

