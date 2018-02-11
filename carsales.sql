
-- Build the relevant tables
DROP TABLE IF EXISTS employees;
CREATE TABLE employees(
	id		INTEGER	PRIMARY KEY,
	name	TEXT
);

DROP TABLE IF EXISTS carmodels;
CREATE TABLE carmodels(
	id		INTEGER	PRIMARY KEY,
	brand	TEXT NOT NULL,
	model	TEXT NOT NULL,
	price	INT NOT NULL
);

PRAGMA foreign_keys = OFF;
DROP TABLE IF EXISTS sales;
PRAGMA foreign_keys = ON;
CREATE TABLE sales(
	id			INTEGER	PRIMARY KEY,
	employee_id	INT,
	carmodel_id	INT,
	FOREIGN KEY (employee_id) REFERENCES employees(id),
	FOREIGN KEY (carmodel_id) REFERENCES carmodels(id)
);


--Insert initial data
INSERT INTO employees (id, name)
VALUES	(1, 'Hjulia Styrén'),
		(2, 'Antonia Cylinder'),
		(3, 'Kalle Bromslöf'),
		(4, 'Johan Sportratt');

INSERT INTO carmodels(id, brand, model, price)
VALUES	(1, 'BMW', '335i', 200000),
		(2, 'Aston Martin', 'Vanquish', 233000),
		(3, 'Toyota', 'Prius', 150000),
		(4, 'Volvo', '240', 100000);

INSERT INTO sales(id, employee_id,carmodel_id)
VALUES	(1, 2, 3),
		(2, 4, 2),
		(3, 4, 4),
		(4, 1, 1),
		(5, 3, 1),
		(6, 3, 1),
		(7, 2, 2),
		(8, 2, 3);