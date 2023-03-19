class Canvas {
  // The artwork is driven by Height or Width but not both.
  constructor(desired_height) {
    this.DEFAULT_HEIGHT = 400;
    this.ASPECT_RATIO = 3 / 4;
    this.cvs = D.body.appendChild(D.createElement("canvas"));
    this.cvs.height = max(desired_height, this.DEFAULT_HEIGHT);
    this.cvs.width = ~~(this.cvs.height * this.ASPECT_RATIO);
    this.ctx = this.cvs.getContext("2d", { alpha: false });
  }

  background(hexColor) {
    this.ctx.fillStyle = hexColor;
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
  }

  set_style_on_resize() {
    W.onresize = this.set_style;
    this.set_style();
  }

  set_style() {
    const s = this.cvs.style;
    s.position = "absolute";
    s.display = "block";
    s.top = s.left = s.right = s.bottom = "0";
    s.margin = "auto";
    if (W.innerWidth / W.innerHeight < this.ASPECT_RATIO) {
      s.width = "100%";
      s.height = "auto";
    } else {
      s.width = "auto";
      s.height = "100%";
    }
  }

  print_stats() {
    const pixelRatio = W.devicePixelRatio;
    const sizeOnScreen = this.cvs.getBoundingClientRect();

    console.log(`Device Pixel Ratio: ${pixelRatio}`);
    console.log(`Canvas size on screen: W = ${sizeOnScreen.width} H = ${sizeOnScreen.height}`);
    console.log(`Canvas HTML: W = ${this.cvs.width} H = ${this.cvs.height}`);
    console.log(`Canvas CSS: W = ${this.cvs.style.width} H = ${this.cvs.style.height}`);
  }
}
