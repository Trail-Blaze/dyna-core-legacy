/*
App.js - This script creates a static server, hosts files from the "public" directory and
finds and empty port to listen on
Copyright (C) 2021  Immanuel Garcia, Luke Harris, Sydney
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses/old-licenses/gpl-2.0.html.
*/

// Imports

const express = require("express"); // Used to activate the NodeJs express application libraries
const getPort = require("get-port"); // Used to listen for an empty random port
const fs = require("fs"); // Used to access the immediate filesystem of an application.
const { v4: uuidv4 } = require("uuid"); // Used to generate a unique random ID
// Insert error lib here
const console = require("console"); // Console Library
const { exec } = require("child_process"); // Shell execution library
const app = express(); // Create an express application

// Definitions

const REQ_LOGGING = false; // Request Logging is set to false by default
const version = "1.0";
const cyear = 2021;
const authors = "Immanuel Garcia, Luke Harris, Sydney";

// uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

// https://www.w3schools.com/js/js_strict.asp
("use strict"); // Prevents program from using uninitialized and undeclared variables
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("etag", false);

if (REQ_LOGGING) {
  // https://expressjs.com/en/guide/using-middleware.html#middleware.application

  app.use((req, res, next) => {
    // res (response variable) is never used in this scope
    console.log(req.url); // Logs the response URL to the console
    next();
  });
}
// https://expressjs.com/en/starter/static-files.html

app.use("/", express.static("public")); // Set serverdir to rootdir and create an HTTP server that serves static files

app.use((req, res, next) => {
  // req and res are never used in this scope
  next(new ApiException(errors.com.epicgames.common.not_found)); // IDK
});

// https://github.com/sindresorhus/get-port/
// https://www.npmjs.com/package/get-port

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

init();

async function init() {
  const port = await getPort(); // Dynamically fetches a random getPort
  app.listen(port, () => {
    exec("cls");
    console.log(
      `Blaze version ${version}, Copyright (C) ${cyear} ${authors}\nBlaze comes with ABSOLUTELY NO WARRANTY. This is free software, and you are welcome to redistribute it under certain conditions. For more information, please refer to the bundled LICENCE file.`
    );
    console.log("\n");
    console.log(
      `Blaze has successfully initialized and is listening on port ${port}.`
    );
    console.log("To exit, hit CTRL + C at any time.");
  });
}
module.exports = app;
