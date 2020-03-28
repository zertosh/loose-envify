'use strict';

var jsTokens = require('js-tokens');

var processEnvRe = /\bprocess\.env\.[_$a-zA-Z][$\w]+\b/;

var spaceOrComment = new Set([
  "MultiLineComment",
  "SingleLineComment",
  "LineTerminatorSequence",
  "WhiteSpace",
]);

function replace(src, envs) {
  if (!processEnvRe.test(src)) {
    return src;
  }

  var out = [];
  var purge = envs.some(function(env) {
    return env._ && env._.indexOf('purge') !== -1;
  });

  var parts = Array.from(jsTokens(src));

  for (var i = 0; i < parts.length; i++) {
    if (i + 4 < parts.length &&
        parts[i    ].value === 'process' &&
        parts[i + 1].value === '.' &&
        parts[i + 2].value === 'env' &&
        parts[i + 3].value === '.') {
      var prevCodeToken = getAdjacentCodeToken(-1, parts, i);
      var nextCodeToken = getAdjacentCodeToken(1, parts, i + 4);
      var replacement = getReplacementString(envs, parts[i + 4].value, purge);
      if (prevCodeToken !== '.' &&
          nextCodeToken !== '.' &&
          nextCodeToken !== '=' &&
          typeof replacement === 'string') {
        out.push(replacement);
        i += 4;
        continue;
      }
    }
    out.push(parts[i].value);
  }

  return out.join('');
}

function getAdjacentCodeToken(dir, parts, i) {
  while (true) {
    var part = parts[i += dir];
    if (part === undefined) {
      return undefined;
    }
    if (!spaceOrComment.has(part.type)) {
      return part.value;
    }
  }
}

function getReplacementString(envs, name, purge) {
  for (var j = 0; j < envs.length; j++) {
    var env = envs[j];
    if (typeof env[name] !== 'undefined') {
      return JSON.stringify(env[name]);
    }
  }
  if (purge) {
    return 'undefined';
  }
}

module.exports = replace;
