var express = require('express');
var server = express();
server.use(express.static(__dirname));
console.log("Server listening on port");
server.listen(8000);
