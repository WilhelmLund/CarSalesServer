const express = require('express');
const route = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./carsales.db', sqlite3.OPEN_READWRITE, (err) =>{
	if(err){
		console.error(err.message);
	}
	// Following line was used for debugging
	//console.log('employees: connected to DB succesfully');
});

// get a complete list of all employees currently in the database
route.get('/', (req, res, next) => {
	db.serialize(() => {
		db.all('SELECT * FROM employees', (err, rows) => {
			if(err){
				console.error(err.message);
			}
			var employees = [];
			rows.forEach((row) => {
				employees.push(employee={
					id: row.id,
					name: row.name
				});
			});
			res.status(200).json({employees});
		});
	});
});

// get details of a specific employee by their employee_ids
route.get('/:employeeID', (req, res, next) => {
	const employeeID = req.params.employeeID;
	db.serialize(() => {
		let sql = 'SELECT * FROM employees WHERE id = ?';
		db.all(sql, employeeID, (err, rows) => {
			if(err){
				console.error(err.message);
			}
			var employees = [];
			rows.forEach((row) => {
				employees.push(employee={
					id: row.id,
					name: row.name
				});
			});
			res.status(200).json({employees});
		});
	});
});

// Insert new employee into database
route.post('/', (req, res, next) => {
	const employee = {
		id: req.body.id,
		name: req.body.name
	}
	db.serialize(() => {
		let sql = 'INSERT INTO employees(id, name) VALUES (?, ?)';
		db.run(sql, req.body.id, req.body.name, (err) =>{
			if (err){
				console.error(err.message);
			}
			res.status(201).json({employee})
		});
	});
});

// delete existing employee from database
// DELETE definately should not look different here and in carmodels
// final release would see them both working the same way!
// Should return something more appropriate than a simple 'message'
route.delete('/', (req, res, next) => {
	const employeeID = req.body.id;
	db.serialize(() => {
		let sql = 'DELETE FROM employees WHERE id = ?';
		db.run(sql, carmodelID, (err) => {
			if(err){
				console.error(err.message);
			}
			res.status(200).json({
				message: 'employee succesfully terminated'
			});
		});
	});
});

// updates details for an employee in the database
route.patch('/', (req, res, next) => {
	db.serialize(() => {
		let sql = 'UPDATE employees SET name = ? WHERE id = ?';
		db.run(sql, req.body.name, req.body.id, (err) => {
			if(err){
				console.error(err.message);
			}
			res.status(200).json({
				message: 'employee succesfully updated'
			});
		});
	});
});

module.exports = route;