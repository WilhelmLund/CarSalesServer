const express = require('express');
const route = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./carsales.db', sqlite3.OPEN_READWRITE, (err) =>{
	if(err){
		console.error(err.message);
	}
	console.log('carmodels: connected to DB succesfully');
});

route.get('/', (req, res, next) => {
	db.serialize(() => {
		db.all('SELECT * FROM carmodels', (err, rows) => {
			if(err){
				console.error(err.message);
			}
			var carmodels = [];
			rows.forEach((row) => {
				carmodels.push(carmodel={
					id: row.id,
					brand: row.brand,
					model: row.model,
					price: row.price
				});
			});
			res.status(200).json({carmodels});
		});
	});
});

route.get('/:carmodelID', (req, res, next) => {
	const carmodelID = req.params.carmodelID;
	db.serialize(() => {
		db.all('SELECT * FROM carmodels WHERE id = ?', carmodelID, (err, rows) => {
			if(err){
				return res.status(500);
			}
			var carmodels = [];
			rows.forEach((row) => {
				carmodels.push(carmodel={
					id: row.id,
					brand: row.brand,
					model: row.model,
					price: row.price
				});
			});
			res.status(200).json({carmodels});
		});
	});
});

route.post('/', (req, res, next) => {
	const carmodel = {
		id: req.body.id,
		brand: req.body.brand,
		model: req.body.model,
		price: req.body.price
	}
	db.serialize(() => {
 		db.run('INSERT INTO carmodels(id, brand, model, price) VALUES (?,?,?,?)', req.body.id, req.body.brand, req.body.model, req.body.price, (err) => {
    		if (err) {
     			console.error(err.message);
    		}
    		console.log('success');
			res.status(201).json({carmodel});
		});
    });
});

module.exports = route;