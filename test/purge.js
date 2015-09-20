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
    t.notOk(err);
    t.notMatch(String(src), /\bprocess\.env\.NODE_ENV\b/);
    t.match(String(src), /module\.exports = undefined;/);
  });
});
