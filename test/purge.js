'use strict';

var browserify = require('browserify');
var looseEnvify = require('../');
var stream = require('stream');
var test = require('tap').test;

test('purge', function(t) {
  t.plan(3);

  var source = stream.PassThrough();

  var b = browserify({
    entries: source
  });
  b.transform(looseEnvify, {_:'purge'});

  b.bundle(function(err, src) {
    t.notOk(err);
    t.notMatch(String(src), /\bprocess\.env\.NON_EXISTING_VAR\b/);
    t.match(String(src), /module\.exports = undefined;/);
  });

  source.write('module.exports = process.env.NON_EXISTING_VAR;');
  source.end();
});
