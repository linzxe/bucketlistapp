var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var app = express();
var router = require("./router");

//middleware
app.use(bodyParser.json({type: '*/*'}));
router(app);

//server
var port = process.env.PORT || 3000;
var server = http.createServer(app);

server.listen(port);
console.log("Server listening on " + port);