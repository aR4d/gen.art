function canvas_api_300_x_400_px(ctx) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#f00";
  ctx.fillStyle = "#eff";

  ctx.roundRect(30, 20, 200, 200, 50);
  ctx.stroke();
  ctx.fill();
}
