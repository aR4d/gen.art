function canvas_api_300_x_400_px(ctx) {
  ctx.lineWidth = 2;
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

function canvas_api_300_x_400_px_modulated_polygons(ctx) {
  const colors = [
    {
      hex: "#3c6837",
      h: 113,
      s: 31,
      l: 31,
      a: 1,
    },
    {
      hex: "#e88945",
      h: 25,
      s: 78,
      l: 59,
      a: 1,
    },
    {
      hex: "#d86e90",
      h: 341,
      s: 58,
      l: 64,
      a: 1,
    },
  ];

  logColor(colors[0].hex);
  logColor(colors[1].hex);
  logColor(colors[2].hex);

  for (let i = 0; i < 600; i++) {
    // const c = modulateHSL(R.random_choice(colors), 10, 10, 10);
    const c = modulateHEX(R.random_choice(colors).hex, 10);
    // console.log(`hsl(${c.h},${c.s}%,${c.l}%,${c.a})`);
    ctx.fillStyle = `hsl(${c.h},${c.s}%,${c.l}%,${c.a})`;
    polygon(ctx, R.random_int(0, 300), R.random_int(0, 400), R.random_int(3, 8), R.random_int(3, 15), R.random_int(0, 360));
    ctx.fill();
  }
}

function logColor(hex) {
  console.log("Logging color");
  console.log(hex2rgb(hex));
  console.log(hex2hsl(hex));
}
