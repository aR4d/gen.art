/**
 * Various hatching styles over an irregular polygon.
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @param {[[x1, y1], [x2, y2], [xN, yN]]} polygon irregular
 */
const Hatch = function (ctx, polygon, density, angle) {
  const DENSITY_FACTOR = 0.5;
  const bb = new BoundingBox(ctx, polygon);
  const diag = bb.diagonal();
  const center = bb.center();

  // Debug
  log(center);
  log(diag);

  /**
   * Simple straight lines
   * @param {*} angle of the hatch lines in degrees
   * @param {*} density hatch line density in [0.0, 1.0], 1 representing solid fill
   */
  this.lines = function (angle, density) {
    const radians = (angle * PI) / 180;
    const count = round(diag * min(max(density, 0), 1) * DENSITY_FACTOR);
    const spacing = diag / count;

    log("Lines drawn: " + count);

    ctx.lineWidth = 0.5;

    draw_polygon();

    ctx.save();
    ctx.translate(round(center[0]), round(center[1]));
    ctx.rotate(radians);

    // ctx.beginPath();

    // Draw actual hatch
    let y = -diag / 2 + spacing;
    for (let i = 0; i < count; i++) {
      ctx.moveTo(round(-diag / 2), round(y));
      ctx.lineTo(round(diag / 2), round(y));
      y += spacing;
    }

    ctx.restore();
  };

  function draw_polygon() {
    ctx.beginPath();
    for (let i = 0; i < polygon.length; i++) ctx.lineTo(polygon[i][0], polygon[i][1]);
    ctx.closePath();
    ctx.clip();
  }
};
