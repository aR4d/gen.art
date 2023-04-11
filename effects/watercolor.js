// Watercolor texture for a polygon defined by points [[x1, y1], [x2, y2], ...]
class Watercolor {
  VARIANCE_SHRINK_FACTOR = 0.9; // Decrease variance as depth increases

  constructor(polygon) {
    this.base = this.deform(polygon, 3, 7);
  }

  draw(ctx) {
    ctx.fillStyle = "hsla(181, 21%, 63%, 0.05)";

    for (let i = 0; i < 50; i++) {
      const layer = this.deform(this.base, 3, 7);
      draw_polygon_from_points(ctx, layer);
      ctx.fill();
    }
  }

  deform(polygon, depth, stdev) {
    const pts = [];
    for (let i = 0; i < polygon.length; i++)
      pts.push(...this.split(depth, stdev, polygon[i], polygon[(i + 1) % polygon.length]).slice(1));
    return pts;
  }

  split(depth, stdev, a, b) {
    let m,
      std0 = stdev,
      pts0 = [a, b],
      pts1;
    for (let d = 0; d < depth; d++) {
      pts1 = [pts0[0]];
      for (let i = 0; i < pts0.length - 1; i++) {
        m = midpoint(pts0[i], pts0[i + 1]);
        pts1.push([round(R.gaussian(m[0], std0)), round(R.gaussian(m[1], std0))], pts0[i + 1]);
      }
      (pts0 = pts1), (std0 *= this.VARIANCE_SHRINK_FACTOR);
    }
    return pts0;
  }
}
