'use strict';

var browserify = require('browserify');
var test = require('tap').test;

test('pkg', function(t) {
  t.plan(4);

  process.env.NODE_ENV = 'development';

  var b = browserify({
    entries: [__dirname + '/pkg/index.js']
  });

  b.bundle(function(err, src) {
    t.notOk(err);
    t.notMatch(String(src), /\bprocess\.env\.NODE_ENV\b/);
    t.match(String(src), /"development"/);

    t.equal(String(src).match(/"development"/g).length, 2);
  });
});
