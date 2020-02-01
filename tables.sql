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