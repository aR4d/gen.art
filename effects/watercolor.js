function split_segment(p1, p2) {
  const mid = midpoint(p1, p2);
  // const p3 = [R.gaussian(mid[0], 20), R.gaussian(mid[1], 20)];

  // draw P1, P2
  ctx.fillStyle = "green";
  ctx.fillRect(...p1, 4, 4);
  ctx.fillRect(...p2, 4, 4);

  ctx.fillStyle = "red";
  ctx.fillRect(mid[0], mid[1], 7, 7);

  ctx.fillStyle = "purple";
  ctx.fillRect(R.gaussian(mid[0], 20), R.gaussian(mid[1], 20), 5, 5);
}

const points = []; // [[x1, y1], [x2, y2], ...]

// finds the midpoint of the p1p2 segment, inserts a 3rd point somewhere between the endpoints,
// likely NOT on the same segment
// p1, p2 - [x, y]
function split_segment_2(index, p1, p2) {
  const mid = midpoint(p1, p2);
  // return [p1, [R.gaussian(mid[0], 20), R.gaussian(mid[1], 20)], p2];
  points.splice(index, 0, [R.gaussian(mid[0], 20), R.gaussian(mid[1], 20)]);
}

function split_segment_1(p1, p2) {
  if (d >= depth) {
    console.log("Recursion done!");
    return;
  }
  const mid = midpoint(p1, p2);
  const p3 = [~~R.gaussian(mid[0], 20), ~~R.gaussian(mid[1], 20)];
  split_segment(p1, p3);
  split_segment(p3, p2);
}

// function deform_polygon(depth) {
//   let pts;
//   for (let d = 0; d < depth; d++) {
//     pts = points.length;
//     for (let i = 0; i < pts - 1; i++) {
//       split_segment(i, points[i], points[i + 1]);
//     }
//   }
// }

// ***** THIS AT LEAST WORKS ***** //

function deform_polygon(ctx, pts) {
  const variance = 15;
  let pts0 = pts.slice(); // points - depth N
  let pts1 = pts.slice(); // points - depth N + 1

  for (let i = 0; i < pts0.length; i++) {
    const mid = midpoint(pts0[i], pts0[(i + 1) % pts0.length]);
    const p3 = [round(R.gaussian(mid[0], variance)), round(R.gaussian(mid[1], variance))];

    // debug
    ctx.fillStyle = "black";
    ctx.fillRect(pts0[i][0], pts0[i][1], 2, 2);
    ctx.fillRect(150, 200, 2, 2); // mid
    ctx.fillRect(mid[0], mid[1], 3, 3);

    ctx.fillStyle = "red";
    ctx.fillRect(p3[0], p3[1], 2, 2);

    pts1.splice(2 * i + 1, 0, p3);
  }

  console.log(pts1);
  drawPolygon(ctx, pts1);
}

function drawPolygon(ctx, pts) {
  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) {
    console.log(`X=${pts[i][0]}, Y=${pts[i][1]}`);
    ctx.lineTo(pts[i][0], pts[i][1]);
  }
  ctx.closePath();
}

// ***** THIS AT LEAST WORKS ***** //

function splitEdge(depth) {
  if (depth === 0) {
    console.log("Reached max depth.");
    return;
  }
  console.log("Depth: " + depth);

  splitEdge(depth - 1);
  splitEdge(depth - 1);
}

// const Watercolor = function () {
//   const
// };
