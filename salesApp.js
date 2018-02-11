const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./carsales.db', sqlite3.OPEN_READWRITE, (err) =>{
	if(err){
		console.error(err.message);
	}
	console.log('server succesfully initiated and connected to database');
});

// setup routes so that specific GET, POST, DELETE, PATCH requests go to the right place
const employeeRoute = require('./api/routes/employees');
const carmodelsRoute = require('./api/routes/carmodels');
const salesRoute = require('./api/routes/sales');
const totSalesRoute = require('./api/routes/total_sales');

//allow proper json parsing
app.set('json spaces', 2);
app.use(express.json());

// use the created routes
app.use('/employees', employeeRoute);
app.use('/carmodels', carmodelsRoute);
app.use('/sales', salesRoute);
app.use('/total_sales', totSalesRoute);

module.exports = app;