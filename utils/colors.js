// perceived color compute?

// Modulates a HEX color
// v - modulation variance in [0,1]
function modulateHEX(hex, v) {
  return modulateHSL(hex2hsl(hex), v, v, v);
}

// Modulates a HSL color
// hV - HUE variance range in [0, 360)
// sV - SATURATION variance range in [0, 0.5]
// lV - LIGHTNESS variance range in [0, 0.5]
function modulateHSL(hsl, hV, sV, lV) {
  // TODO: handle interval edge scenario!
  return {
    h: hsl.h + R.random_num(-hV, hV),
    s: hsl.s + R.random_num(-sV, sV),
    l: hsl.l + R.random_num(-lV, lV),
    a: 1,
  };
}

function hex2hsl(hex) {
  return rgb2hsl(...hex2rgb(hex));
}

// in: #ff4800, out: [255, 132, 0]
function hex2rgb(hex) {
  return [((i = parseInt(hex.substr(1), 16)) >> 16) & 255, (i >> 8) & 255, i & 255];
}

// in: r,g,b in [0,255], out: h in [0,360) and s,l in [0,1]
function rgb2hsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  let v = max(r, g, b),
    c = v - min(r, g, b),
    f = 1 - abs(v + v - c - 1);
  let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return [60 * (h < 0 ? h + 6 : h), f ? (c / f) * 100 : 0, ((v + v - c) * 100) / 2];
}
