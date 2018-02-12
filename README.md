# CarSalesServer

Pull down the files in the git in to a suitable directory.
Open a console and navigate to that directory.

run the following command in the command line:

```
sqlite3 carsales.db < carsales.sql
```

This will create the database with some initial data included.
Next, run the following command:

```
npm install
```

This will install the dependencies necessary to run the program.
Finally, run

```
node server.js
```

The server should be up and running on localhost port 9009 

## JSON

A number of requests are supported:

### carmodels:
Full CRUD support. To GET data, use GET /carmodels (no body needed). You can also get specific carmodels using GET /carmodels/<id>
To POST new data, use POST /carmodels, along with a body containing "id", "brand", "model", and "price".
Make sure the "id" is unique, as duplicate id's will be rejected from the database. To PATCH an existing carmodel, use PATCH /carmodels, along with a body conataining the "id" of the model to be patched, as well as full update information, i.e. entries
for "brand", "model", and "price". All information is needed even if only eg. the brand is changed. To DELETE data, use DELETE /carmodels along with a body containing the "id" of the carmodel.

### employees:
Full CRUD support. To GET data, use GET /employees (no body needed). You can also get specific employees using GET /employees/<id>.
To POST new data, use POST /employees, along with a body containing "id" and "name".
Make sure the "id" is unique, as duplicate id's will be rejected from the database. To PATCH an existing employee, use PATCH /employees, along with a body conataining the "id" of the employee to be patched, as well as updated infromation for "name". To DELETE data, use DELETE /employees along with a body containing the "id" of the employee.

### sales:
Support for GET. GET sales using GET /sales. You can also get a specific sale using GET /sales/<id>.
  
### total_sales:
Support for GET. Using GET /total_sales returns a list similar to GET /employees, but with the addition of the total sales value of each employye.

#### NB
All requests are sensitive to spelling, requesting GET /carmodel or GET /Carmodels will not work, as they dont match the expectaions of the database. Similarly, a POST /carmodels where the body lacks a "price" element, or has "modelID" instead of "id", will not work. The server does not properly inform of the fact that such entries are unsuccesfull. Erronous entries are not entered into the database.
