const express = require('express');
const route = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./carsales.db', sqlite3.OPEN_READWRITE, (err) =>{
	if(err){
		console.error(err.message);
	}
	// Following line was used for debugging
	//console.log('carmodels: connected to DB succesfully');
});

// get a list of all carmodels currently in the catalogue
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

// get details of a specific carmodel by its carmodel_id
route.get('/:carmodelID', (req, res, next) => {
	const carmodelID = req.body.carmodelID;
	db.serialize(() => {
		let sql = 'SELECT * FROM carmodels WHERE id = ?';
		db.all(sql, carmodelID, (err, rows) => {
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

// insert a new carmodel into the database
route.post('/', (req, res, next) => {
	const carmodel = {
		id: req.body.id,
		brand: req.body.brand,
		model: req.body.model,
		price: req.body.price
	}
	db.serialize(() => {
		let sql ='INSERT INTO carmodels(id, brand, model, price) VALUES (?,?,?,?)';
 		db.run(sql, req.body.id, req.body.brand, req.body.model, req.body.price, (err) => {
    		if (err) {
     			console.error(err.message);
    		}
			res.status(201).json({carmodel});
		});
    });
});

// delete existing carmodel from database
// It may be a better to send the ID in body rather than DELETE /carmodels/modelID
// Should return something more appropriate than a simple 'message'
route.delete('/:carmodelID', (req, res, next) => {
	const carmodelID = req.params.carmodelID;
	db.serialize(() => {
		let sql = 'DELETE FROM carmodels WHERE id = ?';
 		db.run(sql, carmodelID,  (err) => {
    		if (err) {
     			console.error(err.message);
    		}
    		res.status(200).json({
    			message: 'carmodel successfully deleted'
    		});
		});
    });
});

// updates details for a carmodel in the database
// severley limited! requires all data to be updated, except id, which cant be updated
route.patch('/', (req, res, next) => {
	db.serialize(() => {
		let sql = 'UPDATE carmodels SET brand = ?, model = ?, price = ? WHERE id = ? ';
 		db.run(sql, req.body.brand, req.body.model, req.body.price, req.body.id,  (err) => {
    		if (err) {
     			console.error(err.message);
    		}
    		res.status(200).json({
    			message: 'carmodel successfully updated'
    		});
		});
    });
});

module.exports = route;