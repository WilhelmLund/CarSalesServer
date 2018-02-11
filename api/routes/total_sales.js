const express = require('express');
const route = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./carsales.db', sqlite3.OPEN_READWRITE, (err) =>{
	if(err){
		console.error(err.message);
	}
	console.log('total_sales: connected to DB succesfully');
});

route.get('/', (req, res, next) => {
	db.serialize(() => {
		let sql = 'SELECT e.*, SUM(c.price) AS sum FROM sales AS s JOIN employees AS e ON s.employee_id = e.id JOIN carmodels AS c ON s.carmodel_id = c.id GROUP BY e.id';
		db.all(sql, (err, rows) => {
			if(err){
				console.error(err.message);
			}
			var total_sales = [];
			rows.forEach((row) => {
				total_sales.push(tSale={
					id: row.id,
					name: row.name,
					sales: row.sum
				});
			});
			res.status(200).json({total_sales});
		});
	});
});


module.exports = route;