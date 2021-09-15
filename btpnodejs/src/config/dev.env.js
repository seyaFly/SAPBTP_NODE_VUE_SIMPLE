"use strict"

var env = process.env.NODE_ENV;

console.log(process.env);

var evnPort = process.env.PORT;

if (env === "local") {
    evnPort = 3000;
}