/*jshint es5: true*/
/*globals describe, it, expect*/

describe("findNeighborhood", function() {
  var COORDS1 = [
    {x: 0, y: 0, remove: true},  // 0
    {x: 0, y: 0, remove: true},  // 1
    {x: 0, y: 0, remove: false}, // 2
    {x: 0, y: 0, remove: true},  // 3
    {x: 0, y: 0, remove: false}, // 4
    {x: 0, y: 0, remove: false}, // 5
    {x: 0, y: 0, remove: true},  // 6
  ];

  var COORDS2 = [
    {x: 0, y: 0, remove: true},  // 0
    {x: 0, y: 0, remove: true},  // 1
    {x: 0, y: 0, remove: false}, // 2
    {x: 0, y: 0, remove: true},  // 3
    {x: 0, y: 0, remove: true},  // 4
    {x: 0, y: 0, remove: false}, // 5
    {x: 0, y: 0, remove: true},  // 6
    {x: 0, y: 0, remove: false}, // 7
    {x: 0, y: 0, remove: false}, // 8
    {x: 0, y: 0, remove: true},  // 9
    {x: 0, y: 0, remove: false}, // 10
    {x: 0, y: 0, remove: true},  // 11
    {x: 0, y: 0, remove: true},  // 12
  ];

  var findNeighborhood = window.findNeighborhood;

  it("should find the indexes of the closest points on the left and right which will not be removed", function() {
    expect(findNeighborhood(COORDS1, 3)).toEqual([2, 4]);
    expect(findNeighborhood(COORDS1, 4)).toEqual([2, 5]);
    expect(findNeighborhood(COORDS2, 5)).toEqual([2, 7]);
    expect(findNeighborhood(COORDS2, 8)).toEqual([7, 10]);
  });

  it("should return -1 as the right index if no valid point on the right is found", function() {
    expect(findNeighborhood(COORDS1, 5)).toEqual([4, -1]);
    expect(findNeighborhood(COORDS2, 10)).toEqual([8, -1]);
  });

  it("should return -1 as the left index if no valid point on the left is found", function() {
    expect(findNeighborhood(COORDS1, 1)).toEqual([-1, 2]);
    expect(findNeighborhood(COORDS2, 2)).toEqual([-1, 5]);
  });

  it("should return -1 as the right index if the given index refers to the last point", function() {
    expect(findNeighborhood(COORDS1, 6)).toEqual([5, -1]);
    expect(findNeighborhood(COORDS2, 12)).toEqual([10, -1]);
  });

  it("should return -1 as the left index if the given index refers to the first point", function() {
    expect(findNeighborhood(COORDS1, 0)).toEqual([-1, 2]);
    expect(findNeighborhood(COORDS2, 0)).toEqual([-1, 2]);
  });

  it("should return -1 for both the left and right index if the given array is empty", function() {
    expect(findNeighborhood([], 0)).toEqual([-1, -1]);
    expect(findNeighborhood([], 100)).toEqual([-1, -1]);
  });

  it("should return -1 for both the left and right index if the given array has a length of 1", function() {
    expect(findNeighborhood([{x: 0, y: 0, remove: false}], 0)).toEqual([-1, -1]);
    expect(findNeighborhood([{x: 0, y: 0, remove: false}], 100)).toEqual([-1, -1]);
  });
});
