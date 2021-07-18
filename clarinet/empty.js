var clarinet   = require('./clarinet')
  , p
  ;

p          = clarinet.parser();

process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(chunk) { 
  p.write(chunk); 
});
process.stdin.on('end', function () {
  p.end(); 
  process.exit();
});