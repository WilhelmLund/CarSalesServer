const express = require('express');
const route = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./carsales.db', sqlite3.OPEN_READWRITE, (err) =>{
	if(err){
		console.error(err.message);
	}
	console.log('sales: connected to DB succesfully');
});

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

route.get('/:salesID', (req, res, next) => {
	const salesID = req.params.salesID;
	db.serialize(() => {
		db.all('SELECT * FROM sales WHERE id = ?', salesID, (err, rows) => {
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