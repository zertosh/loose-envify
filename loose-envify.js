'use strict';

var jsTokens = require('js-tokens');
var stream = require('stream');
var util = require('util');

var jsonExtRe = /\.json$/;
var processEnvRe = /\bprocess\.env\.[_$a-zA-Z][$\w]+\b/;

module.exports = LooseEnvify;
util.inherits(LooseEnvify, stream.Transform);

function LooseEnvify(file, opts) {
  if (!(this instanceof LooseEnvify)) {
    return new LooseEnvify.configure(opts)(file);
  }
  stream.Transform.call(this);
  this._data = '';
  this._opts = opts;
}

LooseEnvify.prototype._transform = function(buf, enc, cb) {
  this._data += buf;
  cb();
};

LooseEnvify.prototype._flush = function(cb) {
  var replaced = LooseEnvify.replace(this._data, this._opts);
  this.push(replaced);
  cb();
};

LooseEnvify.configure = function(opts) {
  return function (file) {
    if (jsonExtRe.test(file)) {
      return stream.PassThrough();
    }
    return new LooseEnvify(file, opts);
  };
};

LooseEnvify.replace = function(src, opts) {
  if (!processEnvRe.test(src)) {
    return src;
  }

  var purge = opts && opts.purge;
  var env = opts && opts.env || process.env;
  var out = '';

  jsTokens.lastIndex = 0
  var parts = src.match(jsTokens);

  for (var i = 0; i < parts.length; i++) {
    if (parts[i    ] === 'process' &&
        parts[i + 1] === '.' &&
        parts[i + 2] === 'env' &&
        parts[i + 3] === '.') {
      if (typeof env[parts[i + 4]] !== 'undefined') {
        out += JSON.stringify(env[parts[i + 4]]);
        i += 4;
        continue;
      } else if (purge) {
        out += 'undefined';
        i += 4;
        continue;
      }
    }
    out += parts[i];
  }

  return out;
};
