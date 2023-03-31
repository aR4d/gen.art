// perceived color compute?

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
  return [60 * (h < 0 ? h + 6 : h), f ? c / f : 0, (v + v - c) / 2];
}
