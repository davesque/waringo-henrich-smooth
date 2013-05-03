/*globals _*/

/*
 * waringo-henrich-smooth.js
 * https://github.com/davesque/waringo-henrich-smooth
 *
 * Implementation code is subject to the following copyright and license:
 * Copyright (c) 2013 David Sanders
 * Licensed under the MIT license.
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
  var a, b, C, d;

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
    a = p3.y - p1.y;
    b = p3.x - p1.x;
    C = p1.y;
    d = (a * p2.x + b * p2.y + C) / Math.sqrt(a * a + b * b);
  }

  return Math.abs(d);
}


/**
 * Finds the indexes of neighboring, non-removed points for the point at the
 * given index in the given coordinate list.
 */
function findNeighborhood(coords, j) {
  var removed, left, right, i, k;

  if ( _.isEmpty(coords) ) return [-1, -1];

  if ( j < 0 ) j = 0;
  else if ( j >= coords.length ) j = coords.length - 1;

  removed = _.pluck(coords, "remove");

  left = _.first(removed, j);
  right = _.rest(removed, j + 1);

  i = _.lastIndexOf(left, false);
  k = _.indexOf(right, false);

  if ( k !== -1 ) k += j + 1;

  return [i, k];
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
  // Get deviations for all points inside of the neighborhood's range
  var ds = [];
  for ( var i = start + 1; i < end; i++ ) {
    ds.push(pointToLineDistance(
      points[start],
      points[i],
      points[end]
    ));
  }

  // Return root mean square of point deviations
  return rootMeanSquare(ds);
}


/**
 * Smooths a piecewise linear path described by a list of 2D points to within
 * the specified maximum deviation `dLim` determined by invoking the error
 * function `K`.
 */
function waringoHenrichSmooth(points, dLim) {
  var smallest;
  var removable, remaining;

  // Helper functions
  function isNotRemoved(p) { return p.r === false; }
  function getDeviation(p) { return p.d; }
  function setDeviation(p) {
    var neighborhood = findNeighborhood(points, p.i);
    p.d = rootMeanSquareError(points, neighborhood[0], neighborhood[1]);
  }

  // Copy the original path points
  points = _.map(points, _.clone);

  // Mark all points as not having been removed and make note of their index
  _.each(points, function(p, i) { p.r = false; p.i = i; });

  // Get all inner points which might be removed
  removable = points.slice(1, -1);

  while ( true ) {
    // Find remaining points which have not been marked for removal
    remaining = _.filter(removable, isNotRemoved);

    // If none left, quit smoothing
    if ( _.isEmpty(remaining) ) break;

    // Calculate deviations and find point with smallest deviation
    _.each(remaining, setDeviation);
    smallest = _.min(remaining, getDeviation);

    // Remove the point with the smallest deviation if that deviation is less
    // than the limit.  Otherwise, quit smoothing.
    if ( smallest.d < dLim ) smallest.r = true;
    else break;
  }

  // Return x and y coordinates for all remaining points
  return _.map(
    _.filter(points, isNotRemoved),
    function(p) { return {x: p.x, y: p.y}; }
  );
}
