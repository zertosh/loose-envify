'use strict';

var test = require('tap').test;
var fs = require('fs');
var LooseEnvify = require('../');

test('replace invariant', function(t) {
  t.plan(1);

  var file = __dirname + '/pkg/node_modules/invariant/index.js';
  var src = fs.readFileSync(file, 'utf8');

  var env = {NODE_ENV: 'development'};
  var actual = LooseEnvify.replace(src, {env: env});
  var expected = src.replace('process.env.NODE_ENV', '"development"')

  t.equal(actual, expected);
});

test('replace warning', function(t) {
  t.plan(1);

  var file = __dirname + '/pkg/node_modules/warning/index.js';
  var src = fs.readFileSync(file, 'utf8');

  var env = {NODE_ENV: 'development'};
  var actual = LooseEnvify.replace(src, {env: env});
  var expected = src.replace('process.env.NODE_ENV', '"development"')

  t.equal(actual, expected);
});
