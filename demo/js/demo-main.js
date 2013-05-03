/*globals Raphael, POINTS1, POINTS2*/

/**
 * Correctly detect mouse position of event relative to document top-left.
 * If argument `offsetElement` is specified, mouse position is relative to
 * top-left of that element.
 *
 * Based on code at quirksmode.org:
 * http://www.quirksmode.org/js/events_properties.html
 */
function getEventMouseCoords(e, offsetElement) {
  var coords = {}, offset;

  if ( e.pageX || e.pageY ) {
    coords.x = e.pageX;
    coords.y = e.pageY;
  } else {
    coords.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    coords.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  if ( offsetElement ) {
    // Trust me, the ternary operator looks like crap
    if ( offsetElement.tagName === "svg" )
      offset = getSVGCanvasOffset(offsetElement);
    else
      offset = $(offsetElement).offset();
    coords.x -= offset.left;
    coords.y -= offset.top;
  }

  return coords;
}

function getCanvasCoords(paper, coords) {
  var m = paper.canvas.getScreenCTM().inverse();
  var p = paper.canvas.createSVGPoint();

  p.x = coords.x;
  p.y = coords.y;
  p = p.matrixTransform(m);

  return p;
}

var PAPER_WIDTH = 900;
var PAPER_HEIGHT = 600;
var DEFAULT_ZOOM = 2;
var ZP_OPTIONS = {
  minZoomFactor: 0.05,
  maxZoomFactor: 100,
  mouseWheelSensitivity: 0.1
};

$(document).ready(function() {
  var paper = new Raphael($("#paper")[0], 900, 600);
  paper.setViewBox(
    -109.98332849343623, -8.400000945726937, 225, 150
  ).ZP(ZP_OPTIONS);
  window.paper = paper;

  $(paper.canvas).mousemove(function(e) {
    var c = getEventMouseCoords(e);
    c = getCanvasCoords(paper, c);
    $("#coords").html("x: " + c.x + "<br/>y: " + c.y);
  });

  var original = paper.path("M0 0").attr({
    "stroke-width": 2,
    "stroke": "#333",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });

  var smoothed = paper.path("M0 0").attr({
    "stroke-width": 2,
    "stroke": "rgba(255, 0, 0, 0.75)",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });

  var smoothedPoints = POINTS2;

  original.setNumericPath(POINTS2);
  smoothed.setNumericPath(smoothedPoints);

  function update() {
    var old = smoothedPoints.length;
    smoothedPoints = waringoHenrichSmooth(smoothedPoints, 10, 10);

    smoothed.setNumericPath(smoothedPoints);

    $("#status").text("Points removed: " + (old - smoothedPoints.length));
  }

  $("#step").click(update);
});
