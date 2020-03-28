# loose-envify

[![Build Status](https://travis-ci.org/zertosh/loose-envify.svg?branch=master)](https://travis-ci.org/zertosh/loose-envify)

Selective `process.env` replacer using [js-tokens](https://github.com/lydell/js-tokens) instead of an AST. Works just like [envify](https://github.com/hughsk/envify) but a tiny bit faster.

## Gotchas

* Doesn't report broken syntax.
* Doesn't replace oddly-spaced or oddly-commented expressions.
  - **this won't work:**
  ```js
  console.log(process./*won't*/env./*work*/NODE_ENV);
  ```

## Usage/Options

loose-envify has the exact same interface as [envify](https://github.com/hughsk/envify), including the CLI.

## Benchmark

```
envify:

  $ for i in {1..5}; do node bench/bench.js 'envify'; done
  113ms
  125ms
  112ms
  115ms
  114ms

loose-envify:

  $ for i in {1..5}; do node bench/bench.js '../'; done
  85ms
  90ms
  83ms
  84ms
  81ms
```
