// middle point between 2 points - 2D
const midpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];

// distance between 2 points - 2D
const dist = ([x1, y1], [x2, y2]) => sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

// gets the top-left and bottom right corner points of a polygon
// that define it's bounding box
// polygon - [[x1, y1], [x2, y2], ...]
function bounding_box_points(polygon) {
  let xMin = (xMax = polygon[0][0]),
    yMin = (yMax = polygon[0][1]);
  for (let i = 0; i < polygon.length; i++) {
    if (polygon[i][0] < xMin) xMin = polygon[i][0];
    if (polygon[i][0] > xMax) xMax = polygon[i][0];
    if (polygon[i][1] < yMin) yMin = polygon[i][1];
    if (polygon[i][1] > yMax) yMax = polygon[i][1];
  }
  return [
    [xMin, yMin],
    [xMax, yMax],
  ];
}

function draw_bounding_box(ctx, polygon) {
  const bb = bounding_box_points(polygon);
  ctx.rect(bb[0][0], bb[0][1], bb[1][0] - bb[0][0], bb[1][1] - bb[0][1]);
}

// gets the points for a regular polygon [[x1, y1], [x2, y2], ...]
// centered in [x, y]
function polygon_points(x, y, sides, size, rotation) {
  const theta = (rotation * PI) / 180;
  const pts = [];
  for (let i = 1; i <= sides; i++)
    pts.push([round(x + size * cos((i * 2 * PI) / sides + theta)), round(y + size * sin((i * 2 * PI) / sides + theta))]);
  return pts;
}

// draws regular polygon, centered in [x, y]
function draw_polygon(ctx, x, y, sides, size, rotation) {
  const theta = (rotation * PI) / 180;
  ctx.beginPath();
  for (let i = 1; i <= sides; i++)
    ctx.lineTo(x + size * cos((i * 2 * PI) / sides + theta), y + size * sin((i * 2 * PI) / sides + theta));
  ctx.closePath();
}

// draws any polygon
// pts - [[x1, y1], [x2, y2], ...]
function draw_polygon_from_points(ctx, pts) {
  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
}

// draws a line from an initial point [x, y] using polar coordinates
// theta in radians
function draw_polar_line(ctx, [x, y], r, theta) {
  ctx.moveTo(x, y);
  ctx.lineTo(x + r * cos(theta), y + r * sin(theta));
}

// splits a line segment in the middle recursively
// returns the array of points
// depth = 1 -> 2 segments (3 points)
// depth = 2 -> 4 segments (5 points)
// depth = 3 -> 8 segments (9 points)
function split_segment(depth, a, b) {
  let pts0 = [a, b];
  for (let d = 0; d < depth; d++) {
    let pts1 = [pts0[0]];
    for (let i = 0; i < pts0.length - 1; i++) pts1.push(midpoint(pts0[i], pts0[i + 1]), pts0[i + 1]);
    pts0 = pts1;
  }
  return pts0;
}

// draws a cross that marks the center of the canvas
function draw_canvas_center() {
  const canvases = D.getElementsByTagName("canvas");
  if (canvases && canvases.length !== 1) {
    throw new Error("Exactly one canvas element is expected");
  }
  const sizeOnScreen = canvases[0].getBoundingClientRect();

  const ctx = canvases[0].getContext("2d", { alpha: false });
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(sizeOnScreen.width / 2, 0);
  ctx.lineTo(sizeOnScreen.width / 2, sizeOnScreen.height);
  ctx.moveTo(0, sizeOnScreen.height / 2);
  ctx.lineTo(sizeOnScreen.width, sizeOnScreen.height / 2);
  ctx.stroke();
  ctx.closePath();
  ctx.setLineDash([]);
}
