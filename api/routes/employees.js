const express = require('express');
const route = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./carsales.db', sqlite3.OPEN_READWRITE, (err) =>{
	if(err){
		console.error(err.message);
	}
	console.log('employees: connected to DB succesfully');
});

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

route.get('/:employeeID', (req, res, next) => {
	const employeeID = req.params.employeeID;
	db.serialize(() => {
		db.all('SELECT * FROM employees WHERE id = ?', employeeID, (err, rows) => {
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


route.post('/', (req, res, next) => {
	res.status(201).json({
		//this is where POST/employees should return appropriate data
		message: 'TODO POST employees'
	});
});

module.exports = route;