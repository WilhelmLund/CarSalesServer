const http = require('http');
const app = require('./salesApp');

//process.env.PORT is not applicable for now, but would 
//be relevant if the server was ever uploaded to a hosting site
const port = process.env.PORT || 9009;
const server = http.createServer(app);

server.listen(port);