/*globals describe, it, expect*/

describe("findNeighborhood", function() {
  var COORDS1 = [
    {x: 0, y: 0, i: 0, r: true},
    {x: 0, y: 0, i: 1, r: true},
    {x: 0, y: 0, i: 2, r: false},
    {x: 0, y: 0, i: 3, r: true},
    {x: 0, y: 0, i: 4, r: false},
    {x: 0, y: 0, i: 5, r: false},
    {x: 0, y: 0, i: 6, r: true}
  ];

  var COORDS2 = [
    {x: 0, y: 0, i: 0,  r: true},
    {x: 0, y: 0, i: 1,  r: true},
    {x: 0, y: 0, i: 2,  r: false},
    {x: 0, y: 0, i: 3,  r: true},
    {x: 0, y: 0, i: 4,  r: true},
    {x: 0, y: 0, i: 5,  r: false},
    {x: 0, y: 0, i: 6,  r: true},
    {x: 0, y: 0, i: 7,  r: false},
    {x: 0, y: 0, i: 8,  r: false},
    {x: 0, y: 0, i: 9,  r: true},
    {x: 0, y: 0, i: 10, r: false},
    {x: 0, y: 0, i: 11, r: true},
    {x: 0, y: 0, i: 12, r: true}
  ];

  var findNeighborhood = window.findNeighborhood;

  it("should accept a point object -or- a number for the argument `p`", function() {
    expect(findNeighborhood(COORDS1, 3)).toEqual([2, 4]);
    expect(findNeighborhood(COORDS1, COORDS1[3])).toEqual([2, 4]);
    expect(findNeighborhood(COORDS1, 4)).toEqual([2, 5]);
    expect(findNeighborhood(COORDS1, COORDS1[4])).toEqual([2, 5]);
    expect(findNeighborhood(COORDS2, 5)).toEqual([2, 7]);
    expect(findNeighborhood(COORDS2, COORDS2[5])).toEqual([2, 7]);
    expect(findNeighborhood(COORDS2, 8)).toEqual([7, 10]);
    expect(findNeighborhood(COORDS2, COORDS2[8])).toEqual([7, 10]);
  });

  it("should find the indexes of the closest points on the left and right which will not be removed", function() {
    expect(findNeighborhood(COORDS1, 3)).toEqual([2, 4]);
    expect(findNeighborhood(COORDS1, COORDS1[3])).toEqual([2, 4]);
    expect(findNeighborhood(COORDS1, 4)).toEqual([2, 5]);
    expect(findNeighborhood(COORDS1, COORDS1[4])).toEqual([2, 5]);
    expect(findNeighborhood(COORDS2, 5)).toEqual([2, 7]);
    expect(findNeighborhood(COORDS2, COORDS2[5])).toEqual([2, 7]);
    expect(findNeighborhood(COORDS2, 8)).toEqual([7, 10]);
    expect(findNeighborhood(COORDS2, COORDS2[8])).toEqual([7, 10]);
  });

  it("should return -1 as the right index if no valid point on the right is found", function() {
    expect(findNeighborhood(COORDS1, 5)).toEqual([4, -1]);
    expect(findNeighborhood(COORDS1, COORDS1[5])).toEqual([4, -1]);
    expect(findNeighborhood(COORDS2, 10)).toEqual([8, -1]);
    expect(findNeighborhood(COORDS2, COORDS2[10])).toEqual([8, -1]);
  });

  it("should return -1 as the left index if no valid point on the left is found", function() {
    expect(findNeighborhood(COORDS1, 1)).toEqual([-1, 2]);
    expect(findNeighborhood(COORDS1, COORDS1[1])).toEqual([-1, 2]);
    expect(findNeighborhood(COORDS2, 2)).toEqual([-1, 5]);
    expect(findNeighborhood(COORDS2, COORDS2[2])).toEqual([-1, 5]);
  });

  it("should return -1 as the right index if the given index refers to the last point", function() {
    expect(findNeighborhood(COORDS1, 6)).toEqual([5, -1]);
    expect(findNeighborhood(COORDS1, COORDS1[6])).toEqual([5, -1]);
    expect(findNeighborhood(COORDS2, 12)).toEqual([10, -1]);
    expect(findNeighborhood(COORDS2, COORDS2[12])).toEqual([10, -1]);
  });

  it("should return -1 as the left index if the given index refers to the first point", function() {
    expect(findNeighborhood(COORDS1, 0)).toEqual([-1, 2]);
    expect(findNeighborhood(COORDS1, COORDS1[0])).toEqual([-1, 2]);
    expect(findNeighborhood(COORDS2, 0)).toEqual([-1, 2]);
    expect(findNeighborhood(COORDS2, COORDS2[0])).toEqual([-1, 2]);
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
