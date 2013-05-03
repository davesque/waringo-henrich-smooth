/*globals describe, it, expect*/

describe("pointToLineDistance", function() {
  var pointToLineDistance = window.pointToLineDistance;

  it("should find the correct distance when the line slope is infinity", function() {
    expect(pointToLineDistance(
      {x: 0, y: 0},
      {x: 5, y: -100},
      {x: 0, y: 10}
    )).toEqual(5);
    expect(pointToLineDistance(
      {x: -20, y: -2000},
      {x: 5, y: 0},
      {x: -20, y: 10}
    )).toEqual(25);
  });

  it("should find the correct distance when the line slope is 0", function() {
    expect(pointToLineDistance(
      {x: 0, y: 0},
      {x: 5, y: 1000},
      {x: 10, y: 0}
    )).toEqual(1000);
    expect(pointToLineDistance(
      {x: 0, y: -20},
      {x: 5, y: 1000},
      {x: -20, y: -20}
    )).toEqual(1020);
  });

  it("should return the correct distance when the line has length 0 (point to point distance)", function() {
    expect(pointToLineDistance(
      {x: 0, y: 0},
      {x: 5, y: 0},
      {x: 0, y: 0}
    )).toEqual(5);
    expect(pointToLineDistance(
      {x: -10, y: -10},
      {x: 10, y: 10},
      {x: -10, y: -10}
    )).toEqual(Math.sqrt(20 * 20 + 20 * 20));
  });

  it("should return the correct distance when p1 == p2 == p3", function() {
    expect(pointToLineDistance(
      {x: 0, y: 0},
      {x: 0, y: 0},
      {x: 0, y: 0}
    )).toEqual(0);
    expect(pointToLineDistance(
      {x: 1, y: 1},
      {x: 1, y: 1},
      {x: 1, y: 1}
    )).toEqual(0);
    expect(pointToLineDistance(
      {x: -1, y: -1},
      {x: -1, y: -1},
      {x: -1, y: -1}
    )).toEqual(0);
  });

  it("should return the correct distance between a point and a line that do not meet the above special criteria", function() {
    expect(pointToLineDistance(
      {x: 0, y: 0},
      {x: 0, y: 1},
      {x: 1, y: 1}
    )).toBeCloseTo(0.7071, 4);
    expect(pointToLineDistance(
      {x: 0, y: 0},
      {x: 5, y: 1},
      {x: 10, y: 1}
    )).toBeCloseTo(0.4975, 4);
    expect(pointToLineDistance(
      {x: 0, y: 0},
      {x: 5, y: 1},
      {x: 10, y: 1}
    )).toBeCloseTo(0.4975, 4);
    expect(pointToLineDistance(
      {x: 0, y: 0},
      {x: 6, y: 1.1},
      {x: 10, y: 1}
    )).toBeCloseTo(0.4975, 4);
    expect(pointToLineDistance(
      {x: -10, y: 10},
      {x: -4, y: 8},
      {x: -3, y: 5}
    )).toBeCloseTo(1.8600, 4);
  });
});
