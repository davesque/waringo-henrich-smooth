/*globals describe, it, expect*/

describe("findNeighborhood", function() {
  var COORDS = [
    {x: 0, y: 0, remove: true},
    {x: 0, y: 0, remove: true},
    {x: 0, y: 0, remove: false},
    {x: 0, y: 0, remove: true},
    {x: 0, y: 0, remove: false},
    {x: 0, y: 0, remove: false},
    {x: 0, y: 0, remove: true},
  ];

  var findNeighborhood = window.findNeighborhood;

  it("should find the correct neighborhood for a point", function() {
    expect(findNeighborhood(COORDS, 5)).toEqual([2, 5]);
  });
});
