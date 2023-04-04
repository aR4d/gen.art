const midpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];

// gets the points for a regular polygon [[x1, y1], [x2, y2], ...]
function polygon_points(x, y, sides, size, rotation) {
  const theta = (rotation * PI) / 180;
  const pts = [];
  for (var i = 1; i <= sides; i++)
    pts.push([x + size * cos((i * 2 * PI) / sides + theta), y + size * sin((i * 2 * PI) / sides + theta)]);
  return pts;
}

// draws regular polygon
function draw_polygon(ctx, x, y, sides, size, rotation) {
  const theta = (rotation * PI) / 180;
  ctx.beginPath();
  for (var i = 1; i <= sides; i++)
    ctx.lineTo(x + size * cos((i * 2 * PI) / sides + theta), y + size * sin((i * 2 * PI) / sides + theta));
  ctx.closePath();
}
