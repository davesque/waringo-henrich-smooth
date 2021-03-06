/*globals describe, it, expect*/

describe("waringoHenrichSmooth", function() {
  var waringoHenrichSmooth = window.waringoHenrichSmooth;

  // Random line
  var POINTS1 = [
    {x: 0, y: 0},
    {x: 62, y: 4},
    {x: 102, y: 44},
    {x: 198, y: 28},
    {x: 214, y: 100},
    {x: 326, y: 76},
    {x: 406, y: 92},
    {x: 438, y: 124},
    {x: 502, y: 76},
    {x: 574, y: 108},
    {x: 638, y: 140}
  ];

  // Road bike handlebar contour:
  // 2014 Specialized Comp Alloy Tarmac Bend 44cm
  var POINTS2 = [
    {x: -34, y: 134},
    {x: -33, y: 134},
    {x: -31, y: 133},
    {x: -30, y: 133},
    {x: -29, y: 133},
    {x: -28, y: 133},
    {x: -27, y: 132},
    {x: -26, y: 132},
    {x: -25, y: 132},
    {x: -24, y: 132},
    {x: -23, y: 132},
    {x: -21, y: 131},
    {x: -20, y: 131},
    {x: -19, y: 131},
    {x: -18, y: 131},
    {x: -17, y: 131},
    {x: -15, y: 130},
    {x: -14, y: 130},
    {x: -13, y: 130},
    {x: -11, y: 130},
    {x: -10, y: 129},
    {x: -9, y: 129},
    {x: -8, y: 129},
    {x: -7, y: 129},
    {x: -5, y: 128},
    {x: -4, y: 128},
    {x: -3, y: 128},
    {x: -2, y: 128},
    {x: 0, y: 128},
    {x: 1, y: 127},
    {x: 3, y: 127},
    {x: 4, y: 126},
    {x: 5, y: 126},
    {x: 6, y: 126},
    {x: 7, y: 126},
    {x: 8, y: 125},
    {x: 9, y: 125},
    {x: 11, y: 125},
    {x: 12, y: 124},
    {x: 14, y: 124},
    {x: 15, y: 123},
    {x: 16, y: 123},
    {x: 17, y: 122},
    {x: 18, y: 122},
    {x: 19, y: 121},
    {x: 21, y: 121},
    {x: 22, y: 120},
    {x: 23, y: 120},
    {x: 24, y: 119},
    {x: 26, y: 118},
    {x: 27, y: 118},
    {x: 28, y: 117},
    {x: 29, y: 116},
    {x: 30, y: 116},
    {x: 31, y: 116},
    {x: 32, y: 115},
    {x: 33, y: 114},
    {x: 35, y: 114},
    {x: 36, y: 113},
    {x: 37, y: 112},
    {x: 38, y: 111},
    {x: 40, y: 110},
    {x: 41, y: 110},
    {x: 42, y: 109},
    {x: 42, y: 108},
    {x: 44, y: 108},
    {x: 44, y: 107},
    {x: 45, y: 106},
    {x: 46, y: 105},
    {x: 47, y: 105},
    {x: 48, y: 104},
    {x: 49, y: 103},
    {x: 50, y: 102},
    {x: 51, y: 101},
    {x: 52, y: 101},
    {x: 52, y: 100},
    {x: 53, y: 99},
    {x: 54, y: 98},
    {x: 55, y: 97},
    {x: 56, y: 96},
    {x: 57, y: 95},
    {x: 58, y: 94},
    {x: 59, y: 94},
    {x: 59, y: 93},
    {x: 60, y: 92},
    {x: 61, y: 91},
    {x: 62, y: 90},
    {x: 63, y: 89},
    {x: 63, y: 88},
    {x: 64, y: 87},
    {x: 65, y: 86},
    {x: 66, y: 84},
    {x: 67, y: 83},
    {x: 68, y: 82},
    {x: 68, y: 81},
    {x: 69, y: 80},
    {x: 70, y: 79},
    {x: 70, y: 78},
    {x: 71, y: 77},
    {x: 72, y: 76},
    {x: 72, y: 75},
    {x: 73, y: 73},
    {x: 74, y: 72},
    {x: 74, y: 71},
    {x: 75, y: 70},
    {x: 75, y: 69},
    {x: 76, y: 68},
    {x: 77, y: 67},
    {x: 77, y: 66},
    {x: 77, y: 65},
    {x: 78, y: 63},
    {x: 79, y: 62},
    {x: 79, y: 60},
    {x: 80, y: 59},
    {x: 80, y: 58},
    {x: 81, y: 56},
    {x: 81, y: 55},
    {x: 81, y: 54},
    {x: 81, y: 53},
    {x: 82, y: 51},
    {x: 82, y: 50},
    {x: 82, y: 48},
    {x: 82, y: 47},
    {x: 82, y: 46},
    {x: 82, y: 45},
    {x: 82, y: 44},
    {x: 81, y: 43},
    {x: 81, y: 41},
    {x: 81, y: 39},
    {x: 81, y: 38},
    {x: 80, y: 37},
    {x: 80, y: 36},
    {x: 79, y: 35},
    {x: 79, y: 33},
    {x: 79, y: 32},
    {x: 78, y: 31},
    {x: 78, y: 30},
    {x: 76, y: 29},
    {x: 76, y: 27},
    {x: 75, y: 26},
    {x: 74, y: 25},
    {x: 74, y: 24},
    {x: 73, y: 23},
    {x: 73, y: 22},
    {x: 72, y: 22},
    {x: 71, y: 21},
    {x: 70, y: 20},
    {x: 69, y: 19},
    {x: 68, y: 19},
    {x: 67, y: 18},
    {x: 66, y: 17},
    {x: 65, y: 17},
    {x: 64, y: 16},
    {x: 63, y: 16},
    {x: 62, y: 15},
    {x: 62, y: 15},
    {x: 61, y: 15},
    {x: 60, y: 15},
    {x: 60, y: 14},
    {x: 58, y: 14},
    {x: 57, y: 13},
    {x: 56, y: 13},
    {x: 55, y: 13},
    {x: 53, y: 12},
    {x: 52, y: 12},
    {x: 51, y: 12},
    {x: 50, y: 12},
    {x: 48, y: 12},
    {x: 47, y: 12},
    {x: 45, y: 12},
    {x: 44, y: 12},
    {x: 43, y: 12},
    {x: 42, y: 12},
    {x: 41, y: 12},
    {x: 39, y: 12},
    {x: 39, y: 12},
    {x: 37, y: 12},
    {x: 36, y: 12},
    {x: 34, y: 12},
    {x: 33, y: 12},
    {x: 33, y: 12},
    {x: 32, y: 12},
    {x: 31, y: 12},
    {x: 30, y: 12},
    {x: 30, y: 12}
  ];

  it("should smooth paths to within the specified degree of error", function() {
    expect(waringoHenrichSmooth(POINTS2, 1)).toEqual([
      {x: -34, y: 134},
      {x: 0, y: 128},
      {x: 21, y: 121},
      {x: 35, y: 114},
      {x: 42, y: 108},
      {x: 44, y: 108},
      {x: 59, y: 94},
      {x: 77, y: 67},
      {x: 81, y: 56},
      {x: 82, y: 44},
      {x: 78, y: 30},
      {x: 76, y: 29},
      {x: 73, y: 22},
      {x: 62, y: 15},
      {x: 53, y: 12},
      {x: 30, y: 12}
    ]);
    expect(waringoHenrichSmooth(POINTS2, 1.5)).toEqual([
      {x: -34, y: 134},
      {x: 0, y: 128},
      {x: 21, y: 121},
      {x: 44, y: 108},
      {x: 59, y: 94},
      {x: 77, y: 67},
      {x: 81, y: 56},
      {x: 82, y: 44},
      {x: 78, y: 30},
      {x: 73, y: 22},
      {x: 53, y: 12},
      {x: 30, y: 12}
    ]);
    expect(waringoHenrichSmooth(POINTS2, 2)).toEqual([
      {x: -34, y: 134},
      {x: 21, y: 121},
      {x: 44, y: 108},
      {x: 59, y: 94},
      {x: 77, y: 67},
      {x: 82, y: 44},
      {x: 73, y: 22},
      {x: 53, y: 12},
      {x: 30, y: 12}
    ]);
    expect(waringoHenrichSmooth(POINTS1, 30)).toEqual([
      {x: 0, y: 0},
      {x: 198, y: 28},
      {x: 214, y: 100},
      {x: 326, y: 76},
      {x: 438, y: 124},
      {x: 502, y: 76},
      {x: 638, y: 140}
    ]);
    expect(waringoHenrichSmooth(POINTS1, 60)).toEqual([
      {x: 0, y: 0},
      {x: 638, y: 140}
    ]);
  });

  it("should return the given list if the list has a length less than 3", function() {
    expect(waringoHenrichSmooth([], 0)).toEqual([]);
    expect(waringoHenrichSmooth([{x: 0, y: 0}], 0)).toEqual([{x: 0, y: 0}]);
    expect(waringoHenrichSmooth([{x: 0, y: 0}, {x: 1, y: 1}], 0)).toEqual([{x: 0, y: 0}, {x: 1, y: 1}]);
  });

  it("should always return only the first and last points in a list if a large enough error limit is given", function() {
    expect(waringoHenrichSmooth(POINTS2, 1000)).toEqual([
      {x: -34, y: 134},
      {x: 30, y: 12}
    ]);
    expect(waringoHenrichSmooth(POINTS1, 1000)).toEqual([
      {x: 0, y: 0},
      {x: 638, y: 140}
    ]);
  });
});
