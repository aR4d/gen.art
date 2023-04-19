/**
 * Bounding box operations on an irregular polygon
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @param {[[x1, y1], [x2, y2], [xN, yN]]} polygon irregular
 */
const BoundingBox = function (ctx, polygon) {
  /**
   *  Finds the top-left and bottom right corner points of the bounding box.
   * @returns [[xMin, yMin], [xMax, yMax]]
   */
  this.points = function () {
    let xMin = (xMax = polygon[0][0]),
      yMin = (yMax = polygon[0][1]);
    for (let i = 0; i < polygon.length; i++) {
      if (polygon[i][0] < xMin) xMin = polygon[i][0];
      if (polygon[i][0] > xMax) xMax = polygon[i][0];
      if (polygon[i][1] < yMin) yMin = polygon[i][1];
      if (polygon[i][1] > yMax) yMax = polygon[i][1];
    }
    return [
      [xMin, yMin],
      [xMax, yMax],
    ];
  };

  /**
   * @returns [x, y]
   */
  this.center = function () {
    const bb = this.points(polygon);
    return midpoint(bb[0], bb[1]);
  };

  /**
   * Length of the diagonal.
   * @returns Number
   */
  this.diagonal = function () {
    const bb = this.points(polygon);
    return dist(bb[0], bb[1]);
  };

  this.draw = function () {
    const bb = this.points(polygon);
    ctx.rect(bb[0][0], bb[0][1], bb[1][0] - bb[0][0], bb[1][1] - bb[0][1]);
  };
};
