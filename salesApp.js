const express = require('express');
const app = express();

const employeeRoute = require('./api/routes/employees');
const carmodelsRoute = require('./api/routes/carmodels');
const salesRoute = require('./api/routes/sales');
const totSalesRoute = require('./api/routes/total_sales');

app.use('/employees', employeeRoute);
app.use('/carmodels', carmodelsRoute);
app.use('/sales', salesRoute);
app.use('/total_sales', totSalesRoute);

module.exports = app;