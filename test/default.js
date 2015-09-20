'use strict';

var browserify = require('browserify');
var test = require('tap').test;

test('default', function(t) {
  t.plan(3);

  process.env.NODE_ENV = 'production';
  var LooseEnvify = require('../default');
  process.env.NODE_ENV = 'development';

  var b = browserify({
    entries: [__dirname + '/react/react-with-addons-with-node_env.js']
  });
  b.transform(LooseEnvify);

  b.bundle(function(err, src) {
    t.notOk(err);
    t.match(String(src), /"production"/);
    t.notMatch(String(src), /"development"/);
  });
});
