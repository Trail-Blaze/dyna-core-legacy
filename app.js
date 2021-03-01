// Definitions

const express = require("express"); // Used to activate the NodeJs express application libraries
const net = require("net"); // Used to listen for an empty random port
const fs = require("fs"); // Used to access the immediate filesystem of an application.
const { v4: uuidv4 } = require('uuid'); // Used to generate a unique random ID
// Insert error lib here
const { console } = require("console") // Console Library
const app = express(); // Create an express application

// uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a' 

var srv = net.createServer(function(sock) {
  sock.end('Hello world\n');
});
srv.listen(0, function() {
  console.log('Listening on port ' + srv.address().port);
});
(function () { // Main Function
 "use strict"; // Prevents program from using uninitialized and undeclared variables
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  
  
}());
