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
const errors = require("./structs/errors");
const { ApiException } = errors;
const console = require("console"); // Console Library
const { exec } = require("child_process"); // Shell execution library
const app = express(); // Create an express application
// Definitions

const REQ_LOGGING = true; // Request Logging is set to false by default
const version = "1.30.5";
const cyear = 2021;
const authors = "Immanuel Garcia, Luke Harris, Sydney";
const windowTitle = "Blaze Server";

// Imported and converted from a Python Project

const bcolor = {
  HEADER: "\033[95m",
  OKBLUE: "\033[94m",
  OKCYAN: "\033[96m",
  OKGREEN: "\033[92m",
  WARN: "\033[93m",
  FAIL: "\033[91m",
  END: "\033[0m",
  BOLD: "\033[1m",
  UNDERLINE: "\033[4m",
};

// A sleep function I found somewhere just in case

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// Main application starts here!

exec(`title ${windowTitle} version ${version}`); // Sets the window title to Blaze Server

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
    console.log(`${bcolor.OKGREEN}[GET]${bcolor.END}`, req.url); // Logs the response URL to the console
    next();
  });
}
// https://expressjs.com/en/starter/static-files.html

app.use("/", express.static("public")); // Set serverdir to rootdir and create an HTTP server that serves static files

app.use((req, res, next) => {
  // req and res are never used in this scope
  next(new ApiException(errors.com.epicgames.common.not_found)); // IDK
});

init();

async function init() {
  await sleep(1500); // Display main title for a bit then go onto the main stuffs

  // https://github.com/sindresorhus/get-port/
  // https://www.npmjs.com/package/get-port

  const port = await getPort({ port: [80, 5595, 8080] }); // Dynamically fetches a random getPort
  app.listen(port, () => {
    console.clear();
    console.log(`
< Theoretical Ascii logo goes here >
    `);
    exec(`title ${windowTitle} is listening on localhost port ${port}`); // Switch title to Blaze Server is listening on port {port}.

    // Saves Port Number To File
    // https://www.w3schools.com/nodejs/nodejs_filesystem.asp

    const filename_log = "port";

    // Creates File if Not Found
    // https://flaviocopes.com/how-to-check-if-file-exists-node/

    fs.access(filename_log, fs.F_OK, (err) => {
      if (err) {
        // console.error(err); // For debugging purposes

        console.log(
          `${bcolor.OKBLUE}[INFO]${bcolor.END}`,
          `File ${filename_log} Not Found! Is this a first-time run?`
        );
        console.log(
          `${bcolor.OKBLUE}[INFO]${bcolor.END}`,
          `File ${filename_log} Creating one...`
        );

        createPortfile();

        return 0;
      } // Deletes File if Found
      fs.unlink(`${filename_log}`, function (err) {
        if (err) throw err;
        console.log(
          `${bcolor.OKBLUE}[INFO]${bcolor.END}`,
          `File ${filename_log} found. Deleting...\n`
        );
      });

      createPortfile();

      function createPortfile() {
        // Recreates File With Correct Port Number

        fs.writeFile(`${filename_log}`, `${port}`, function (err) {
          if (err) throw err;
          console.log(
            `${bcolor.OKBLUE}[INFO]${bcolor.END}`,
            `Saved Port Number to ${filename_log}\n`
          );
        });
      }
    });

    console.log("\n");
    console.log(
      `${bcolor.OKGREEN}Blaze version ${version}, Copyright (C) ${cyear} ${authors}\nBlaze comes with ABSOLUTELY NO WARRANTY.\nThis is free software, and you are welcome to redistribute it under certain conditions.\nFor more information, please refer to the bundled LICENSE file.${bcolor.END}`
    );
    console.log("\n");
    console.log(
      `${bcolor.HEADER}Blaze has successfully initialized and is listening on port ${port}.${bcolor.END}`
    );
    console.log(
      `${bcolor.HEADER}To exit, hit CTRL + C at any time.${bcolor.END}\n`
    );

    // Run Color Tests
    /*
    
    console.log(`${bcolor.HEADER}HEADER${bcolor.END}`);
    console.log(`${bcolor.OKBLUE}OKBLUE${bcolor.END}`);
    console.log(`${bcolor.OKCYAN}OKCYAN${bcolor.END}`);
    console.log(`${bcolor.OKGREEN}OKGREEN${bcolor.END}`);
    console.log(`${bcolor.WARN}WARN${bcolor.END}`);
    console.log(`${bcolor.FAIL}FAIL${bcolor.END}`);
    console.log(`${bcolor.BOLD}BOLD${bcolor.END}`);
    console.log(`${bcolor.UNDERLINE}UNDERLINE${bcolor.END}`);
    */
  });
}
module.exports = app;
