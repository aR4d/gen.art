const midpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];

// regular polygon
function polygon(ctx, x, y, sides, size, rotation) {
  const theta = (rotation * PI) / 180;
  ctx.beginPath(), ctx.moveTo(x + size * cos(theta), y + size * sin(theta));
  for (var i = 1; i <= sides; i++)
    ctx.lineTo(x + size * cos((i * 2 * PI) / sides + theta), y + size * sin((i * 2 * PI) / sides + theta));
}
