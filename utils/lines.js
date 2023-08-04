const LineType = {
  Solid: 1,
  CloseDots: 2,
  TwoDashTwoSpace: 3,
  ThreeDashSpace: 4,
  ThreeDashDot: 5,
  FourDashThreeDot: 6,
  Pixelated: 7,
};

class Lines {
  constructor(ctx) {
    this.ctx = ctx;
    this.types = [
      new Dashed(this.ctx, LineType.Solid, []), // ______
      new Dashed(this.ctx, LineType.CloseDots, [2, 2]), // .....
      new Dashed(this.ctx, LineType.TwoDashTwoSpace, [10, 10]), // --  --  --
      new Dashed(this.ctx, LineType.ThreeDashSpace, [20, 5]), // --- --- ---
      new Dashed(this.ctx, LineType.ThreeDashDot, [15, 3, 3, 3]), // --- . --- . ---
      new Dashed(this.ctx, LineType.FourDashThreeDot, [20, 3, 3, 3, 3, 3, 3, 3]), // ---- ... ---- ... ----
      new Pixelated(this.ctx),
    ];
  }

  setType(type) {
    this.lineType = this.types.find((t) => t.name === type);
    if (!this.lineType) throw new Error("Line type not set.");
  }

  weight(size) {
    this.lineType.weight(size);
  }

  color(hexColor) {
    this.lineType.color(hexColor);
  }

  draw(coords) {
    this.lineType.draw(coords);
  }
}

class Dashed {
  constructor(ctx, lineType, pattern) {
    this.ctx = ctx;
    this.name = lineType;
    this.pattern = pattern;
  }

  weight(size) {
    this.ctx.lineWidth = size;
  }

  color(hexColor) {
    this.ctx.strokeStyle = hexColor;
  }

  draw(coords) {
    this.ctx.setLineDash(this.pattern);
    this.ctx.beginPath();
    for (let i = 0; i < coords.length; i++) {
      this.ctx.lineTo(coords[i][0], coords[i][1]);
    }
    this.ctx.closePath();
    this.ctx.stroke();
  }
}

class Pixelated {
  constructor(ctx) {
    this.ctx = ctx;
    this.name = LineType.Pixelated;
    this.lineWeight = 5;
    this.ctx.fillStyle = "black";
  }

  weight(size) {
    this.lineWeight = size;
  }

  color(hexColor) {
    this.ctx.fillStyle = hexColor;
  }

  draw(coords) {
    this.ctx.beginPath();
    for (let i = 0; i < coords.length; i++) {
      this.lineTo(coords[i], coords[(i + 1) % coords.length], this.lineWeight);
    }
    this.ctx.fill();
  }

  /**
   * Bresenham algorithm for a pixelated line.
   * Assumes coordinates are integers.
   * @param {*} P1 [x0, y0]
   * @param {*} P2 [x1, y1]
   * @param {*} pixelSize desired height/width of the pixel. Note that this might get changed to fill all available space evenly.
   */
  lineTo([x0, y0], [x1, y1], pixelSize) {
    const dx = abs(x1 - x0),
      dy = abs(y1 - y0),
      m = max(dx, dy),
      pixels = ~~(m / pixelSize), // number of pixels to render
      size = m / pixels, // the actual size to render pixel at (floatint point)
      sx = x0 < x1 ? size : -size,
      sy = y0 < y1 ? size : -size;

    let err = dx - dy,
      e2;

    // log(`Dx/Dy max: ${m}`);
    // log(`Pixels to render: ${pixels}`);
    // log(`Desired pixel size: ${pixelSize}`);
    // log(`Actual pixel size: ${size}`);

    for (let p = 0; p < pixels; p++) {
      this.setPixel(x0, y0, size);
      e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  }

  setPixel(x0, y0, size) {
    ctx.rect(x0, y0, size, size);
  }
}
