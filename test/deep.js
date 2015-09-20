'use strict';

var browserify = require('browserify');
var test = require('tap').test;
var LooseEnvify = require('../');

test('deep', function(t) {
  t.plan(2);

  var b = browserify({
    entries: [__dirname + '/deep/main.js'],
    detectGlobals: false
  });
  b.transform(LooseEnvify, {env: {NODE_ENV: 'development'}});

  b.bundle(function(err, src) {
    t.notOk(err);
    t.notMatch(String(src), /"development"/);
  });
});
