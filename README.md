# loose-envify

Fast (and loose) `process.env` replacement using [js-tokens](https://github.com/lydell/js-tokens) instead of an AST.

## Gotchas

* Doesn't handle broken syntax.
* Doesn't look inside embedded expressions in template strings.

## Options

## Usage

## benchmark

```js
envify:

  $ for i in {1..5}; do node bench/bench.js 'envify'; done
  708ms
  727ms
  791ms
  719ms
  720ms

loose-envify:

  $ for i in {1..5}; do node bench/bench.js '../'; done
  51ms
  52ms
  52ms
  52ms
  52ms
```
