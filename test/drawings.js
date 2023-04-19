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
    draw_polygon(ctx, R.random_int(0, 300), R.random_int(0, 400), R.random_int(3, 5), R.random_int(3, 15), R.random_int(0, 360));
    ctx.fill();
  }
}

function logColor(hex) {
  console.log("Logging color");
  console.log(hex2rgb(hex));
  console.log(hex2hsl(hex));
}

function draw_lines(ctx) {
  let y = 10;
  const lines = new Lines(ctx);
  ctx.lineWidth = 2;

  for (let i = 0; i < 12; i++) {
    if (i > 5) draw_line();
    else draw_line(i);
  }

  function draw_line(i) {
    ctx.beginPath();

    if (i >= 0) lines.dash(i);
    else lines.random_dash();

    ctx.moveTo(10, y);
    ctx.lineTo(200, y);
    ctx.stroke();
    y += 20;
  }
}

function lines_hatch_test(ctx) {
  const plgn = [
    [158, 280],
    [81, 210],
    [119, 137],
    [200, 151],
    [272, 233],
  ];
  // const plgn = polygon_points(150, 200, 5, 70, 225);

  // ctx.save();
  draw_polygon_from_points(ctx, plgn);
  ctx.clip();

  const hatch = new Hatch(ctx, plgn);
  hatch.lines(0, 0.5);

  // ctx.restore();

  ctx.moveTo(0, 0);
  ctx.lineTo(100, 100); // TODO: this line should show !!
  ctx.stroke();
}
