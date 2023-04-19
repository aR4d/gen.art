/**
 * Various hatching styles over an irregular polygon.
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @param {[[x1, y1], [x2, y2], [xN, yN]]} polygon irregular
 */
const Hatch = function (ctx, polygon) {
  const bb = new BoundingBox(ctx, polygon);
  const diag = bb.diagonal();
  const center = bb.center();
  const tlbr = bb.points();

  // Debug
  log(tlbr);
  log(center);
  log(diag);

  /**
   * Simple straight lines
   * @param {*} angle of the hatch lines in degrees
   * @param {*} density hatch line density in [0.0, 1.0], 1 representing solid fill
   */
  this.lines = function (angle, density) {
    const radians = (angle * PI) / 180;
    const count = line_count(diag, density);
    const spacing = diag / count;

    log("Count: " + count);
    log("Spacing: " + spacing);

    ctx.save();
    ctx.translate(round(center[0]), round(center[1]));
    ctx.rotate(radians);

    let y = -diag / 2 + spacing;
    for (let i = 0; i < count; i++) {
      ctx.moveTo(round(-diag / 2), round(y));
      ctx.lineTo(round(diag / 2), round(y));
      y += spacing;
    }

    ctx.restore();
  };

  function line_count(diagonal, density) {
    return 20;
    // return round(diagonal / density);
  }
};
