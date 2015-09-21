'use strict';

var browserify = require('browserify');
var stream = require('stream');
var test = require('tap').test;

test('custom', function(t) {
  t.plan(3);

  process.env.NODE_ENV = 'development';
  var custom = require('../custom');

  var source = stream.PassThrough();

  var b = browserify(source);
  b.transform(custom({NODE_ENV: 'production'}));

  b.bundle(function(err, src) {
    t.notOk(err);
    t.match(String(src), /"production"/);
    t.notMatch(String(src), /"development"/);
  });

  source.write('process.env.NODE_ENV;');
  source.end();
});
