class Textures {
  // topLeft, bottomRight - [x, y]
  constructor(ctx, count, topLeft, bottomRight) {
    this.ctx = ctx;
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
    this.width = bottomRight[0] - topLeft[0];
    this.height = bottomRight[1] - topLeft[1];
    this.minSize = this.width * 0.02;
    this.maxSize = this.width * 0.1;
    this.minOpacity = 0.01;
    this.maxOpacity = 0.5;
    this.count = count;
  }

  info() {
    log("");
    log("----Texture info----");
    log("Top left corner: " + this.topLeft);
    log("Bottom right corner: " + this.bottomRight);
    log("Rectangle width: " + this.width);
    log("Rectangle height: " + this.height);
    log("Count: " + this.count);
    log("Min size: " + this.minSize);
    log("Max size: " + this.maxSize);
    log("Min opacity: " + this.minOpacity * 100 + "%");
    log("Max opacity: " + this.maxOpacity * 100 + "%");
    log("");
  }

  // [[x1, y1], [x2, y2], ...]
  clip(polygon) {
    this.ctx.beginPath();
    for (let i = 0; i < polygon.length; i++) {
      this.ctx.lineTo(polygon[i][0], polygon[i][1]);
    }
    this.ctx.stroke();
    // this.ctx.clip();
  }

  rectangles() {
    for (let i = 0; i < this.count; i++) {
      this.ctx.fillStyle = this.transparent_black();
      this.ctx.fillRect(this.x(), this.y(), this.size(), this.size());
    }
  }

  circles() {
    let x, y, r;
    for (let i = 0; i < this.count; i++) {
      this.ctx.beginPath();
      (x = this.x()), (y = this.y()), (r = ~~(this.size() / 2));
      this.ctx.fillStyle = this.transparent_black();
      this.ctx.moveTo(x + r, y);
      this.ctx.arc(x, y, r, 0, 2 * PI);
      this.ctx.fill();
    }
  }

  line() {
    this.ctx.moveTo(this.x(), this.y());
    this.ctx.strokeStyle = this.transparent_black();
    for (let i = 0; i < this.count; i++) {
      this.ctx.lineTo(this.x(), this.y());
    }
    this.ctx.stroke();
  }

  y() {
    return R.random_int(this.topLeft[1], this.bottomRight[1]);
  }

  x() {
    return R.random_int(this.topLeft[0], this.bottomRight[0]);
  }

  size() {
    return R.random_int(this.minSize, this.maxSize);
  }

  transparent_black() {
    return `rgba(0, 0, 0, ${R.random_num(this.minOpacity, this.maxOpacity)})`;
  }
}
