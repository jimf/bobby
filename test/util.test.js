/* eslint-env jest */
var subject = require('../src/util')

describe('util', function () {
  describe('K', function () {
    test('returns a function that returns a constant value', function () {
      expect(subject.K('dummy value a')('dummy value b')).toBe('dummy value a')
    })
  })

  describe('assign', function () {
    test('should mimic Object.assign', function () {
      var target = {}
      var actual = subject.assign(
        target,
        { foo: 1 },
        null,
        undefined,
        { bar: 2 },
        { bar: 3, baz: 4 }
      )
      expect(actual).toEqual({ foo: 1, bar: 3, baz: 4 })
      expect(target).toEqual(actual)
    })
  })

  describe('chunksOf', function () {
    test('should split array into n-sized chunks', function () {
      var cases = [
        { input: [2, []], expected: [] },
        { input: [2, [1, 2, 3, 4, 5]], expected: [[1, 2], [3, 4], [5]] },
        { input: [3, [1, 2, 3, 4, 5, 6]], expected: [[1, 2, 3], [4, 5, 6]] }
      ]
      cases.forEach(function (testcase) {
        expect(subject.chunksOf.apply(null, testcase.input)).toEqual(testcase.expected)
      })
    })
  })

  describe('times', function () {
    test('returns empty array when n is 0', function () {
      expect(subject.times(0, subject.K(true))).toEqual([])
    })

    test('returns array of length n with the results of applying given function', function () {
      expect(subject.times(3, subject.K(true))).toEqual([true, true, true])
    })
  })
})
