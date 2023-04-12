// Watercolor texture for a polygon defined by points [[x1, y1], [x2, y2], ...]
class Watercolor {
  DEPTH = 3;
  MIX_VARIANCE = 4;
  MAX_VARIANCE = 12;
  VARIANCE_SHRINK_FACTOR = 1; // Decrease variance as depth increases
  LAYER_OPACITY = 0.04;
  LAYER_COUNT = 50;
  debug_midpoint_count = 0; // debugging only

  constructor(x, y, size) {
    const polygon = this.polygon(x, y, 7, size);
    console.log(polygon);

    this.base = this.deform(polygon, this.DEPTH);
    console.log("Base points: " + this.base.length);
    console.log(this.base);
  }

  draw(ctx) {
    ctx.fillStyle = `hsla(11, 59%, 51%, ${this.LAYER_OPACITY})`;

    for (let i = 0; i < this.LAYER_COUNT; i++) {
      const layer = this.deform(this.base, this.DEPTH);
      draw_polygon_from_points(ctx, layer);
      ctx.fill();
    }

    console.log("Midpoint and Gaussian method call count: " + this.debug_midpoint_count);
  }

  // the starting regular polygon with variance (no rotation)
  // [[x1, y1, stdev], [x2, y2, stdev], ...]
  polygon(x, y, sides, size) {
    const pts = [];
    for (let i = 1; i <= sides; i++)
      pts.push([
        round(x + size * cos((i * 2 * PI) / sides)),
        round(y + size * sin((i * 2 * PI) / sides)),
        R.random_int(this.MIX_VARIANCE, this.MAX_VARIANCE),
      ]);
    return pts;
  }

  // polygon - [[x1, y1, stdev1], [x2, y2, stdev2], ...]
  deform(polygon, depth) {
    const pts = [];
    for (let i = 0; i < polygon.length; i++)
      pts.push(...this.split(depth, polygon[i], polygon[(i + 1) % polygon.length]).slice(1));
    return pts;
  }

  // a[x1, y1, stdev1], b[x2, y2, stdev1]
  split(depth, a, b) {
    let m,
      std0 = (a[2] + b[2]) / 2,
      pts0 = [a, b],
      pts1;
    for (let d = 0; d < depth; d++) {
      pts1 = [pts0[0]];
      for (let i = 0; i < pts0.length - 1; i++) {
        m = midpoint(pts0[i].slice(0, 2), pts0[i + 1].slice(0, 2));
        pts1.push([round(R.gaussian(m[0], std0)), round(R.gaussian(m[1], std0)), std0], pts0[i + 1]);
        this.debug_midpoint_count++;
      }
      (pts0 = pts1), (std0 *= this.VARIANCE_SHRINK_FACTOR);
    }
    return pts0;
  }
}
