/*jshint es5: true*/
/*globals describe, it, expect*/

describe("waringoHenrichSmooth", function() {
  var waringoHenrichSmooth = window.waringoHenrichSmooth;

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
    {x: 0,  y: 0, i: 0},
    {x: 5,  y: 6, i: 1},
    {x: 10, y: 10, i: 2},
    {x: 9, y: 132, i: 3},
    {x: 20, y: 155, i: 4},
    {x: 25, y: 120, i: 5},
    {x: 30, y: 10, i: 6}
  ];

  it("should be true", function() {
    expect(true).toEqual(true);
  });
});
