'use strict';

var browserify = require('browserify');
var looseEnvify = require('../');
var stream = require('stream');
var test = require('tap').test;

test('edge-cases: assignment', function(t) {
  t.plan(4);

  var source = stream.PassThrough();

  var b = browserify({
    entries: source,
    detectGlobals: false
  });
  b.transform(looseEnvify, {NODE_ENV: 'development'});

  b.bundle(function(err, src) {
    t.notOk(err);
    t.match(String(src), /\bprocess\.env\.NODE_ENV\s+=\s+"production";/);
    t.match(String(src), /\bprocess\.env\.NODE_ENV\s+=\s+"line-break";/);
    t.match(String(src), /\bprocess\.env\.NODE_ENV\/\*comment\*\/\s+=\s+"comment";/);
  });

  source.write('process.env.NODE_ENV = "production";');
  source.write('process.env.NODE_ENV\n= "line-break";');
  source.write('process.env.NODE_ENV/*comment*/ = "comment";');
  source.end();
});

test('edge-cases: deep properties', function(t) {
  t.plan(2);

  var source = stream.PassThrough();

  var b = browserify({
    entries: source,
    detectGlobals: false
  });
  b.transform(looseEnvify, {NODE_ENV: 'development'});

  b.bundle(function(err, src) {
    t.notOk(err);
    t.notMatch(String(src), /"development"/);
  });

  source.write([
    'var a = global.process.env.NODE_ENV;',
    'var b = process.env.NODE_ENV.MORE_ENV;',
    'var c = global.\nprocess.env.NODE_ENV;',
    'var d = process.env.NODE_ENV\n.MORE_ENV;',
    'var e = global./*comment*/process.env.NODE_ENV;',
    'var f = process.env.NODE_ENV/*comment*/.MORE_ENV;'
  ].join(''));
  source.end();
});
