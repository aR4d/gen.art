function canvas_api_300_x_400_px(ctx) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#f00";
  ctx.fillStyle = "#eff";

  ctx.roundRect(20, 20, 200, 200, 50);
  ctx.roundRect(160, 260, 120, 120, 30);
  ctx.roundRect(80, 150, 160, 160, 10);
  ctx.arc(100, 300, 70, 0, 2 * Math.PI);
  ctx.stroke();
  //   ctx.fill();
}

function p5js_300_x_400_px() {
  createCanvas(300, 400);
  background("#8bb3b4");
  console.log(pixelDensity());
  //   pixelDensity(1);
  strokeWeight(1);
  stroke("#f00");
  noFill();

  rect(20, 20, 200, 200, 50);
  rect(160, 260, 120, 120, 30);
  rect(80, 150, 160, 160, 10);
  circle(100, 300, 70);
}
