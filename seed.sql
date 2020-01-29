/*


INSERT INTO users(name,password) VALUES('Tom','1234');
INSERT INTO users(name,password) VALUES('Dick','3456');
INSERT INTO users(name,password) VALUES('Harry','5678');


INSERT INTO boards(name,description) VALUES('JPMorgam','This is a client11');
INSERT INTO boards(name,description) VALUES('BAML','This is a client22');
INSERT INTO boards(name,description) VALUES('Morgan Stanley','This is a client33'); 
*/

/*Task Name*/
/*
INSERT INTO tasks(name,createdAt,dueDate,user_id,board_id) VALUES ('task1','2/2/2019','3/3/2019',1,1);
INSERT INTO tasks(name,createdAt,dueDate,user_id,board_id) VALUES ('task2','2/2/2019','3/3/2019',1,2);
INSERT INTO tasks(name,createdAt,dueDate,user_id,board_id) VALUES ('task2','2/2/2019','3/3/2019',2,1);
*/
/*Requests*/
/*
INSERT INTO requests(task_id,user_id,doneYet) VALUES (1,2,'No');
INSERT INTO requests(task_id,user_id,doneYet) VALUES (1,3,'No');
INSERT INTO requests(task_id,user_id,doneYet) VALUES (3,1,'No');
INSERT INTO requests(task_id,user_id,doneYet) VALUES (3,2,'No');
INSERT INTO requests(task_id,user_id,doneYet) VALUES (3,3,'No');
*/
INSERT INTO requests(task_id,user_id,doneYet) VALUES (1,1,'No');
/*


SEE ALL TASKS REQUESTS ASSIGNED BY A USER

SELECT user_id,requestid, name AS boardname, taskname, task_id, createdat, duedate, tobedoneby, doneyet FROM
boards 
INNER JOIN
(SELECT name AS taskname, task_id, createdat, duedate, user_id, board_id, tobedoneby, doneyet, requestid FROM tasks
INNER JOIN
(SELECT task_id, name AS tobedoneby, doneYet, requests.id AS requestID FROM requests
INNER JOIN users 
ON users.id = requests.user_id) AS x
ON tasks.id = x.task_id
WHERE user_id = 2) AS y
ON y.board_id = boards.id

SEE ALL TASKS ASSIGNED TO A USER 

SELECT name AS reqbyusername, requestid, task_id, boardname, taskname, createdat, duedate, doneyet
FROM users
INNER JOIN
(SELECT requestedbyuser,requestid, board_id, task_id, name AS boardname,taskname, createdat, duedate, doneyet
FROM boards 
INNER JOIN
(SELECT user_id AS requestedbyuser, requestid, board_id, task_id, name AS taskname, createdat, duedate, doneyet  
FROM 
tasks
INNER JOIN
(SELECT user_id AS yourid, id AS requestID, task_id, doneyet FROM requests WHERE user_id = 1) AS x
ON x.task_id = tasks.id) AS y 
ON y.board_id = boards.id) AS z
ON z.requestedbyuser =  users.id

*/