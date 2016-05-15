'use strict';

var child_process = require('child_process');
var test = require('tap').test;

test('cli', function(t) {
  t.plan(5);

  var res = [];

  var ps = child_process.spawn(
    require.resolve('../cli.js'),
    [require.resolve('./react/react-with-addons-with-node_env.js')]
  );
  var out = '';
  var err = '';
  ps.stdout.on('data', function(buf) { out += buf; });
  ps.stderr.on('data', function(buf) { err += buf; });

  ps.on('close', function() {
    t.equal(err, '');
    t.ok(out);
    res.push(out);
    if (res.length === 2) done();
  });

  var envifyps = child_process.spawn(
    require.resolve('.bin/envify'),
    [require.resolve('./react/react-with-addons-with-node_env.js')]
  );
  var envifyout = '';
  var envifyerr = '';
  envifyps.stdout.on('data', function(buf) { envifyout += buf; });
  envifyps.stderr.on('data', function(buf) { envifyerr += buf; });

  envifyps.on('close', function() {
    t.equal(envifyerr, '');
    t.ok(envifyout);
    res.push(envifyout);
    if (res.length === 2) done();
  });

  function done() {
    t.same(res[0], res[1]);
  }
});
