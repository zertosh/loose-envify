'use strict';

var browserify = require('browserify');
var test = require('tap').test;

test('transform', function(t) {
  t.plan(4);

  process.env.NODE_ENV = 'development';

  var b = browserify({
    entries: [__dirname + '/pkg/index.js']
  });

  b.bundle(function(err, src) {
    src = src.toString();
    t.notOk(err);
    t.notMatch(src, /\bprocess\.env\.NODE_ENV\b/);
    t.match(src, /"development"/);

    t.equal(src.match(/"development"/g).length, 2);
  });
});
