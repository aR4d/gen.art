/**
 * Gets the middle point between 2 points - 2D space
 * @param {*} P1 [x1, y1]
 * @param {*} P2 [x2, y2]
 * @returns [x, y]
 */
const midpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];

/**
 * Gets the distance between 2 points - 2D space
 * @param {*} P1 [x1, y1]
 * @param {*} P2 [x2, y2]
 * @returns Number
 */
const dist = ([x1, y1], [x2, y2]) => sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

/**
 * Gets the points for a regular polygon
 * @param {*} x polygon center X-axis
 * @param {*} y poygon center Y-axis
 * @param {*} sides number of sides
 * @param {*} size the overall size of the polygon
 * @param {*} rotation in degrees
 * @returns [[x1, y1], [x2, y2], ..., [xN, yN]]
 */
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

/**
 * Draws a line from an initial point using polar coordinates
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @param {*} origin starting point of the line - [x, y]
 * @param {*} r line length
 * @param {*} theta line angle in radians
 */
function draw_polar_line(ctx, [x, y], r, theta) {
  ctx.moveTo(x, y);
  ctx.lineTo(x + r * cos(theta), y + r * sin(theta));
}

/**
 * Rotates a point around an origin.
 * @param {*} cx - X coord of point around which to rotate
 * @param {*} cy - Y coord of point around which to rotate
 * @param {*} x - X coord of point to rotate
 * @param {*} y - Y coord of point to rotate
 * @param {*} radians - angle to rotate in radians
 * @returns the rotated point [x, y]
 */
function rotate_point(cx, cy, x, y, radians) {
  const cs = cos(radians),
    sn = sin(radians);
  return [round(cs * (x - cx) + sn * (y - cy) + cx), round(cs * (y - cy) - sn * (x - cx) + cy)];
}

/**
 * Splits a line segment in the middle, recursively
 * depth = 1 -> 2 segments (3 points)
 * depth = 2 -> 4 segments (5 points)
 * depth = 3 -> 8 segments (9 points)
 *
 * @param {*} depth of recursion
 * @param {*} a endpoint of the segment - [x, y]
 * @param {*} b endpoint of the segment - [x, y]
 * @returns
 */
function split_segment(depth, a, b) {
  let pts0 = [a, b];
  for (let d = 0; d < depth; d++) {
    let pts1 = [pts0[0]];
    for (let i = 0; i < pts0.length - 1; i++) pts1.push(midpoint(pts0[i], pts0[i + 1]), pts0[i + 1]);
    pts0 = pts1;
  }
  return pts0;
}

/**
 * Gets the top-left and bottom right corner points of a centered rectangle.
 * @param {*} x rectangle center X-axis
 * @param {*} y rectangle center Y-axis
 * @param {*} w rectangle width
 * @param {*} h rectangle height
 * @returns [[xMin, yMin], [xMax, yMax]]
 */
function centered_rect_points([x, y], w, h) {
  return [
    [x - w / 2, y - h / 2],
    [x + w / 2, y + h / 2],
  ];
}
