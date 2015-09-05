'use strict';

var LooseEnvify = require('./loose-envify');

var env = {};
for (var key in process.env) {
  if (process.env.hasOwnProperty(key)) {
    env[key] = process.env[key];
  }
}

module.exports = LooseEnvify.configure({env: env});
