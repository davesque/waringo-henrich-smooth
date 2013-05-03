/*global angular: true, _: true, Raphael: true*/

;(function(Raphael) {

  var ANIMATION_MS = 250;

  /**
   * Returns true if the argument is actually, really (I'm not kidding!) a
   * number.
   */
  function isActualNumber(a) { return _.isNumber(a) && !_.isNaN(a); }

  /**
   * Gets a line path string for an array of points.
   */
  function getPathString(coords, opts) {
    opts = _.defaults(opts || {}, {closed: false, pathCommand: "L"});

    var pathString = coords ? "M" + coords[0].x + " " + coords[0].y : "M0 0";

    var restCoords = _.rest(coords);
    if ( !_.isEmpty(restCoords) ) {
      pathString += opts.pathCommand;
      pathString += _.map(restCoords, function(i) {
        return i.x + " " + i.y;
      }).join(" ");
    }

    // Close the path if specified
    if ( opts.closed ) pathString += "Z";

    return pathString;
  }

  /**
   * Sets attributes on a Raphael object if all attribute values are numbers
   * and not NaN.  If `defaults` argument is supplied, sets attributes to
   * values of `defaults` if number check fails.  Otherwise, hides the
   * Raphael object.
   */
  Raphael.el.setNumericAttr = function(attrs, defaults) {
    if ( _.every(_.values(attrs), isActualNumber) ) this.show().animate(attrs, ANIMATION_MS, "easeOut");
    else if ( defaults ) this.show().animate(defaults, ANIMATION_MS, "easeOut");
    else this.hide();
  };

  /**
   * Sets path on a Raphael path object if all path x and y coordinates are
   * numbers and not NaN.  If `defaults` argument is supplied, sets path to
   * coordinates in `defaults` if number check fails.  Otherwise, hides the
   * Raphael object.
   */
  Raphael.el.setNumericPath = function(coords, opts) {
    opts = _.defaults(opts || {}, {defaults: {}});

    var pathString, coordsAreNumbers;

    coordsAreNumbers = _.every(_.map(coords,
      function(p) { return _.every(_.values(p), isActualNumber); }
    ));

    if ( coordsAreNumbers || opts.defaults ) {
      pathString = getPathString(coordsAreNumbers ? coords : opts.defaults, opts);
      this.show().animate({path: pathString}, ANIMATION_MS, "easeOut");
    } else {
      this.hide();
    }
  };

})(Raphael);
