// perceived color compute?

// Modulates a HEX color
// v - modulation variance in [0,1]
function modulateHEX(hex, v) {
  const hsl = hex2hsl(hex);
  return modulateHSL({ h: hsl[0], s: hsl[1], l: hsl[2] }, v, v, v);
}

// Modulates a HSL color, in: { h: [0-360], s: [0-100], l:[0-100] }
// hV - HUE variance range in [0, 360)
// sV - SATURATION variance range in [0, 50%]
// lV - LIGHTNESS variance range in [0, 50%]
function modulateHSL(hsl, hV, sV, lV) {
  return {
    h: modulated_value(hsl.h, hV, 360),
    s: modulated_value(hsl.s, sV, 100),
    l: modulated_value(hsl.l, lV, 100),
    a: 1,
  };
}

// Basically the same as the function below, only returns the actual modulated value
// Target interval - [0, e]
// b - base value in [0, e]
// v - variance from base value [b - v/2, b + v / 2]
// e - upper limit of interval
function modulated_value(b, v, e) {
  if (b < v / 2) return R.random_num(0, v);
  if (e - b < v / 2) return R.random_num(e - v, e);
  return R.random_num(b - v / 2, b + v / 2);
}

// Handles if the modulation interval start/end falls outside the target interval (e.g. [0, 100])
// Target interval - [0, e]
// b - base value in [0, e]
// v - variance from base value [b - v/2, b + v / 2]
// e - upper limit of interval
function adjust_modulation_interval(b, v, e) {
  if (b < v / 2) return [0, v];
  if (e - b < v / 2) return [e - v, e];
  return [b - v / 2, b + v / 2];
}

// in: #ff4800, out: [h, s, l] -> h in [0-360) and s,l in [0-100]
function hex2hsl(hex) {
  return rgb2hsl(...hex2rgb(hex));
}

// in: #ff4800, out: [255, 132, 0]
function hex2rgb(hex) {
  return [((i = parseInt(hex.substr(1), 16)) >> 16) & 255, (i >> 8) & 255, i & 255];
}

// in: r,g,b in [0,255], out: [h, s, l] -> h in [0-360) and s,l in [0-100]
function rgb2hsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  let v = max(r, g, b),
    c = v - min(r, g, b),
    f = 1 - abs(v + v - c - 1);
  let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return [60 * (h < 0 ? h + 6 : h), f ? (c / f) * 100 : 0, ((v + v - c) * 100) / 2];
}
