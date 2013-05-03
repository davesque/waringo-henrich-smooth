/*globals describe, it, expect, _*/

describe("rootMeanSquare", function() {
  var rootMeanSquare = window.rootMeanSquare;

  it("should return the root mean square of values in a list", function() {
    expect(rootMeanSquare([1, 2, 3, 4, 5])).toBeCloseTo(3.3166, 4);
    expect(rootMeanSquare([10, 20, 30, 40, 50])).toBeCloseTo(33.1662, 4);
    expect(rootMeanSquare([-10, -20, 30, 40, 50])).toBeCloseTo(33.1662, 4);
  });

  it("should work for single value lists", function() {
    expect(rootMeanSquare([1])).toEqual(1);
    expect(rootMeanSquare([12345])).toEqual(12345);
    expect(rootMeanSquare([-12345])).toEqual(12345);
  });

  it("should return NaN for an empty list", function() {
    expect(_.isNaN(rootMeanSquare([]))).toBe(true);
  });
});
