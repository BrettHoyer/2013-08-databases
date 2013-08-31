var http = require('http')
var fs   = require('fs');
var url  = require("url");
var path = require('path');
var mysql = require('mysql');

/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

// var EventEmitter = require('events').EventEmitter;

 /* These headers will allow Cross-Origin Resource Sharing.
   * This CRUCIAL code allows this server to talk to websites that
   * are on different domains. (Your chat client is running from a url
   * like file://your/chat/client/index.html, which is considered a
   * different domain.) */

/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "1",
  database: "chat"
});

dbConnection.connect();

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


exports.requestHandler = function(request, response) {
  var afterClasses = '';
  if(request.url.match(/classes\/(.*)/)){
    afterClasses = request.url.match(/classes\/(.*)/)[1];
  }
  console.log("Serving request type " + request.method + " for url " + request.url);
  if(request.url === '/'){
    fs.readFile(__dirname + '/index.html', function (err, data) {
      var headers = defaultCorsHeaders;
      headers["Content-Type"] = "text/html";
      response.writeHead(200, headers);
      response.end(data);
    });
  } else if (request.url === '/client.js'){
    fs.readFile(__dirname + '/client.js', function (err, data) {
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/javascript';
      response.writeHead(200, headers);
      response.end(data);
    });
  } else if(request.url === '/classes/' + afterClasses){
    if (request.method === 'POST'){
      console.log(afterClasses);
      request.on('data', function(chunk){
        var post = JSON.parse(chunk);
        var query = dbConnection.query('INSERT INTO messages SET ?', post, function(err, result) {
          var headers = defaultCorsHeaders;
          response.writeHead(201, headers);
          response.end();
        });
        console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

      });
    } else if (request.method ===  'GET'){
        console.log('GET');
        // messages[afterClasses] = messages[afterClasses] || [];
        // response.end(JSON.stringify(messages[afterClasses]));
        dbConnection.query('SELECT * FROM messages', function(err, rows, fields){
          response.writeHead(201,headers)
          response.end(JSON.stringify(rows))
        })
    }
  } else if (request.url === '/css/reset.css'){
      fs.readFile(__dirname + '/css/reset.css', function (err,data) {
        var headers = defaultCorsHeaders;
        headers['Content-Type'] = 'text/css';
        response.writeHead(200,headers);
        response.end(data);
      });
  } else if (request.url === '/css/styles.css'){
    fs.readFile(__dirname + '/css/styles.css', function (err,data) {
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/css';
      response.writeHead(200,headers);
      response.end(data);
    });
  } else {
    var headers = defaultCorsHeaders;
    response.writeHead(404, headers);
    response.end();
  }
};




/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/
dbConnection.query('SELECT * FROM messages', function(err, rows, fields) {
  if (err) throw err;
  for(var i = 0; i < rows.length; i++){
    console.log('The username is: ', rows[i].username);
    console.log('The message is: ', rows[i].message);
  }
  console.log(rows)
});


// dbConnection.end();


