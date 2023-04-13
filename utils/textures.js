// TODO: use interface!
function draw_texture(ctx, x, y, w, h, count, minSize, maxSize) {}

// draws a bunch of circles over a rectangle area, uniform distribution.
// [x, y] - top left corner
// w, h - width, height
// count - number of circles to draw
// [minSize, maxSize] - range of size for circles
function circles_texture(ctx, x, y, w, h, count, minSize, maxSize) {
  ctx.beginPath();
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = `rgba(0, 0, 0, ${R.random_dec()})`;
    ctx.arc(R.random_int(x, w), R.random_int(y, h), R.random_int(minSize, maxSize), 0, 2 * PI);
    // TODO: moveTo necessary!!
  }
  ctx.closePath();
  ctx.fill();
}

function poylgons_texture() {}

function rect_texture(ctx, x, y, w, h, count, minSize, maxSize) {
  ctx.beginPath();
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = `rgba(0, 0, 0, ${R.random_num(0, 0.5)})`;
    ctx.fillRect(R.random_int(x, w), R.random_int(y, h), R.random_int(minSize, maxSize), R.random_int(minSize, maxSize));
  }
  ctx.closePath();
  ctx.fill();
}
