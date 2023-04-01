const RANDOM_HASH = true;
const DEBUG = true;
const D = document;
const W = window;

const round = Math.round,
  floor = Math.floor,
  min = Math.min,
  max = Math.max,
  abs = Math.abs,
  sin = Math.sin,
  cos = Math.cos,
  PI = Math.PI;

const tokenData = {
  tokenId: "163000801",
  hash: RANDOM_HASH ? random_hash() : "0x4a43c182a8d93c6ba286665ab5dcf77fcb4f79e6a222a78d153304eb573b2edb",
};

const R = new Random();

function log(msg) {
  if (DEBUG) {
    console.log(msg);
  }
}

log("Hash: " + tokenData.hash);
