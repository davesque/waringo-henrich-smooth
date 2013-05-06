/*globals describe, it, expect, _*/

describe("rootMeanSquareError", function() {
  var rootMeanSquareError = window.rootMeanSquareError;

  var POINTS1 = [
    {x: 0,  y: 0, i: 0},
    {x: 5,  y: 5, i: 1},
    {x: 10, y: 0, i: 2},
    {x: 15, y: 0, i: 3},
    {x: 20, y: 5, i: 4},
    {x: 25, y: 0, i: 5},
    {x: 30, y: 0, i: 6}
  ];

  var POINTS2 = [
    {x: 0,  y: 0,   i: 0},
    {x: 5,  y: 6,   i: 1},
    {x: 10, y: 10,  i: 2},
    {x: 9,  y: 132, i: 3},
    {x: 20, y: 155, i: 4},
    {x: 25, y: 120, i: 5},
    {x: 30, y: 10,  i: 6}
  ];

  it("should return the root mean square of deviations within a certain point range", function() {
    expect(rootMeanSquareError(POINTS1, POINTS1[0], POINTS1[2])).toEqual(5);
    expect(rootMeanSquareError(POINTS1, POINTS1[0], POINTS1[3])).toBeCloseTo(3.5355, 4);
    expect(rootMeanSquareError(POINTS1, POINTS1[0], POINTS1[6])).toBeCloseTo(3.1623, 4);
    expect(rootMeanSquareError(POINTS2, POINTS2[0], POINTS2[6])).toBeCloseTo(95.9779, 4);
  });

  it("should return a correct value even if the start and end points are swapped (they still specify a valid range)", function() {
    expect(rootMeanSquareError(POINTS1, POINTS1[6], POINTS1[0])).toBeCloseTo(3.1623, 4);
    expect(rootMeanSquareError(POINTS2, POINTS2[6], POINTS2[0])).toBeCloseTo(95.9779, 4);
  });

  it("should return NaN for a zero-length range", function() {
    expect(_.isNaN(rootMeanSquareError(POINTS1, POINTS1[0], POINTS1[0]))).toEqual(true);
  });

  it("should return NaN for an empty list", function() {
    expect(_.isNaN(rootMeanSquareError([], null, null))).toEqual(true);
  });
});
