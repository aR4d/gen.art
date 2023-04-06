function watercolor(ctx) {
  const pts = watercolor_points();
  // console.log(pts);
  draw_polygon_from_points(ctx, pts);
}

function watercolor_points() {
  const pts = [];
  const polygon = polygon_points(140, 200, 10, 100, 0);
  // console.log(polygon);

  for (let i = 0; i < polygon.length; i++) {
    pts.push(...split(4, 7, polygon[i], polygon[(i + 1) % polygon.length]));
  }

  return pts;
}

function split(depth, stdev, a, b) {
  let m,
    pts0 = [a, b];
  for (let d = 0; d < depth; d++) {
    let pts1 = [pts0[0]];
    for (let i = 0; i < pts0.length - 1; i++) {
      m = midpoint(pts0[i], pts0[i + 1]);
      // TODO: remove round() for debugging
      pts1.push([round(R.gaussian(m[0], stdev)), round(R.gaussian(m[1], stdev))], pts0[i + 1]);
    }
    pts0 = pts1;
  }
  return pts0;
}
