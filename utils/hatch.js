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
  const dbb = centered_rect_points(center, diag, diag);

  // Debug
  bb.draw();

  // draw the square circumscbribed in a circle with R = diagonal of bounding box
  ctx.rect(dbb[0][0], dbb[0][1], dbb[1][0] - dbb[0][0], dbb[1][1] - dbb[0][1]);

  log(tlbr);
  log(center);
  log(diag);
  log(dbb);

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
    ctx.translate(center[0], center[1]);
    ctx.rotate(radians);

    ctx.moveTo(0, 0);
    ctx.lineTo(100, 100);

    // let y = dbb[0][1] + spacing;
    // for (let i = 0; i < count; i++) {
    //   log(y);
    //   ctx.moveTo(dbb[0][0], y);
    //   ctx.lineTo(dbb[1][0], y);
    //   y += spacing;
    // }

    ctx.restore();

    ctx.moveTo(0, 0);
    ctx.lineTo(100, 100);
    ctx.stroke();
  };

  function line_count(diagonal, density) {
    return 20;
    // return round(diagonal / density);
  }
};
