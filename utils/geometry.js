const midpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];

// gets the points for a regular polygon [[x1, y1], [x2, y2], ...]
function polygon_points(x, y, sides, size, rotation) {
  const theta = (rotation * PI) / 180;
  const pts = [];
  for (let i = 1; i <= sides; i++)
    pts.push([round(x + size * cos((i * 2 * PI) / sides + theta)), round(y + size * sin((i * 2 * PI) / sides + theta))]);
  return pts;
}

// draws regular polygon
function draw_polygon(ctx, x, y, sides, size, rotation) {
  const theta = (rotation * PI) / 180;
  ctx.beginPath();
  for (let i = 1; i <= sides; i++)
    ctx.lineTo(x + size * cos((i * 2 * PI) / sides + theta), y + size * sin((i * 2 * PI) / sides + theta));
  ctx.closePath();
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
