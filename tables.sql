CREATE TABLE IF NOT EXISTS users(
	id SERIAL PRIMARY KEY,
	name TEXT,
	password TEXT
);

CREATE TABLE IF NOT EXISTS boards(
	id SERIAL PRIMARY KEY,
	name TEXT,
	description TEXT
);

CREATE TABLE IF NOT EXISTS tasks(
	id SERIAL PRIMARY KEY,
	name TEXT,
	createdAt TEXT,
	dueDate TEXT,
	user_id INTEGER,
	board_id INTEGER
);

/*Make task id user id unique for request*/

CREATE TABLE IF NOT EXISTS requests(
	id SERIAL PRIMARY KEY,
	task_id INTEGER,
	user_id INTEGER,
	doneYet TEXT
);

/*
SELECT * FROM requests WHERE task_id IN
(SELECT id FROM tasks WHERE board_id=3);

DELETE FROM tasks WHERE board_id=$1

DELETE FROM boards WHERE id=$1
*/

/*

(SELECT task_id, user_id, name, doneYet FROM requests INNER JOIN users ON requests.user_id = users.id) AS taskIdWithUserName


*/

/*
SELECT task_id, taskname, name AS reqbyusername, requestid, board_id, boardname, createdat, duedate, doneyet FROM users INNER JOIN (SELECT requestedbyuser,requestid, board_id, task_id, name AS boardname,taskname, createdat, duedate, doneyet FROM boards INNER JOIN
(SELECT user_id AS requestedbyuser, requestid, board_id, task_id, name AS taskname, createdat, duedate, doneyet FROM tasks INNER JOIN
(SELECT user_id AS yourid, id AS requestID, task_id, doneyet FROM requests WHERE user_id = 1) AS x ON x.task_id = tasks.id) AS y ON y.board_id = boards.id) AS z ON z.requestedbyuser =  users.id


*/

/*
SELECT task_id, taskname, name AS reqbyusername, requestid, board_id, boardname, createdat, duedate, doneyet FROM users INNER JOIN (SELECT requestedbyuser,requestid, board_id, task_id, name AS boardname,taskname, createdat, duedate, doneyet FROM boards INNER JOIN
(SELECT user_id AS requestedbyuser, requestid, board_id, task_id, name AS taskname, createdat, duedate, doneyet FROM tasks INNER JOIN
(SELECT user_id AS yourid, id AS requestID, task_id, doneyet FROM requests WHERE user_id = 1) AS x ON x.task_id = tasks.id) AS y ON y.board_id = boards.id) AS z ON z.requestedbyuser =  users.id


*/