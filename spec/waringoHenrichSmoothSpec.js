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

  var findNeighborhood = window.findNeighborhood;

  it("should find the indexes of the closest points on the left and right which will not be removed", function() {
    expect(findNeighborhood(COORDS1, 4)).toEqual([2, 5]);
  });

  it("should return the given index as the right index if no valid point on the right is found", function() {
    expect(findNeighborhood(COORDS1, 5)).toEqual([4, 5]);
  });

  it("should return the given index as the left index if no valid point on the left is found", function() {
    expect(findNeighborhood(COORDS1, 1)).toEqual([1, 2]);
  });

  it("should return the given index as the right index if the given index refers to the last point", function() {
    expect(findNeighborhood(COORDS1, 6)).toEqual([5, 6]);
  });

  it("should return the given index as the left index if the given index refers to the first point", function() {
    expect(findNeighborhood(COORDS1, 0)).toEqual([0, 2]);
  });
});
