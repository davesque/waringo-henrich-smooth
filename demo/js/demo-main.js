/*globals Raphael, POINTS1, POINTS2, waringoHenrichSmooth*/

function getEventMouseCoords(e) {
  var coords = {}, offset;

  if ( e.pageX || e.pageY ) {
    coords.x = e.pageX;
    coords.y = e.pageY;
  } else {
    coords.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    coords.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
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

$(document).ready(function() {
  var paper = new Raphael($("#paper")[0], 900, 600);
  paper.setViewBox(-109.98332849343623, -8.400000945726937, 225, 150).ZP({
    minZoomFactor: 0.05,
    maxZoomFactor: 100,
    mouseWheelSensitivity: 0.1
  });

  $(paper.canvas).mousemove(function(e) {
    var c = getCanvasCoords(paper, getEventMouseCoords(e));
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
    smoothedPoints = waringoHenrichSmooth(smoothedPoints, 2);

    smoothed.setNumericPath(smoothedPoints, {pathCommand: "R"});

    $("#status").text("Points removed: " + (old - smoothedPoints.length));
  }

  $("#step").click(update);
});
