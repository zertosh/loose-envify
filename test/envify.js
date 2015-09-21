'use strict';

var browserify = require('browserify');
var envify = require('envify');
var looseEnvify = require('../');
var test = require('tap').test;

test('envify', function(t) {
  t.plan(3);

  var res = [];

  browserify({
      entries: [__dirname + '/react/react-with-addons-with-node_env.js']
    })
    .transform(looseEnvify)
    .bundle(function(err, src) {
      t.notOk(err);
      if (res.push(src) === 2) done();
    });

  browserify({
      entries: [__dirname + '/react/react-with-addons-with-node_env.js']
    })
    .transform(envify)
    .bundle(function(err, src) {
      t.notOk(err);
      if (res.push(src) === 2) done();
    });

  function done() {
    t.same(res[0], res[1]);
  }
});
