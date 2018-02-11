const express = require('express');
const route = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./carsales.db', sqlite3.OPEN_READWRITE, (err) =>{
	if(err){
		console.error(err.message);
	}
	// Following line was used for debugging
	//console.log('sales: connected to DB succesfully');
});

// get a list of all sales, which employee handled it and what car was sold
route.get('/', (req, res, next) => {
	db.serialize(() => {
		db.all('SELECT * FROM sales', (err, rows) => {
			if(err){
				console.error(err.message);
			}
			var sales = [];
			rows.forEach((row) => {
				sales.push(sale={
					id: row.id,
					employee_id: row.employee_id,
					carmodel_id: row.carmodel_id
				});
			});
			res.status(200).json({sales});
		});
	});
});

// get a specific sale by its sales_id
route.get('/:salesID', (req, res, next) => {
	const salesID = req.params.salesID;
	db.serialize(() => {
		let sql ='SELECT * FROM sales WHERE id = ?';
		db.all(sql, salesID, (err, rows) => {
			if(err){
				console.error(err.message);
			}
			var sales = [];
			rows.forEach((row) => {
				sales.push(sale={
					id: row.id,
					employee_id: row.employee_id,
					carmodel_id: row.carmodel_id
				});
			});
			res.status(200).json({sales});
		});
	});
});

module.exports = route;