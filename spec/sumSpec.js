/*globals describe, it, expect*/

describe("sum", function() {
  var sum = window.sum;

  it("should return the sum of values in a list", function() {
    expect(sum([1, 2, 3, 4, 5])).toEqual(15);
    expect(sum([10, 20, 30, 40, 50])).toEqual(150);
    expect(sum([-10, -20, 30, 40, 50])).toEqual(90);
  });

  it("should correctly return the sum of a single value list", function() {
    expect(sum([1])).toEqual(1);
    expect(sum([12345])).toEqual(12345);
    expect(sum([-12345])).toEqual(-12345);
  });

  it("should return 0 as the sum of an empty list", function() {
    expect(sum([])).toEqual(0);
  });
});
