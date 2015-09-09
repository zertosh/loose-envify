var transform = require(process.argv[2]);

var fs = require('fs')
var start = Date.now();
var str = '';

fs.createReadStream('test/react/react-with-addons-with-node_env.js')
  .pipe(transform())
  .on('data', function(buf) { str += str; })
  .on('end', function() {
    console.log('%sms', Date.now() - start);
  });
