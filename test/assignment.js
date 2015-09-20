'use strict';

var browserify = require('browserify');
var test = require('tap').test;
var LooseEnvify = require('../');

test('assignment', function(t) {
  t.plan(2);

  var b = browserify({
    entries: [__dirname + '/assignment/main.js'],
    detectGlobals: false
  });
  b.transform(LooseEnvify, {env: {NODE_ENV: 'development'}});

  b.bundle(function(err, src) {
    t.notOk(err);
    t.match(String(src), /\bprocess\.env\.NODE_ENV\s+=\s+"production";/);
  });
});
