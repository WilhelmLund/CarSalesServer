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

carmodel:
full crud
employee:
full crud
sales:
get and get by id
total_sales:
get
