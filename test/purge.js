'use strict';

var browserify = require('browserify');
var test = require('tap').test;
var LooseEnvify = require('../');

test('purge', function(t) {
  t.plan(3);

  var b = browserify({
    entries: [__dirname + '/purge/main.js']
  });
  b.transform(LooseEnvify, {env: {}, purge: true});

  b.bundle(function(err, src) {
    src = src.toString();
    t.notOk(err);
    t.notMatch(src, /\bprocess\.env\.NODE_ENV\b/);
    t.match(src, /module\.exports = undefined;/);
  });
});
