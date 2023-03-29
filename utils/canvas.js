// Creates an HTML canvas element that:
// 1.Scales on high density retina display resolutions
// 2.Scales for quality print of printed artwork at specific pixel size
const Canvas = function (targetHeight) {
  // The dimensions at which the artwork was designed
  const REF_HEIGHT = 400;
  const ASPECT_RATIO = 3 / 4;

  // 1. If target height is specified, we assume that is the physical IRL print size,
  // then Hi-Resolution scaling does NOT happen automatically.
  // 2. If the target height is NOT specified, we assume the artowrk is rendered on a website
  // then Hi-Resolution scaling happens automatically AND
  // the canvas is sized to the dimensions it was designed at
  this.init = function (backgroundHexColor) {
    // Create the canvas element
    const cvs = D.body.appendChild(D.createElement("canvas"));

    // Set Height and Width of canvas
    let h, dpr;

    if (targetHeight) {
      log("Sizing for physical print.");
      h = targetHeight;
      dpr = 1;
    } else {
      log("Sizing for web render.");
      h = REF_HEIGHT;
      dpr = W.devicePixelRatio;
    }

    const w = ~~(h * ASPECT_RATIO);

    // Set the "actual" size of the canvas
    cvs.height = ~~(h * dpr);
    cvs.width = ~~(w * dpr);

    // Set the "drawn" size of the canvas
    if (targetHeight) {
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
    } else {
      cvs.style.height = `${h}px`;
      cvs.style.width = `${w}px`;
    }

    // Fetch the context.
    const ctx = cvs.getContext("2d", { alpha: false });

    // Scale the context to ensure correct drawing operations
    ctx.scale((h / REF_HEIGHT) * dpr, (h / REF_HEIGHT) * dpr);

    // Set background color
    ctx.fillStyle = backgroundHexColor || "#EADDCA";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // Log canvas info
    log_canvas_info(cvs);

    return ctx;
  };

  this.init_for_web_render = function (backgroundHexColor) {
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
    ctx.fillStyle = backgroundHexColor || "#EADDCA";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    return ctx;
  };

  this.init_for_print = function (backgroundHexColor) {
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
    ctx.fillStyle = backgroundHexColor || "#EADDCA";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    return ctx;
  };

  function log(msg) {
    if (DEBUG) {
      console.log(msg);
    }
  }

  // Do not include this in production code
  function log_canvas_info(canvas) {
    const sizeOnScreen = canvas.getBoundingClientRect();
    log(`Aspect Ratio: ${ASPECT_RATIO}`);
    log(`Device Pixel Ratio: ${W.devicePixelRatio}`);
    log(`Window Inner Height: ${W.innerHeight}`);
    log(`Canvas size on screen: W = ${sizeOnScreen.width} H = ${sizeOnScreen.height}`);
    log(`Canvas HTML: W = ${canvas.width} H = ${canvas.height}`);
    log(`Canvas CSS: W = ${canvas.style.width} H = ${canvas.style.height}`);
  }
};
