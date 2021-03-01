// Definitions

const express = require("express"); // Used to activate the NodeJs express application libraries
const getPort = require("get-port"); // Used to listen for an empty random port
const fs = require("fs"); // Used to access the immediate filesystem of an application.
const { v4: uuidv4 } = require('uuid'); // Used to generate a unique random ID
// Insert error lib here
const { console } = require("console") // Console Library
const app = express(); // Create an express application
const REQ_LOGGING = false; // Request Logging is set to false by default

// uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a' 

(async () => { // Main Function
  // https://www.w3schools.com/js/js_strict.asp
  
 "use strict"; // Prevents program from using uninitialized and undeclared variables
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

  if (REQ_LOGGING) {
    // https://expressjs.com/en/guide/using-middleware.html#middleware.application
    
	    app.use((req, res, next) => { // res (response variable) is never used in this scope
      console.log(req.url); // Logs the response URL to the console
      next();
    })
}
  // https://expressjs.com/en/starter/static-files.html
  
  app.use("/", express.static("public")); // Set serverdir to rootdir and create an HTTP server that serves static files
  app.use((req, res, next) => { // req and res are never used in this scope
      next(new ApiException(errors.com.epicgames.common.not_found)); // IDK
  });

  // https://github.com/sindresorhus/get-port/
  // https://www.npmjs.com/package/get-port

  const port = await getPort(); // Dynamically fetches a random port
  app.listen(port, () => {
      console.log("")
  })
	
});
