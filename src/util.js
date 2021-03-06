/**
 * K combinator.
 *
 * a -> b -> a
 */
exports.K = function (x) {
  return function (_) {
    return x
  }
}

/**
 * Object.assign ponyfill. Shallow-copy attributes from sources into target.
 */
exports.assign = function () {
  var args = Array.prototype.slice.call(arguments)
  return args.slice(1).reduce(function (acc, source) {
    if (source == null) { return acc }
    Object.keys(source).forEach(function (key) {
      acc[key] = source[key]
    })
    return acc
  }, args[0])
}

/**
 * Split up an array into an array of arrays of n length.
 *
 * @param {number} n Size of chunks
 * @param {*[]} xs Array to split
 * @return {*[][]}
 */
exports.chunksOf = function chunksOf (n, xs) {
  var result = []
  for (var i = 0; i < xs.length; i += 1) {
    if (i % n === 0) { result.push([]) }
    result[result.length - 1].push(xs[i])
  }
  return result
}

/**
 * Find the first item in an array of items that matches all of the key/value
 * pairs listed in props.
 *
 * @param {*[]} xs Array of items
 * @param {object} props Key/value pairs to compare with
 * @return {*}
 */
exports.findWhere = function findWhere (xs, props) {
  var item
  var match
  for (var i = 0, len = xs.length; i < len; i += 1) {
    item = xs[i]
    match = Object.keys(props).every(function (key) {
      return item && item[key] === props[key]
    })
    if (match) { return item }
  }
}

/**
 * Run a function n times, returning an array of the return values.
 *
 * @param {number} n Number of times to run function
 * @param {function} fn Function to call
 * @return {*[]}
 */
exports.times = function times (n, fn) {
  var result = []
  for (var i = 0; i < n; i += 1) {
    result.push(fn())
  }
  return result
}
