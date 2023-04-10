// Watercolor texture for a polygon defined by points [[x1, y1], [x2, y2], ...]
class Watercolor {
  DEPTH = 3;
  VARIANCE = 8;
  constructor(polygon) {
    this.base = [];
    for (let i = 0; i < polygon.length; i++) {
      this.base.push(...this.split(this.DEPTH, this.VARIANCE, polygon[i], polygon[(i + 1) % polygon.length]).slice(1));
    }
  }

  draw(ctx) {
    // console.log(this.base);
    draw_polygon_from_points(ctx, this.base);
  }

  split(depth, stdev, a, b) {
    let m,
      pts0 = [a, b];
    for (let d = 0; d < depth; d++) {
      let pts1 = [pts0[0]];
      for (let i = 0; i < pts0.length - 1; i++) {
        m = midpoint(pts0[i], pts0[i + 1]);
        pts1.push([round(R.gaussian(m[0], stdev)), round(R.gaussian(m[1], stdev))], pts0[i + 1]);
      }
      pts0 = pts1;
    }
    return pts0;
  }
}
