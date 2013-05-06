/*globals _*/

/**
 * waringo-henrich-smooth.js
 * https://github.com/fusionbox/waringo-henrich-smooth
 *
 * Authors:
 * David Sanders <davesque@gmail.com>
 *
 * Implementation code is subject to the following copyright and license:
 * Copyright (c) 2013 Fusionbox
 * Licensed under the Fusionbox license.
 *
 * Functions for smoothing a path of 2D coordinates using the method described
 * in the following article:
 *
 * Smoothing of Piecewise Linear Paths
 * Michel Waringo and Dominik Henrich
 * University of Bayreuth, Germany
 * International Journal of Advanced Robotic Systems, Vol.5, No. 3 (2008)
 *
 * http://cdn.intechopen.com/pdfs/4283/InTech-Smoothing_of_piecewise_linear_paths.pdf
 */


/**
 * Returns the distance between a point `p1` and a point `p2`.
 */
function pointToPointDistance(p1, p2) {
  var d;

  if ( p1.x === p2.x && p1.y === p2.y ) {
    // Special case for p1 == p2
    return 0;
  } else if ( p1.x === p2.x ) {
    // Special case for slope infinity
    d = p2.y - p1.y;
  } else if ( p1.y === p2.y ) {
    // Special case for slope 0
    d = p2.x - p1.x;
  } else {
    // Normal case
    d = Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2));
  }

  return Math.abs(d);
}


/**
 * Returns the distance between a point `p2` and the line formed by two points
 * `p1` and `p3`.
 */
function pointToLineDistance(p1, p2, p3) {
  var m, b, d;

  if (
    p1.x === p2.x &&
    p1.y === p2.y &&
    p2.x === p3.x &&
    p2.y === p3.y
  ) {
    // Special case for p1 == p2 == p3
    return 0;
  } else if ( p1.x === p3.x && p1.y === p3.y ) {
    // Special case for p1 == p3
    return pointToPointDistance(p1, p2);
  } else if ( p1.x === p3.x ) {
    // Special case for slope infinity
    d = p2.x - p1.x;
  } else if ( p1.y === p3.y ) {
    // Special case for slope 0
    d = p2.y - p1.y;
  } else {
    // Normal case
    m = (p3.y - p1.y) / (p3.x - p1.x);
    b = p1.y - m * p1.x;
    d = (p2.y  - m * p2.x - b) / Math.sqrt(m * m + 1);
  }

  return Math.abs(d);
}


/**
 * Finds the indexes of neighboring, non-removed points for the point `p` in
 * the point list `points`.
 */
function findNeighborhood(points, p) {
  var removed, left, right, i, j, k;

  if ( _.isEmpty(points) ) return [null, null];

  j = p.i;
  removed = _.pluck(points, "r");

  left = _.first(removed, j);
  right = _.rest(removed, j + 1);

  i = _.lastIndexOf(left, false);
  k = _.indexOf(right, false);

  if ( k !== -1 ) k += j + 1;

  return [i === -1 ? null : points[i], k === -1 ? null : points[k]];
}


/**
 * Returns the sum of values in a list `l`.
 */
function sum(l) {
  return _.reduce(l, function(a, i) { return a + i; }, 0);
}


/**
 * Returns the root mean square of values in a list `l`.
 */
function rootMeanSquare(l) {
  l = _.map(l, function(i) { return i * i; });
  return Math.sqrt(sum(l) / l.length);
}


/**
 * Returns the root mean square deviation for the exclusive range
 * (neighborhood) of points specified by the given start and end indexes.
 */
function rootMeanSquareError(points, start, end) {
  if ( _.isEmpty(points) ) return NaN;

  // Flip range if start.i > end.i
  if ( start.i > end.i ) start = [end, end = start][0];

  // Get deviations for all points inside of the neighborhood's range
  var ds = [];
  for ( var i = start.i + 1; i < end.i; i++ )
    ds.push(pointToLineDistance(start, points[i], end));

  // Return root mean square of point deviations
  return rootMeanSquare(ds);
}


/**
 * Smooths a piecewise linear path described by a list of 2D points to within
 * the specified maximum deviation `dLim`.  The value `maxSteps` may be
 * optionally specified to limit the number of iterations when the algorithm is
 * run.
 */
function waringoHenrichSmooth(points, dLim, maxSteps) {
  var smallest;
  var removable, remaining, neighborhood;

  // Helper functions
  function isNotRemoved(p) { return p.r === false; }
  function getDeviation(p) { return p.d; }
  function setDeviation(p) {
    // Don't set deviation if p is null or if p is an end point
    if ( !p || p.i === 0 || p.i === points.length - 1) return;

    var neighborhood = findNeighborhood(points, p);
    p.d = rootMeanSquareError(points, neighborhood[0], neighborhood[1]);
  }

  // Copy and annotate points
  points = _.map(points, _.clone);
  _.each(points, function(p, i) { p.r = false; p.i = i; });

  // Get all inner points
  removable = points.slice(1, -1);
  _.each(removable, setDeviation);

  for ( var steps = 0; !maxSteps || steps < maxSteps; steps++ ) {
    remaining = _.filter(removable, isNotRemoved);
    if ( _.isEmpty(remaining) ) break;

    // Find point with smallest deviation
    smallest = _.min(remaining, getDeviation);

    // Remove point with smallest deviation if deviation is less than the limit
    // and update deviation of neighbors.  Otherwise, quit smoothing.
    if ( smallest.d < dLim ) {
      smallest.r = true;
      neighborhood = findNeighborhood(points, smallest);
      setDeviation(neighborhood[0]);
      setDeviation(neighborhood[1]);
    } else {
      break;
    }
  }

  // Return x and y coordinates for all remaining points
  return _.map(
    _.filter(points, isNotRemoved),
    function(p) { return {x: p.x, y: p.y}; }
  );
}
