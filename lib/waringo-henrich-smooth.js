/*
 * waringo-henrich.js
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

'use strict';

var _ = require("underscore");


/**
 * Finds the indexes of neighboring, non-removed points for the point at the
 * given index in the given coordinate list.
 */
function findNeighborhood(coords, j) {
  var removed, left, right, i, k;

  removed = _.pluck(coords, 'remove');

  left = _.first(removed, j);
  right = _.rest(removed, j + 1);

  i = _.lastIndexOf(left, false);
  k = _.indexOf(right, false);

  i = i === -1 ? j : i;
  k = k === -1 ? j : k + j + 1;

  return [i, k];
}


/**
 * Smooths a list of 2D coordinates using the method described in the
 * following article:
 *
 * Smoothing of Piecewise Linear Paths
 * Michel Waringo and Dominik Henrich
 * University of Bayreuth, Germany
 * International Journal of Advanced Robotic Systems, Vol.5, No. 3 (2008)
 *
 * http://cdn.intechopen.com/pdfs/4283/InTech-Smoothing_of_piecewise_linear_paths.pdf
 */
function waringoHenrichSmooth(coords) {
  // Get a copy of the original path
  var origCoords = _.map(coords, _.clone);

  // Mark all points as not having been removed
  _.each(coords, function(c) { c.remove = false; });

  return coords;
}


exports.findNeighborhood = findNeighborhood;
exports.waringoHenrichSmooth = waringoHenrichSmooth;
