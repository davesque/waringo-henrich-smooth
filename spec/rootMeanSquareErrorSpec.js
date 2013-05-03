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

  it("should return the root mean square of deviations within a certain point range", function() {
    expect(rootMeanSquareError(POINTS1, 0, 2)).toEqual(5);
    expect(rootMeanSquareError(POINTS1, 0, 3)).toEqual(5);
  });
});
