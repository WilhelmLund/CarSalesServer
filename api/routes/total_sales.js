const express = require('express');
const route = express.Router();

route.get('/', (req, res, next) => {
	res.status(200).json({
		//this is where GET/employees should return appropriate data
		message: 'TODO GET total_sales'
	});
});

route.post('/', (req, res, next) => {
	res.status(201).json({
		//this is where POST/employees should return appropriate data
		message: 'TODO POST total_sales'
	});
});

module.exports = route;