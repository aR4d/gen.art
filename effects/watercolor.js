function split_segment(p1, p2) {
  // draw P1, P2
  ctx.fillStyle = "green";
  ctx.fillRect(...p1, 4, 4);
  ctx.fillRect(...p2, 4, 4);

  const mid = midpoint(p1, p2);
  ctx.fillStyle = "red";
  ctx.fillRect(mid[0], mid[1], 7, 7);

  ctx.fillStyle = "purple";
  ctx.fillRect(R.gaussian(mid[0], 20), R.gaussian(mid[1], 20), 5, 5);
}
// const Watercolor = function () {
//   const
// };
