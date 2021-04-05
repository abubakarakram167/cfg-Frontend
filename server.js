var express = require('express');
var app = express();
var port = process.env.PORT || process.argv[2] || 80;
app.use('/', express.static(__dirname + '/src'));
var server = app.listen(port, function () {
  console.log('listening on port:', port);
});
//# sourceMappingURL=server.js.map
