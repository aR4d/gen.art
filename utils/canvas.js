// Creates an HTML canvas element that:
// 1.Scales on high density retina display resolutions
// 2.Scales for quality print of printed artwork at specific pixel size
const Canvas = function (targetHeight, backgroundHexColor) {
  // The dimensions at which the artwork was designed
  const REF_HEIGHT = 400;
  const ASPECT_RATIO = 3 / 4;

  this.init = function () {
    const h = targetHeight;
    const w = ~~(targetHeight * ASPECT_RATIO);

    // Create the canvas element
    const cvs = D.body.appendChild(D.createElement("canvas"));

    // Get the DPR and size of the canvas
    const dpr = W.devicePixelRatio;

    // Set the "actual" size of the canvas
    cvs.height = ~~(h * dpr);
    cvs.width = ~~(w * dpr);

    // Set the "drawn" size of the canvas
    cvs.style.height = `${h}px`;
    cvs.style.width = `${w}px`;

    // Fetch the context.
    const ctx = cvs.getContext("2d", { alpha: false });

    // Scale the context to ensure correct drawing operations
    const sc = targetHeight / REF_HEIGHT;
    ctx.scale(sc * dpr, sc * dpr);

    // Set background color
    ctx.fillStyle = backgroundHexColor;
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // Log canvas dimensions
    log(cvs);

    return ctx;
  };

  this.init_for_print = function () {
    // Create the canvas element
    const cvs = D.body.appendChild(D.createElement("canvas"));

    // Set the "actual" size of the canvas
    cvs.height = targetHeight;
    cvs.width = ~~(targetHeight * ASPECT_RATIO);

    // Set the "drawn" size of the canvas
    const s = cvs.style;
    s.position = "absolute";
    s.display = "block";
    s.top = s.left = s.right = s.bottom = "0";
    s.margin = "auto";
    if (W.innerWidth / W.innerHeight < ASPECT_RATIO) {
      s.width = "100%";
      s.height = "auto";
    } else {
      s.width = "auto";
      s.height = "100%";
    }

    // Fetch the context.
    const ctx = cvs.getContext("2d", { alpha: false });

    // Scale the context to ensure correct drawing operations
    const sc = targetHeight / REF_HEIGHT;
    ctx.scale(sc, sc);

    // Set background color
    ctx.fillStyle = backgroundHexColor;
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    return ctx;
  };

  // Do not include this in production code
  function log(canvas) {
    const sizeOnScreen = canvas.getBoundingClientRect();

    console.log(`Aspect Ratio: ${ASPECT_RATIO}`);
    console.log(`Device Pixel Ratio: ${W.devicePixelRatio}`);
    console.log(`Canvas size on screen: W = ${sizeOnScreen.width} H = ${sizeOnScreen.height}`);
    console.log(`Canvas HTML: W = ${canvas.width} H = ${canvas.height}`);
    console.log(`Canvas CSS: W = ${canvas.style.width} H = ${canvas.style.height}`);
  }
};
