var app, connect, http, serveStatic;

connect = require('connect');

http = require('http');

serveStatic = require('serve-static');

app = connect().use(serveStatic('app')).use('/js/lib/', serveStatic('node_modules/requirejs/')).use('/node_modules', serveStatic('node_modules')).use('/test', serveStatic('test')).use('/test', serveStatic('app'));

http.createServer(app).listen(8080, function() {
  console.log('Runing on http://localhost:8080');
});
