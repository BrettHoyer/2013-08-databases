var handler = require('./request-handler.js');
var http = require('http')


/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */
var port = 8080;

var ip = '127.0.0.1'

var server = http.createServer(handler.requestHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);



