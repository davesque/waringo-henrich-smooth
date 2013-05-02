/*globals describe, it, expect*/

describe("pointToPointDistance", function() {
  var pointToPointDistance = window.pointToPointDistance;

  it("should find the correct distance when p1 == p2", function() {
    expect(pointToPointDistance(
      {x: 0, y: 0},
      {x: 0, y: 0}
    )).toEqual(0);
    expect(pointToPointDistance(
      {x: 1, y: 1},
      {x: 1, y: 1}
    )).toEqual(0);
  });

  it("should find the correct distance when the line slope is infinity", function() {
    expect(pointToPointDistance(
      {x: 0, y: 0},
      {x: 0, y: 10}
    )).toEqual(10);
    expect(pointToPointDistance(
      {x: 123, y: 0},
      {x: 123, y: -10}
    )).toEqual(10);
  });

  it("should find the correct distance when the line slope is 0", function() {
    expect(pointToPointDistance(
      {x: 0, y: 0},
      {x: 10, y: 0}
    )).toEqual(10);
    expect(pointToPointDistance(
      {x: 0, y: -10},
      {x: 1000, y: -10}
    )).toEqual(1000);
  });

  it("should find the correct distance in a normal case (when the above special criteria do not apply)", function() {
    expect(pointToPointDistance(
      {x: 0, y: 0},
      {x: 10, y: 10}
    )).toBeCloseTo(14.1421, 4);
    expect(pointToPointDistance(
      {x: 10, y: -5},
      {x: -10, y: 5}
    )).toBeCloseTo(22.3607, 4);
  });
});
