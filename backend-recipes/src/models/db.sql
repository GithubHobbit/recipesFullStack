CREATE TABLE IF NOT EXISTS users
(
	id SERIAL,
	email TEXT,
	password TEXT,
	username TEXT,
	birthday DATE,
	place_of_birth TEXT,
	avatar TEXT,

	PRIMARY KEY(id)
);

INSERT INTO users (email, password, username, birthday, place_of_birth) VALUES ('admin@mail.ru', 'admin', 'Alex', '1999-01-08', 'Russia');
INSERT INTO users (email, password, username, birthday, place_of_birth) VALUES ('user@mail.ru', '123', 'Алексей', '2000-01-08', 'Russia');

CREATE TABLE IF NOT EXISTS dishes
(
	id SERIAL,
	title TEXT,
	picture TEXT,
	description TEXT,
	created DATE,
	user_id INTEGER,

    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS steps
(
	id SERIAL,
	step_number SMALLINT,
	picture TEXT,
	description TEXT,
	dish_id INTEGER,

	PRIMARY KEY(id),
	FOREIGN KEY(dish_id) REFERENCES dishes (id)
);

CREATE TABLE IF NOT EXISTS measures
(
	id SERIAL,
	name TEXT,

	PRIMARY KEY(id)
);

INSERT INTO measures (name) VALUES ('шт');
INSERT INTO measures (name) VALUES ('по вкусу');

CREATE TABLE IF NOT EXISTS ingredients
(
	id SERIAL,
	name TEXT,
	processed BOOLEAN DEFAULT false,

	PRIMARY KEY(id)
);

INSERT INTO ingredients (name, processed) VALUES ('Огурец');
INSERT INTO ingredients (name, processed) VALUES ('Помидор');
INSERT INTO ingredients (name, processed) VALUES ('Лук');
INSERT INTO ingredients (name, processed) VALUES ('Соль');

CREATE TABLE IF NOT EXISTS recipes
(
	id SERIAL,
	order_number SMALLINT,
	ingredient_id INTEGER,
	quantity REAL,
	measure_id INTEGER,
	dish_id INTEGER,

	PRIMARY KEY(id),
	FOREIGN KEY(ingredient_id) REFERENCES ingredients (id),
	FOREIGN KEY(measure_id) REFERENCES measures (id),
	FOREIGN KEY(dish_id) REFERENCES dishes (id)
);




DELETE FROM steps;
DELETE FROM recipes;
DELETE FROM dishes;