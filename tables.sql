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

CREATE TABLE IF NOT EXISTS requests(
	id SERIAL PRIMARY KEY,
	task_id INTEGER,
	user_id INTEGER,
	doneYet TEXT
);